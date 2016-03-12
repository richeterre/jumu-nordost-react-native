'use strict';
import React, {
  Component,
  StyleSheet,
  Text,
  View
} from 'react-native';

class PerformanceScreen extends Component {

  render() {
    const performance = this.props.performance
    const venue = this.props.venue
    return (
      <View style={styles.container}>
        <Text>{performance.stage_time}</Text>
        <Text>{venue.name}</Text>
        <Text>{performance.category_name}</Text>
        <Text>Altersgruppe {performance.age_group}</Text>
        <Text>{performance.predecessor_host_name}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});

export default PerformanceScreen;
