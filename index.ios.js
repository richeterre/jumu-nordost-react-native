import React, { Component } from 'react'
import {
 AppRegistry,
 NavigatorIOS,
 StyleSheet,
} from 'react-native'

import ContestListScreen from './src/components/ContestListScreen'
import { PRIMARY_COLOR } from './src/Constants'
import moment from 'moment-timezone'
import deLocale from 'moment/locale/de'

moment.updateLocale('de', deLocale)

class JumuNordost extends Component {
  render() {
    return (
      <NavigatorIOS
        barTintColor={PRIMARY_COLOR}
        tintColor='#FFFFFF'
        titleTextColor='#FFFFFF'
        style={styles.nav}
        translucent={false}
        initialRoute={initialRoute}
      />
    )
  }
}

const initialRoute = {
  title: 'Wettbewerbe',
  component: ContestListScreen,
  backButtonTitle: ' ',
}

const styles = StyleSheet.create({
  nav: {
    flex: 1,
  },
})

AppRegistry.registerComponent('JumuNordost', () => JumuNordost)
