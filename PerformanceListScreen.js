'use strict';
import React, {
  Component,
  StyleSheet,
  Text,
  View
} from 'react-native';

class PerformanceListScreen extends Component {

  render() {
    return (
      <View style="styles.container">
        <Text>{this.props.contest.name}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default PerformanceListScreen;
