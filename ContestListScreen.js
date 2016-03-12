'use strict';
import React, {
  Component,
  ListView,
  StyleSheet,
  Text,
  View
} from 'react-native';

import ContestCell from './ContestCell';
import PerformanceListScreen from './PerformanceListScreen';
import { BASE_URL, API_KEY } from './Constants';

class ContestListScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loading: true
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    fetch(
      BASE_URL + 'contests?timetables_public=1',
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

  selectContest(contest) {
    this.props.toRoute({
      name: contest.name,
      component: PerformanceListScreen,
      passProps: {
        contest: contest
      }
    });
  }

  renderLoadingView() {
    return (
      <View style={styles.container}>
        <Text>Loading contests…</Text>
      </View>
    );
  }

  renderRow(contest) {
    return (
      <ContestCell
        key={contest.id}
        onSelect={() => this.selectContest(contest)}
        contest={contest}
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

export default ContestListScreen;
