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

class JumuNordost extends Component {
  render() {
    return (
      <Router
        firstRoute={firstRoute}
        headerStyle={styles.header}
        handleBackAndroid={true}
      />
    )
  }
}

const firstRoute = {
  name: 'Contests',
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
