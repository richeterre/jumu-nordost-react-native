// @flow
import type { NavigationScreenProp } from 'react-navigation'
import type { State } from '../redux/modules'
import type { Contest } from '../redux/modules/contests'

import React, { Component } from 'react'
import { StackNavigator, TabNavigator } from 'react-navigation'
import { connect } from 'react-redux'

import PerformanceScreen from '../components/PerformanceScreen'
import colors from '../constants/colors'
import PerformanceListScreen from './PerformanceListScreen'

type PropsFromParent = {|
  navigation: NavigationScreenProp,
|}

type PropsFromState = {|
  contest: ?Contest,
|}

type Props = PropsFromParent & PropsFromState

class HomeScreen extends Component {
  props: Props

  componentDidMount() {
    const { contest, navigation: { navigate } } = this.props
    if (!contest) {
      navigate('ContestList')
    }
  }

  render() {
    const { contest } = this.props
    if (!contest) return null

    const navigationOptions = {
      header: {
        style: { backgroundColor: colors.primary },
        tintColor: colors.white,
      },
    }

    const TimetableTab = StackNavigator({
      PerformanceList: {
        screen: PerformanceListScreen,
        navigationOptions: {
          title: () => contest.name,
        },
      },
      Performance: { screen: PerformanceScreen },
    }, {
      navigationOptions,
    })

    const TabStack = TabNavigator({
      TimetableTab: {
        screen: TimetableTab,
        navigationOptions: {
          tabBar: () => ({
            label: 'Vorspielplan',
          }),
        },
      },
    }, {
      tabBarPosition: 'bottom',
      animationEnabled: false,
      swipeEnabled: false,
    })

    return <TabStack />
  }
}

function mapStateToProps(state: State): PropsFromState {
  return {
    contest: state.contests.currentContest,
  }
}

export default connect(mapStateToProps)(HomeScreen)
