// @flow
import type { NavigationScreenProp } from 'react-navigation'
import type { State } from '../redux/modules'
import type { Contest } from '../redux/modules/contests'

import React, { Component } from 'react'
import { Platform, StyleSheet } from 'react-native'
import { StackNavigator, TabNavigator } from 'react-navigation'
import { connect } from 'react-redux'

import listIcon from '../../images/icon-list.png'
import IconButton from '../components/IconButton'
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
    const { contest, navigation: { goBack } } = this.props
    if (!contest) return null

    const navigationOptions = {
      header: {
        style: { backgroundColor: colors.primary },
        tintColor: colors.white,
      },
    }

    const contestListButton = <IconButton
      style={styles.contestListButton}
      icon={listIcon}
      onPress={() => goBack()}
    />

    const TimetableTab = StackNavigator({
      PerformanceList: {
        screen: PerformanceListScreen,
        navigationOptions: {
          title: () => contest.name,
          header: {
            ...navigationOptions.header,
            left: contestListButton,
          },
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
      tabBarOptions: this.tabBarOptions(),
    })

    return <TabStack />
  }

  tabBarOptions() {
    if (Platform.OS === 'android') {
      return {
        style: styles.tabBarAndroid,
        indicatorStyle: styles.tabBarIndicatorAndroid,
      }
    } else {
      return undefined
    }
  }
}

const styles = StyleSheet.create({
  contestListButton: {
    marginLeft: 8,
  },
  tabBarAndroid: {
    backgroundColor: colors.primary,
  },
  tabBarIndicatorAndroid: {
    backgroundColor: colors.white,
  },
})

function mapStateToProps(state: State): PropsFromState {
  return {
    contest: state.contests.currentContest,
  }
}

export default connect(mapStateToProps)(HomeScreen)
