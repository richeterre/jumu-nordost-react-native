'use strict';
import React, {
  Component,
  ListView,
  StyleSheet,
  Text,
  View
} from 'react-native';

import PerformanceCell from './PerformanceCell';
import PerformanceScreen from './PerformanceScreen';
import { BASE_URL, API_KEY } from './Constants';

class PerformanceListScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loading: true,
      currentVenue: props.contest.venues[0]
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    const contest = this.props.contest
    const query = '?venue_id=' + this.state.currentVenue.id + '&date=2016-03-17'
    fetch(
      BASE_URL + 'contests/' + contest.id + '/performances' + query,
      { headers: { 'X-Api-Key': API_KEY } }
    )
    .then((response) => response.json())
    .then((responseData) => {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(responseData),
        loading: false,
      });
    })
    .done();
  }

  selectPerformance(performance) {
    this.props.toRoute({
      name: performance.category_name,
      component: PerformanceScreen,
      passProps: {
        performance: performance,
        venue: this.state.currentVenue
      }
    });
  }

  renderLoadingView() {
    return (
      <View style={styles.container}>
        <Text>Loading performances…</Text>
      </View>
    );
  }

  renderRow(performance) {
    return (
      <PerformanceCell
        key={performance.id}
        onSelect={() => this.selectPerformance(performance)}
        performance={performance}
      />
    );
  }

  render() {
    if (this.state.loading) {
      return this.renderLoadingView();
    }

    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderRow.bind(this)}
        style={styles.listView}
      />
    )
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
  listView: {
    paddingTop: 20,
    paddingLeft: 20,
    backgroundColor: '#F5FCFF'
  }
});

export default PerformanceListScreen;
