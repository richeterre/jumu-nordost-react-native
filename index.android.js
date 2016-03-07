/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import React, {
  AppRegistry,
  Component,
  ListView,
  StyleSheet,
  Text,
  View
} from 'react-native';

// Grab credentials (add this file if missing, as it's ignored by Git)
var credentials = require('./credentials.json');

var CONTESTS_URL = 'http://192.168.56.1:5000/api/v1/contests';
var API_KEY = credentials['api-key']

class JumuNordost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    fetch(CONTESTS_URL, { headers: { 'X-Api-Key': API_KEY } })
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData),
          loaded: true,
        });
      })
      .done();
  }

  render() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderContest}
        style={styles.listView}
      />
    )
  }

  renderLoadingView() {
    return (
      <View style={styles.container}>
        <Text>Loading contests…</Text>
      </View>
    );
  }

  renderContest(contest) {
    return (
      <View style={styles.container}>
        <View style={styles.rightContainer}>
          <Text style={styles.name}>{contest.name}</Text>
          <Text style={styles.dateInfo}>{contest.start_date}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  thumbnail: {
    width: 53,
    height: 81
  },
  rightContainer: {
    flex: 1
  },
  name: {
    fontSize: 20,
    marginBottom: 8,
    textAlign: 'left'
  },
  dateInfo: {
    marginBottom: 16,
    textAlign: 'left'
  },
  listView: {
    paddingTop: 20,
    paddingLeft: 20,
    backgroundColor: '#F5FCFF'
  }
});

AppRegistry.registerComponent('JumuNordost', () => JumuNordost);
