import React, { Component } from 'react'
import { AppRegistry, StyleSheet } from 'react-native'

import Router from 'react-native-simple-router';
import ContestListScreen from './ContestListScreen';
import BackButton from './BackButton';
import { PRIMARY_COLOR } from './Constants';
import moment from 'moment-timezone'
import deLocale from 'moment/locale/de'

moment.updateLocale('de', deLocale);

class JumuNordost extends Component {
  render() {
    return (
      <Router
        firstRoute={firstRoute}
        headerStyle={styles.header}
        handleBackAndroid={true}
        backButtonComponent={BackButton}
      />
    )
  }
}

const firstRoute = {
  name: 'Wettbewerbe',
  component: ContestListScreen
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    backgroundColor: PRIMARY_COLOR
  },
});

AppRegistry.registerComponent('JumuNordost', () => JumuNordost);
