// @flow

import deLocale from 'moment/locale/de'
import moment from 'moment-timezone'
import React, { Component } from 'react'
import { AppRegistry, StyleSheet } from 'react-native'
import { StackNavigator } from 'react-navigation'
import { Provider } from 'react-redux'

import PerformanceListScreen from './components/PerformanceListScreen'
import PerformanceScreen from './components/PerformanceScreen'
import colors from './constants/colors'
import ContestListScreen from './containers/ContestListScreen'
import store from './redux/store'

moment.updateLocale('de', deLocale)

class JumuNordost extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    )
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.primary,
  },
})

const AppNavigator = StackNavigator({
  ContestList: { screen: ContestListScreen },
  PerformanceList: { screen: PerformanceListScreen },
  Performance: { screen: PerformanceScreen },
}, {
  navigationOptions: {
    header: {
      style: styles.header,
      tintColor: colors.white,
    },
  },
})

AppRegistry.registerComponent('JumuNordost', () => JumuNordost)
