// @flow
import type { NavigationScreenProp } from 'react-navigation'
import type { State } from '../redux/modules'
import type { Contest, ContestCategory } from '../redux/modules/contests'
import type { Performance } from '../redux/modules/performances'

import { get } from 'lodash'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ListView, RefreshControl, StyleSheet, View } from 'react-native'

import ListStatusView from '../components/ListStatusView'
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

  constructor(props) {
    super(props)
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
    }
  }

  componentWillMount() {
    this.fetchData()
  }

  componentWillReceiveProps(nextProps: Props) {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(nextProps.performances || []),
    })
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

  renderRow(performance) {
    return (
      <ResultCell
        key={performance.id}
        performance={performance}
      />
    )
  }

  render() {
    const { fetchingPerformances } = this.props

    const statusText = this.statusText()

    return (
      <View style={styles.root}>
        <View style={styles.statusContainer}>
          {statusText &&
            <ListStatusView style={styles.statusView} text={statusText} />}
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
  root: {
    backgroundColor: colors.white,
    flex: 1,
  },
  statusContainer: {
    alignItems: 'center',
    bottom: 0,
    left: 0,
    right: 0,
    top: 0,
    position: 'absolute',
  },
  statusView: {
    marginTop: 96,
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
