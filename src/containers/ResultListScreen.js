// @flow
import type { NavigationScreenProp } from 'react-navigation'
import type { State } from '../redux/modules'
import type { Contest, ContestCategory } from '../redux/modules/contests'
import type { Performance } from '../redux/modules/performances'

import { get } from 'lodash'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { AppState, ListView, StyleSheet } from 'react-native'

import ListViewWithStatus from '../components/ListViewWithStatus'
import ResultCell from '../components/ResultCell'
import colors from '../constants/colors'
import { fetchResultPerformances } from '../redux/modules/performances'

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
  fetchPerformances: (contest: Contest, contestCategory: ContestCategory) => any,
|}

type Props = PropsFromParent & PropsFromState & PropsFromDispatch

type ComponentState = {|
  dataSource: ListView.DataSource,
|}

class PerformanceListScreen extends Component {
  props: Props
  state: ComponentState

  static navigationOptions = {
    title: ({ state }) => state.params.contestCategory.name,
  }

  constructor(props) {
    super(props)
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
    }
  }

  componentWillMount() {
    AppState.addEventListener('change', this.handleAppStateChange.bind(this))
    this.fetchData()
  }

  componentWillReceiveProps(nextProps: Props) {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(nextProps.performances || []),
    })
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
    const { contestCategory } = get(this.props, 'navigation.state.params')

    this.props.fetchPerformances(contest, contestCategory)
  }

  render() {
    const { fetchingPerformances } = this.props

    return (
      <ListViewWithStatus
        style={styles.listView}
        dataSource={this.state.dataSource}
        renderRow={this.renderRow.bind(this)}
        refreshing={fetchingPerformances}
        onRefresh={() => this.fetchData()}
        statusText={this.statusText()}
      />
    )
  }

  renderRow(performance) {
    return <ResultCell key={performance.id} performance={performance} />
  }

  statusText(): ?string {
    const { performances, fetchPerformancesError, fetchingPerformances } = this.props

    if (fetchPerformancesError) {
      return [
        'Die Ergebnisse konnten leider nicht geladen werden. 😕',
        'Prüfe bitte auch, ob du die neueste Version der App verwendest!',
      ].join('\n\n')
    } else if (!performances && fetchingPerformances) {
      return 'Einen Moment, bitte…'
    } else if (performances && performances.length === 0) {
      return 'In dieser Kategorie wurden noch keine Ergebnisse veröffentlicht.'
    } else {
      return null
    }
  }
}

const styles = StyleSheet.create({
  listView: {
    backgroundColor: colors.white,
    flex: 1,
  },
})

function mapStateToProps(state: State): PropsFromState {
  return {
    contest: state.contests.currentContest,
    fetchingPerformances: state.performances.fetchingResultPerformances,
    fetchPerformancesError: state.performances.fetchResultPerformancesError,
    performances: state.performances.resultPerformances,
  }
}

const mapDispatchToProps: PropsFromDispatch = {
  fetchPerformances: fetchResultPerformances,
}

export default connect(mapStateToProps, mapDispatchToProps)(PerformanceListScreen)
