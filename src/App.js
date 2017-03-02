// @flow

import deLocale from 'moment/locale/de'
import moment from 'moment-timezone'
import { AppRegistry, StyleSheet } from 'react-native'
import { StackNavigator } from 'react-navigation'

import ContestListScreen from './components/ContestListScreen'
import PerformanceListScreen from './components/PerformanceListScreen'
import PerformanceScreen from './components/PerformanceScreen'
import colors from './constants/colors'

moment.updateLocale('de', deLocale)

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.primary,
  },
})

const JumuNordost = StackNavigator({
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
