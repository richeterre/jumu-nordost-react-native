// @flow
import type { NavigationScreenProp } from 'react-navigation'
import type { State } from '../redux/modules'
import type { Contest } from '../redux/modules/contests'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { AppState, ListView, StyleSheet, Text, View } from 'react-native'

import filterIcon from '../../images/icon-filter.png'
import filterIconFilled from '../../images/icon-filter-filled.png'
import ContestCell from '../components/ContestCell'
import IconButton from '../components/IconButton'
import ListViewWithStatus from '../components/ListViewWithStatus'
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
  fetchContests: (currentOnly: boolean) => any,
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
    header: ({ state: { params }, setParams }, defaultHeader) => {
      return {
        ...defaultHeader,
        left: <IconButton
          style={styles.filterButton}
          icon={params.showCurrentOnly ? filterIconFilled : filterIcon}
          onPress={() => setParams({ showCurrentOnly: !params.showCurrentOnly })}
        />,
      }
    },
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
    this.fetchData()
  }

  componentWillReceiveProps(nextProps) {
    const showCurrentOnly = this.showCurrentOnly(nextProps)
    if (showCurrentOnly !== this.showCurrentOnly(this.props)) {
      this.props.fetchContests(showCurrentOnly)
    }

    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(nextProps.contests || []),
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

  fetchData() {
    this.props.fetchContests(this.showCurrentOnly(this.props))
  }

  render() {
    const showCurrentOnly = this.showCurrentOnly(this.props)

    return (
      <View style={styles.root}>
        <Text style={styles.welcomeText}>
          {[
            'Willkommen!',
            `Bitte wähle einen${showCurrentOnly ? ' aktuellen' : ''} Wettbewerb:`,
          ].join('\n')}
        </Text>
        {this.renderContent()}
      </View>
    )
  }

  renderContent() {
    const { fetchContests, fetchingContests } = this.props
    const showCurrentOnly = this.showCurrentOnly(this.props)

    const statusText = this.statusText()

    return (
      <ListViewWithStatus
        style={styles.listView}
        dataSource={this.state.dataSource}
        onRefresh={() => fetchContests(showCurrentOnly)}
        refreshing={fetchingContests}
        renderRow={this.renderRow.bind(this)}
        statusText={statusText}
      />
    )
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

  handleRowSelect(contest) {
    const { navigation: { navigate }, selectContest } = this.props
    selectContest(contest)
    navigate('Contest')
  }

  showCurrentOnly(props: Props): boolean {
    return props.navigation.state.params.showCurrentOnly
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
  filterButton: {
    marginLeft: 8,
  },
  root: {
    backgroundColor: colors.white,
    flex: 1,
  },
  welcomeText: {
    color: colors.lightGray,
    fontFamily: fonts.regular.italic,
    fontSize: 16,
    marginBottom: 8,
    marginLeft: 16,
    marginRight: 16,
    marginTop: 24,
    textAlign: 'center',
  },
  listView: {
    flex: 1,
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
