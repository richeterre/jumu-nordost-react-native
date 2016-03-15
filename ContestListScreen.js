'use strict';
import React, {
  AppState,
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
      loading: true,
      hasError: false
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
    this.setState({
      hasError: false,
      loading: true
    })

    fetch(
      BASE_URL + 'contests?current_only=1&timetables_public=1',
      { headers: { 'X-Api-Key': API_KEY } }
    )
    .then((response) => response.json())
    .then((responseData) => {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(responseData),
        loading: false,
      });
    })
    .catch(error => {
      this.setState({
        hasError: true,
        loading: false
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
    const messageText = this.state.hasError
      ? "Die Wettbewerbe konnten leider nicht geladen werden."
      : "Einen Moment, bitte…"

    return (
      <View style={styles.container}>
        <View style={styles.welcomeView}>
          <Text style={styles.welcomeText}>
            Willkommen! Bitte wähle einen Wettbewerb:
          </Text>
        </View>
        <View style={styles.contentArea}>
          {
            this.state.loading || this.state.hasError
            ?
            <Text style={styles.messageText}>
              {messageText}
            </Text>
            :
            <ListView
              dataSource={this.state.dataSource}
              renderRow={this.renderRow.bind(this)}
              style={styles.listView}
              />
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
  welcomeView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: 20
  },
  welcomeText: {
    fontStyle: 'italic'
  },
  contentArea: {
    flex: 7
  },
  messageText: {
    marginTop: 100,
    textAlign: 'center',
    fontStyle: 'italic'
  },
  listView: {
    paddingLeft: 20,
  }
});

export default ContestListScreen;
