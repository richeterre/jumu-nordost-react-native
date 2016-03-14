'use strict';
import React, {
  Component,
  StyleSheet,
  Text,
  View
} from 'react-native';

import moment from 'moment-timezone'

class PerformanceScreen extends Component {

  render() {
    const performance = this.props.performance
    const venue = this.props.venue
    const timeZone = this.props.timeZone

    return (
      <View style={styles.container}>
        <View style={styles.generalInfo}>
          <Text>{moment(performance.stage_time).tz(timeZone).format('LLLL')}</Text>
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
          <Text style={styles.predecessorInfo}>{performance.predecessor_host_name}</Text>
        </View>
        <View style={styles.piecesInfo}>
          {performance.pieces.map((piece, i) =>
            <View key={'piece' + (i + 1)} style={styles.piece}>
            <Text style={styles.composer}>
              {piece.composer_name}
            </Text>
            <Text style={styles.piece}>
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
    paddingTop: 10,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 10,
    alignItems: 'flex-start',
  },
  generalInfo: {
    paddingTop: 20,
    paddingBottom: 20
  },
  appearancesInfo: {
    paddingBottom: 20
  },
  predecessorInfo: {
    marginTop: 5
  },
  piece: {
    marginBottom: 5
  },
  composer: {
    fontWeight: 'bold'
  }
});

export default PerformanceScreen;
