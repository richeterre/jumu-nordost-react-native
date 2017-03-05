// @flow
import type { NavigationScreenProp } from 'react-navigation'
import type { State } from '../redux/modules'
import type { Contest, Venue } from '../redux/modules/contests'
import type { Performance } from '../redux/modules/performances'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  AppState,
  ListView,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from 'react-native'

import PerformanceCell from '../components/PerformanceCell'
// $FlowFixMe: Platform suffix support (https://github.com/facebook/flow/issues/945)
import SegmentedControl from '../components/SegmentedControl'
import colors from '../constants/colors'
import { fetchPerformances } from '../redux/modules/performances'
import moment from 'moment-timezone'

type PropsFromParent = {|
  navigation: NavigationScreenProp,
|}

type PropsFromState = {|
  contest: ?Contest,
  fetchPerformancesError: boolean,
  fetchingPerformances: boolean,
  performances: ?Array<Performance>,
|}

type PropsFromDispatch = {|
  fetchPerformances: (contest: Contest, venue: Venue, date: string) => any,
|}

type Props = PropsFromParent & PropsFromState & PropsFromDispatch

type ComponentState = {|
  dateIndex: number,
  dataSource: ListView.DataSource,
  venueIndex: number,
|}

class PerformanceListScreen extends Component {
  props: Props
  state: ComponentState

  constructor(props) {
    super(props)
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      dateIndex: 0,
      venueIndex: 0,
    }
  }

  componentDidMount() {
    AppState.addEventListener('change', this.handleAppStateChange.bind(this))
    this.fetchData()
  }

  componentWillReceiveProps(nextProps: Props) {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(nextProps.performances || []),
    })
  }

  componentDidUpdate(prevProps: Props, prevState: ComponentState) {
    const { dateIndex, venueIndex } = this.state
    if (prevState.dateIndex !== dateIndex || prevState.venueIndex !== venueIndex) {
      this.fetchData()
    }
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
    const { contest } = this.props
    if (!contest) throw new Error('Contest cannot be missing here')
    return contest
  }

  fetchData() {
    const contest = this.contest()
    const date = moment(contest.startDate).add(this.state.dateIndex, 'days')
    const dateString = date.tz(contest.timeZone).format('YYYY-MM-DD')
    const venue = contest.venues[this.state.venueIndex]

    this.props.fetchPerformances(contest, venue, dateString)
  }

  selectPerformance(performance) {
    const { navigate } = this.props.navigation

    const contest = this.contest()
    const venue = contest.venues[this.state.venueIndex]
    const timeZone = contest.timeZone

    navigate('Performance', { performance, venue, timeZone })
  }

  renderRow(performance) {
    const contest = this.contest()

    return (
      <PerformanceCell
        key={performance.id}
        onSelect={() => this.selectPerformance(performance)}
        performance={performance}
        timeZone={contest.timeZone}
      />
    )
  }

  render() {
    const contest = this.contest()
    const endDate = moment(contest.endDate)
    var date = moment(contest.startDate)
    var dates = [date]

    while (date.isBefore(endDate)) {
      var newDate = date.clone()
      newDate.add(1, 'days')
      dates.push(newDate)
      date = newDate
    }

    const dayFormat = dates.length > 2 ? 'ddd, Do MMMM' : 'dddd, Do MMMM'

    return (
      <View style={styles.container}>
        <View style={styles.filterControls}>
          <SegmentedControl
            values={dates.map(date => date.tz(contest.timeZone).format(dayFormat))}
            selectedIndex={this.state.dateIndex}
            onChange={index => this.setState({ dateIndex: index })}
          />
          <SegmentedControl
            values={contest.venues.map(venue => venue.name)}
            selectedIndex={this.state.venueIndex}
            onChange={index => this.setState({ venueIndex: index })}
          />
        </View>
        {this.renderContent()}
      </View>
    )
  }

  renderContent() {
    const { fetchingPerformances } = this.props

    const statusText = this.statusText()

    return (
      <View style={styles.content}>
        <View style={styles.statusContainer}>
          {statusText && <Text style={styles.statusText}>{statusText}</Text>}
        </View>
        <ListView
          style={styles.listView}
          dataSource={this.state.dataSource}
          renderRow={this.renderRow.bind(this)}
          refreshControl={
            <RefreshControl
              refreshing={fetchingPerformances}
              onRefresh={() => this.fetchData()}
            />
          }
          enableEmptySections={true}
        />
      </View>
    )
  }

  statusText(): ?string {
    const { performances, fetchPerformancesError, fetchingPerformances } = this.props

    if (fetchPerformancesError) {
      return [
        'Der Vorspielplan konnte leider nicht geladen werden. 😕',
        'Prüfe bitte auch, ob du die neueste Version der App verwendest!',
      ].join('\n')
    } else if (!performances && fetchingPerformances) {
      return 'Einen Moment, bitte…'
    } else if (performances && performances.length === 0) {
      return 'An diesem Tag finden am ausgewählten Ort keine Vorspiele statt.'
    } else {
      return null
    }
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
  },
  filterControls: {
    minHeight: 80,
    marginTop: 6,
    marginBottom: 6,
  },
  content: {
    flex: 1,
  },
  statusContainer: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    left: 0,
    right: 0,
    top: 0,
    position: 'absolute',
  },
  statusText: {
    color: colors.lightGray,
    fontSize: 16,
    fontStyle: 'italic',
    marginLeft: 16,
    marginRight: 16,
    textAlign: 'center',
  },
})

function mapStateToProps(state: State): PropsFromState {
  return {
    contest: state.contests.currentContest,
    fetchPerformancesError: state.performances.fetchPerformancesError,
    fetchingPerformances: state.performances.fetchingPerformances,
    performances: state.performances.performances,
  }
}

const mapDispatchToProps: PropsFromDispatch = {
  fetchPerformances,
}

export default connect(mapStateToProps, mapDispatchToProps)(PerformanceListScreen)
