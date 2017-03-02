import moment from 'moment-timezone'
import React, { Component } from 'react'
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native'

import colors from '../constants/colors'
import { getFlag } from '../helpers/EmojiFlagHelper'

class PerformanceScreen extends Component {
  static navigationOptions = {
    title: ({ state }) => state.params.performance.category_name,
  }

  render() {
    const { params } = this.props.navigation.state
    const { performance, timeZone, venue } = params

    const mainAppearances = performance.appearances
      .filter(a => a.participant_role !== 'accompanist')

    const accompanists = performance.appearances
      .filter(a => a.participant_role === 'accompanist')

    const predecessorInfo = (Platform.OS === 'ios'
      ? getFlag(performance.predecessor_host_country) + ' ' + performance.predecessor_host_name
      : performance.predecessor_host_name
    )

    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.generalInfo}>
            <Text style={styles.categoryName}>{performance.category_name}</Text>
            <Text style={styles.ageGroup}>Altersgruppe {performance.age_group}</Text>
            <Text style={styles.stageTime}>
              {moment(performance.stage_time).tz(timeZone).format('LLLL')}
            </Text>
            <Text style={styles.venueName}>{venue.name}</Text>

          </View>
          <View style={styles.appearancesInfo}>
            {mainAppearances.map((appearance, i) =>
              <Text key={'mainAppearance' + (i + 1)} style={styles.mainAppearanceText}>
                {appearance.participant_name}, {appearance.instrument_name}
              </Text>
            )}
            {accompanists.map((appearance, i) => {
              const ageGroupText = appearance.age_group !== performance.age_group
                ? ' (AG ' + appearance.age_group + ')'
                : ''
              return <Text key={'accompanist' + (i + 1)} style={styles.accompanistText}>
                {appearance.participant_name}, {appearance.instrument_name}{ageGroupText}
                </Text>
            }
            )}
            <Text style={styles.predecessorInfo}>{predecessorInfo}</Text>
          </View>
          <View style={styles.piecesInfo}>
            {performance.pieces.map((piece, i) => {
              const composerDates = piece.composer_born
                ? ' (' + piece.composer_born + '–' + piece.composer_died + ')'
                : ''
              return <View key={'piece' + (i + 1)} style={styles.piece}>
                <Text style={styles.composer}>
                  {piece.composer_name}{composerDates}
                </Text>
                <Text style={styles.pieceTitle}>
                  {piece.title}
                </Text>
              </View>
            })}
          </View>
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  scrollContainer: {
    paddingTop: 10,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 10,
  },
  generalInfo: {
    paddingTop: 10,
    paddingBottom: 20,
  },
  categoryName: {
    fontSize: 17,
    color: colors.gray,
    fontWeight: 'bold',
  },
  ageGroup: {
    fontSize: 17,
    color: colors.gray,
    marginBottom: 10,
  },
  stageTime: {
    fontSize: 15,
    color: colors.gray,
  },
  venueName: {
    fontSize: 15,
    color: colors.gray,
  },
  appearancesInfo: {
    paddingBottom: 20,
  },
  mainAppearanceText: {
    fontSize: 15,
    color: colors.gray,
    fontWeight: 'bold',
  },
  accompanistText: {
    fontSize: 15,
    color: colors.lightGray,
  },
  predecessorInfo: {
    marginTop: 5,
    color: colors.gray,
  },
  piece: {
    marginBottom: 5,
  },
  composer: {
    fontWeight: 'bold',
    color: colors.gray,
    fontSize: 15,
  },
  pieceTitle: {
    color: colors.gray,
    fontSize: 15,
  },
})

export default PerformanceScreen
