// @flow
import type { NavigationScreenProp } from 'react-navigation'

import emojiFlag from 'emoji-flag'
import moment from 'moment-timezone'
import React, { Component } from 'react'
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native'

import calendarIcon from '../../images/icon-calendar.png'
import locationIcon from '../../images/icon-location.png'
import Separator from '../components/Separator'
import colors from '../constants/colors'
import fonts from '../constants/fonts'

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
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          alwaysBounceVertical={false}
        >
          <View style={styles.generalInfo}>
            <Text style={styles.categoryName}>
              {performance.categoryName}
            </Text>
            <Text style={styles.ageGroup}>
              Altersgruppe {performance.ageGroup}
            </Text>
            <View style={styles.stageTimeInfo}>
              <Image style={styles.icon} source={calendarIcon} />
              <Text style={styles.stageTime}>
                {moment(performance.stageTime).tz(timeZone).format('LLLL')}
              </Text>
            </View>
            <View style={styles.venueInfo}>
              <Image style={styles.icon} source={locationIcon} />
              <Text style={styles.venueName}>{venue.name}</Text>
            </View>
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
    fontFamily: fonts.bold.normal,
    fontSize: 19,
  },
  ageGroup: {
    color: colors.gray,
    fontFamily: fonts.regular.normal,
    fontSize: 19,
    marginBottom: 16,
  },
  icon: {
    marginRight: 8,
  },
  stageTimeInfo: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  stageTime: {
    color: colors.gray,
    fontFamily: fonts.regular.normal,
    fontSize: 16,
  },
  venueInfo: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 4,
  },
  venueName: {
    color: colors.gray,
    fontFamily: fonts.regular.normal,
    fontSize: 16,
  },
  mainAppearanceText: {
    color: colors.gray,
    fontFamily: fonts.bold.normal,
    fontSize: 16,
  },
  accompanistText: {
    color: colors.lightGray,
    fontFamily: fonts.regular.normal,
    fontSize: 16,
  },
  predecessorInfo: {
    color: colors.gray,
    fontFamily: fonts.regular.normal,
    fontSize: 16,
    marginTop: 8,
  },
  piece: {
    marginBottom: 8,
  },
  composer: {
    color: colors.gray,
    fontFamily: fonts.bold.normal,
    fontSize: 16,
  },
  pieceTitle: {
    color: colors.gray,
    fontFamily: fonts.regular.normal,
    fontSize: 16,
  },
})

export default PerformanceScreen
