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
import moment from 'moment-timezone';
import SegmentedView from 'react-native-segmented-view';

class PerformanceListScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loading: true,
      venueIndex: 0
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    const contest = this.props.contest
    const date = moment(contest.start_date)
    const dateString = date.tz(contest.time_zone).format('YYYY-MM-DD')
    const venue = contest.venues[this.state.venueIndex]

    const query = '?venue_id=' + venue.id + '&date=' + dateString

    this.setState({ loading: true })

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
        venue: this.props.contest.venues[this.state.venueIndex],
        timeZone: this.props.contest.time_zone
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
        timeZone={this.props.contest.time_zone}
      />
    );
  }

  render() {
      return (
        <View>
          <SegmentedView
            titles={this.props.contest.venues.map(venue => venue.name)}
            index={this.state.venueIndex}
            stretch
            onPress={index => {
                this.setState({ venueIndex: index })
                this.fetchData()
              }
            }
            selectedTitleStyle={{fontWeight:'bold'}}
          />
          {
            this.state.loading
            ?
            <Text style={styles.loadingText}>Loading performances…</Text>
            :
            <ListView
              dataSource={this.state.dataSource}
              renderRow={this.renderRow.bind(this)}
              style={styles.listView}
            />
          }
        </View>
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
  loadingText: {
    marginTop: 100,
    textAlign: 'center'
  },
  listView: {
    paddingTop: 20,
    paddingLeft: 20,
    backgroundColor: '#F5FCFF'
  }
});

export default PerformanceListScreen;
