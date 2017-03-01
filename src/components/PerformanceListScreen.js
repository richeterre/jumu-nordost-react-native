import React, { Component } from 'react'
import {
  AppState,
  ListView,
  Platform,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from 'react-native'

import PerformanceCell from './PerformanceCell'
import PerformanceScreen from './PerformanceScreen'
import SegmentedControl from './SegmentedControl'
import config from '../../config'
import moment from 'moment-timezone'

class PerformanceListScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loading: true,
      hasError: false,
      dateIndex: 0,
      venueIndex: 0,
    }
  }

  componentDidMount() {
    AppState.addEventListener('change', this.handleAppStateChange.bind(this))
    this.fetchData()
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleAppStateChange.bind(this))
  }

  handleAppStateChange(currentAppState) {
    if (currentAppState === 'active') {
      this.fetchData()
    }
  }

  fetchData() {
    const contest = this.props.contest
    const date = moment(contest.start_date).add(this.state.dateIndex, 'days')
    const dateString = date.tz(contest.time_zone).format('YYYY-MM-DD')
    const venue = contest.venues[this.state.venueIndex]

    const query = '?venue_id=' + venue.id + '&date=' + dateString

    this.setState({
      loading: true,
      hasError: false,
    })

    fetch(
      config.baseUrl + 'contests/' + contest.id + '/performances' + query,
      { headers: { 'X-Api-Key': config.apiKey } }
    )
    .then((response) => response.json())
    .then((responseData) => {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(responseData),
        loading: false,
      })
    })
    .catch(error => {
      this.setState({
        hasError: true,
        loading: false,
      })
    })
    .done()
  }

  selectPerformance(performance) {
    const route = {
      name: performance.category_name,
      component: PerformanceScreen,
      passProps: {
        performance: performance,
        venue: this.props.contest.venues[this.state.venueIndex],
        timeZone: this.props.contest.time_zone,
      },
    }
    if (Platform.OS === 'android') {
      this.props.toRoute(route)
    } else {
      this.props.navigator.push(route)
    }
  }

  renderRow(performance) {
    return (
      <PerformanceCell
        key={performance.id}
        onSelect={() => this.selectPerformance(performance)}
        performance={performance}
        timeZone={this.props.contest.time_zone}
      />
    )
  }

  render() {
    const contest = this.props.contest
    const endDate = moment(contest.end_date)
    var date = moment(contest.start_date)
    var dates = [date]

    while (date.isBefore(endDate)) {
      var newDate = date.clone()
      newDate.add(1, 'days')
      dates.push(newDate)
      date = newDate
    }

    const dayFormat = dates.length > 2 ? 'ddd, Do MMMM' : 'dddd, Do MMMM'

    const messageText = this.state.hasError
      ? 'Der Vorspielplan konnte leider nicht geladen werden.'
      : 'Einen Moment, bitte…'

    return (
      <View style={styles.container}>
        <View style={styles.filterControls}>
          <SegmentedControl
            values={dates.map(date => date.tz(contest.time_zone).format(dayFormat))}
            selectedIndex={this.state.dateIndex}
            onChange={index => {
              this.setState({ dateIndex: index })
              this.fetchData()
            }}
          />
          <SegmentedControl
            values={contest.venues.map(venue => venue.name)}
            selectedIndex={this.state.venueIndex}
            onChange={index => {
              this.setState({ venueIndex: index })
              this.fetchData()
            }}
          />
        </View>
        <View style={styles.contentArea}>
          {
            this.state.loading || this.state.hasError ? (
              <Text style={styles.messageText}>
                {messageText}
              </Text>
            ) : (
              this.state.dataSource.getRowCount() > 0 ? (
                <ListView
                  dataSource={this.state.dataSource}
                  renderRow={this.renderRow.bind(this)}
                  refreshControl={
                    <RefreshControl
                      refreshing={this.state.loading}
                      onRefresh={this.fetchData.bind(this)}
                    />
                  }
                />
              ) : (
                <Text style={styles.messageText}>
                  An diesem Tag finden am ausgewählten Ort keine Vorspiele statt.
                </Text>
              )
            )
          }
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  messageText: {
    marginTop: 100,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  filterControls: {
    marginTop: 6,
    marginBottom: 6,
  },
  contentArea: {
    flex: 1,
  },
})

export default PerformanceListScreen