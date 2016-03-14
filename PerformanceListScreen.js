'use strict';
import React, {
  AppState,
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
      dateIndex: 0,
      venueIndex: 0
    };
  }

  componentDidMount() {
    AppState.addEventListener('change', this.handleAppStateChange.bind(this));
    this.fetchData();
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleAppStateChange.bind(this));
  }

  handleAppStateChange(currentAppState) {
    if (currentAppState == 'active') {
      this.fetchData()
    }
  }

  fetchData() {
    const contest = this.props.contest
    const date = moment(contest.start_date).add(this.state.dateIndex, 'days')
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
      const contest = this.props.contest
      const endDate = moment(contest.end_date)
      var date = moment(contest.start_date)
      var dates = [date]

      while (date.isBefore(endDate)) {
          var new_date = date.clone()
          new_date.add(1, 'days')
          dates.push(new_date)
          date = new_date
      }

      const dayFormat = dates.length > 2 ? 'ddd, Do MMMM' : 'dddd, Do MMMM'

      return (
        <View style={styles.container}>
          <View style={styles.filterControls}>
            <SegmentedView
              titles={dates.map( date => date.tz(contest.time_zone).format(dayFormat) )}
              index={this.state.dateIndex}
              stretch
              onPress={index => {
                  this.setState({ dateIndex: index })
                  this.fetchData()
                }
              }
              selectedTitleStyle={{fontWeight:'bold', color: '#D61921'}}
            />
            <SegmentedView
              titles={contest.venues.map(venue => venue.name)}
              index={this.state.venueIndex}
              stretch
              onPress={index => {
                  this.setState({ venueIndex: index })
                  this.fetchData()
                }
              }
              selectedTitleStyle={{fontWeight:'bold', color: '#D61921'}}
            />
          </View>
          <View style={styles.contentArea}>
            {
              this.state.loading
              ?
              <Text style={styles.messageText}>
                Einen Moment, bitte…
              </Text>
              :
              (this.state.dataSource.getRowCount() > 0 ?
                <ListView
                  dataSource={this.state.dataSource}
                  renderRow={this.renderRow.bind(this)}
                  style={styles.listView}
                />
                :
                <Text style={styles.messageText}>
                  An diesem Tag finden am ausgewählten Ort keine Vorspiele statt.
                </Text>
              )
            }
          </View>
        </View>
      )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  messageText: {
    marginTop: 100,
    textAlign: 'center',
    fontStyle: 'italic'
  },
  filterControls: {
  },
  contentArea: {
    flex: 1
  },
  listView: {
    paddingLeft: 20,
    paddingRight: 10
  }
});

export default PerformanceListScreen;
