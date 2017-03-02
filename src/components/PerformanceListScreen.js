import React, { Component } from 'react'
import {
  AppState,
  ListView,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from 'react-native'

import PerformanceCell from './PerformanceCell'
import SegmentedControl from './SegmentedControl'
import colors from '../constants/colors'
import config from '../../config'
import moment from 'moment-timezone'

class PerformanceListScreen extends Component {
  static navigationOptions = {
    title: ({ state }) => `${state.params.contest.name}`,
  }

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

  contest() {
    return this.props.navigation.state.params.contest
  }

  fetchData() {
    const contest = this.contest()
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
    const { navigate } = this.props.navigation

    const contest = this.contest()
    const venue = contest.venues[this.state.venueIndex]
    const timeZone = contest.time_zone

    navigate('Performance', { performance, venue, timeZone })
  }

  renderRow(performance) {
    const contest = this.contest()

    return (
      <PerformanceCell
        key={performance.id}
        onSelect={() => this.selectPerformance(performance)}
        performance={performance}
        timeZone={contest.time_zone}
      />
    )
  }

  render() {
    const contest = this.contest()
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
    backgroundColor: colors.white,
    flex: 1,
  },
  messageText: {
    marginTop: 100,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  filterControls: {
    minHeight: 80,
    marginTop: 6,
    marginBottom: 6,
  },
  contentArea: {
    flex: 1,
  },
})

export default PerformanceListScreen
