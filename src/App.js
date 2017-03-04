// @flow

import deLocale from 'moment/locale/de'
import moment from 'moment-timezone'
import React, { Component } from 'react'
import { AppRegistry } from 'react-native'
import { StackNavigator } from 'react-navigation'
import { Provider } from 'react-redux'

import colors from './constants/colors'
import ContestListScreen from './containers/ContestListScreen'
import ContestScreen from './containers/ContestScreen'
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

const AppNavigator = StackNavigator({
  ContestList: { screen: ContestListScreen },
  Contest: {
    screen: ContestScreen,
    navigationOptions: {
      header: {
        visible: false,
      },
    },
  },
}, {
  mode: 'modal',
  headerMode: 'screen',
  navigationOptions: {
    header: {
      style: { backgroundColor: colors.primary },
      tintColor: colors.white,
    },
    cardStack: {
      gesturesEnabled: false,
    },
  },
})

AppRegistry.registerComponent('JumuNordost', () => JumuNordost)
