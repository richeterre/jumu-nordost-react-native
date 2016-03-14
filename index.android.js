/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import React, {
  AppRegistry,
  Component,
  StyleSheet
} from 'react-native';

import Router from 'react-native-simple-router';
import ContestListScreen from './ContestListScreen';
import BackButton from './BackButton';
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
    backgroundColor: '#D61921',
  },
});

AppRegistry.registerComponent('JumuNordost', () => JumuNordost);
