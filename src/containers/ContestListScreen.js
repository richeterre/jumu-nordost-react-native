// @flow
import type { NavigationScreenProp } from 'react-navigation'
import type { State } from '../redux/modules'
import type { Contest } from '../redux/modules/contests'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  AppState,
  ListView,
  StyleSheet,
  RefreshControl,
  Text,
  View,
} from 'react-native'

import ContestCell from '../components/ContestCell'
import ListStatusView from '../components/ListStatusView'
import colors from '../constants/colors'
import fonts from '../constants/fonts'
import { fetchContests, selectContest } from '../redux/modules/contests'

type PropsFromParent = {|
  navigation: NavigationScreenProp,
|}

type PropsFromState = {|
  contests: ?Array<Contest>,
  fetchContestsError: boolean,
  fetchingContests: boolean,
|}

type PropsFromDispatch = {|
  fetchContests: () => any,
  selectContest: (contest: Contest) => any,
|}

type Props = PropsFromParent & PropsFromState & PropsFromDispatch

type ComponentState = {|
  dataSource: ListView.DataSource,
|}

class ContestListScreen extends Component {
  props: Props
  state: ComponentState

  static navigationOptions = {
    title: 'Wettbewerbe',
  }

  constructor(props) {
    super(props)

    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
    }
  }

  componentDidMount() {
    AppState.addEventListener('change', this.handleAppStateChange.bind(this))

    this.props.fetchContests()
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(nextProps.contests || []),
    })
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleAppStateChange.bind(this))
  }

  handleAppStateChange(currentAppState) {
    if (currentAppState === 'active') {
      this.props.fetchContests()
    }
  }

  handleRowSelect(contest) {
    const { navigation: { navigate }, selectContest } = this.props
    selectContest(contest)
    navigate('Contest')
  }

  renderRow(contest) {
    return (
      <ContestCell
        key={contest.id}
        onSelect={() => this.handleRowSelect(contest)}
        contest={contest}
      />
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcomeText}>
          {`Willkommen!\nBitte wähle einen Wettbewerb:`}
        </Text>
        {this.renderContent()}
      </View>
    )
  }

  renderContent() {
    const { fetchContests, fetchingContests } = this.props

    const statusText = this.statusText()

    return (
      <View style={styles.content}>
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
              refreshing={fetchingContests}
              onRefresh={() => fetchContests()}
            />
          }
          enableEmptySections={true}
        />
      </View>
    )
  }

  statusText(): ?string {
    const { contests, fetchContestsError, fetchingContests } = this.props

    if (fetchContestsError) {
      return [
        'Die Wettbewerbe konnten leider nicht geladen werden. 😕',
        'Prüfe bitte auch, ob du die neueste Version der App verwendest!',
      ].join('\n\n')
    } else if (!contests && fetchingContests) {
      return 'Einen Moment, bitte…'
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
  welcomeText: {
    color: colors.lightGray,
    fontFamily: fonts.regular.italic,
    fontSize: 16,
    padding: 16,
    textAlign: 'center',
  },
  content: {
    flex: 1,
  },
  statusContainer: {
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
    contests: state.contests.contests,
    fetchContestsError: state.contests.fetchContestsError,
    fetchingContests: state.contests.fetchingContests,
  }
}

const mapDispatchToProps: PropsFromDispatch = {
  fetchContests,
  selectContest,
}

export default connect(mapStateToProps, mapDispatchToProps)(ContestListScreen)
