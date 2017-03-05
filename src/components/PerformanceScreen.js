// @flow
import type { NavigationScreenProp } from 'react-navigation'

import emojiFlag from 'emoji-flag'
import moment from 'moment-timezone'
import React, { Component } from 'react'
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native'

import Separator from '../components/Separator'
import colors from '../constants/colors'

type Props = {|
  navigation: NavigationScreenProp,
|}

class PerformanceScreen extends Component {
  props: Props

  static navigationOptions = {
    title: ({ state }) => state.params.performance.categoryName,
  }

  render() {
    const { params } = this.props.navigation.state
    const { performance, timeZone, venue } = params

    const mainAppearances = performance.appearances
      .filter(a => a.participantRole !== 'accompanist')

    const accompanists = performance.appearances
      .filter(a => a.participantRole === 'accompanist')

    const { predecessorHostCountry, predecessorHostName } = performance

    const predecessorInfo = predecessorHostCountry && predecessorHostName
      ? emojiFlag(predecessorHostCountry) + ' ' + predecessorHostName
      : null

    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.generalInfo}>
            <Text style={styles.categoryName}>{performance.categoryName}</Text>
            <Text style={styles.ageGroup}>Altersgruppe {performance.ageGroup}</Text>
            <Text style={styles.stageTime}>
              {moment(performance.stageTime).tz(timeZone).format('LLLL')}
            </Text>
            <Text style={styles.venueName}>{venue.name}</Text>
          </View>
          <Separator style={styles.separator} />
          <View>
            {mainAppearances.map((appearance, i) =>
              <Text key={'mainAppearance' + (i + 1)} style={styles.mainAppearanceText}>
                {appearance.participantName}, {appearance.instrumentName}
              </Text>
            )}
            {accompanists.map((appearance, i) => {
              const ageGroupText = appearance.ageGroup !== performance.ageGroup
                ? ' (AG ' + appearance.ageGroup + ')'
                : ''
              return <Text key={'accompanist' + (i + 1)} style={styles.accompanistText}>
                {appearance.participantName}, {appearance.instrumentName}{ageGroupText}
                </Text>
            }
            )}
            {predecessorInfo &&
              <Text style={styles.predecessorInfo}>{predecessorInfo}</Text>
            }
          </View>
          <Separator style={styles.separator} />
          <View style={styles.piecesInfo}>
            {performance.pieces.map((piece, i) => {
              const composerDates = piece.composerBorn
                ? ' (' + piece.composerBorn + '–' + piece.composerDied + ')'
                : ''
              return <View key={'piece' + (i + 1)} style={styles.piece}>
                <Text style={styles.composer}>
                  {piece.composerName}{composerDates}
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
    backgroundColor: colors.white,
    flex: 1,
  },
  scrollContainer: {
    paddingTop: 10,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 10,
  },
  separator: {
    alignSelf: 'center',
    marginBottom: 16,
    marginTop: 16,
    width: '70%',
  },
  generalInfo: {
    marginTop: 8,
  },
  categoryName: {
    color: colors.gray,
    fontSize: 17,
    fontWeight: 'bold',
  },
  ageGroup: {
    color: colors.gray,
    fontSize: 17,
    marginBottom: 10,
    marginBottom: 16,
  },
  stageTime: {
    color: colors.gray,
    fontSize: 15,
  },
  venueName: {
    color: colors.gray,
    fontSize: 15,
  },
  mainAppearanceText: {
    color: colors.gray,
    fontSize: 15,
    fontWeight: 'bold',
  },
  accompanistText: {
    color: colors.lightGray,
    fontSize: 15,
  },
  predecessorInfo: {
    color: colors.gray,
    marginTop: 5,
  },
  piece: {
    marginBottom: 5,
  },
  composer: {
    color: colors.gray,
    fontWeight: 'bold',
    fontSize: 15,
  },
  pieceTitle: {
    color: colors.gray,
    fontSize: 15,
  },
})

export default PerformanceScreen
