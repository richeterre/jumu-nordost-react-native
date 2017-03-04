// @flow
import type { NavigationScreenProp } from 'react-navigation'
import type { Contest, State } from '../redux/modules'

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
import colors from '../constants/colors'
import { fetchContests } from '../redux/modules'

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
    const { contests } = nextProps
    contests && this.setState({
      dataSource: this.state.dataSource.cloneWithRows(contests),
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

  selectContest(contest) {
    const { navigate } = this.props.navigation
    navigate('PerformanceList', { contest: contest })
  }

  renderRow(contest) {
    return (
      <ContestCell
        key={contest.id}
        onSelect={() => this.selectContest(contest)}
        contest={contest}
      />
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.welcomeView}>
          <Text style={styles.welcomeText}>
            Willkommen! Bitte wähle einen Wettbewerb:
          </Text>
        </View>
        <View style={styles.contentArea}>
          {this.renderContent()}
        </View>
      </View>
    )
  }

  renderContent() {
    const { contests, fetchContestsError } = this.props

    if (fetchContestsError) {
      return this.renderMessage('Die Wettbewerbe konnten leider nicht geladen werden.')
    } else if (contests === null) {
      return this.renderMessage('Einen Moment, bitte…')
    } else {
      return this.renderContestList()
    }
  }

  renderMessage(messageText: string) {
    return (
      <Text style={styles.messageText}>
        {messageText}
      </Text>
    )
  }

  renderContestList() {
    const { contests, fetchContests, fetchingContests } = this.props
    const refreshControlVisible = fetchingContests && !!contests

    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderRow.bind(this)}
        refreshControl={
          <RefreshControl
            refreshing={refreshControlVisible}
            onRefresh={() => fetchContests()}
          />
        }
        enableEmptySections={true}
      />
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
  },
  welcomeView: {
    justifyContent: 'center',
    padding: 20,
  },
  welcomeText: {
    fontStyle: 'italic',
  },
  contentArea: {
    flex: 1,
  },
  messageText: {
    marginTop: 100,
    textAlign: 'center',
    fontStyle: 'italic',
  },
})

function mapStateToProps(state: State): PropsFromState {
  return {
    contests: state.contests,
    fetchContestsError: state.fetchContestsError,
    fetchingContests: state.fetchingContests,
  }
}

const mapDispatchToProps: PropsFromDispatch = {
  fetchContests,
}

export default connect(mapStateToProps, mapDispatchToProps)(ContestListScreen)
