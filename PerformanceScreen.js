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
        <View style={styles.generalInfo}>
          <Text>{performance.stage_time}</Text>
          <Text>{venue.name}</Text>
          <Text>{performance.category_name}</Text>
          <Text>Altersgruppe {performance.age_group}</Text>
        </View>
        <View style={styles.appearancesInfo}>
          {performance.appearances.map((appearance, i) =>
            <Text key={'appearance' + (i + 1)}>
              {appearance.participant_name}, {appearance.instrument_name}
            </Text>
          )}
          <Text>{performance.predecessor_host_name}</Text>
        </View>
        <View style={styles.piecesInfo}>
          {performance.pieces.map((piece, i) =>
            <View key={'piece' + (i + 1)}>
            <Text>
              {piece.composer_name}
            </Text>
            <Text>
              {piece.title}
            </Text>
            </View>
          )}
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
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  generalInfo: {
    paddingTop: 20,
    paddingBottom: 20
  },
  appearancesInfo: {
    paddingBottom: 20
  }
});

export default PerformanceScreen;
