// @flow
import type { Appearance, Performance, Result } from '../redux/modules/performances'

import emojiFlag from 'emoji-flag'
import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import AdvancementBadge from './AdvancementBadge'
import colors from '../constants/colors'
import fonts from '../constants/fonts'

type Props = {|
  performance: Performance,
|}

class ResultCell extends Component {
  props: Props

  render() {
    const { performance } = this.props

    const { predecessorHostCountry, predecessorHostName } = performance

    const predecessorInfo = predecessorHostCountry && predecessorHostName
      ? `${emojiFlag(predecessorHostCountry)} ${predecessorHostName}`
      : null

    return (
      <View style={styles.row}>
        <View style={styles.container}>
          <View style={styles.appearances}>
            {performance.appearances.map(this.renderAppearance.bind(this))}
          </View>
          <Text style={styles.generalInfo}>
            {[predecessorInfo, `AG ${performance.ageGroup}`].join(', ')}
          </Text>
        </View>
      </View>
    )
  }

  renderAppearance(appearance: Appearance, index: number) {
    const result = appearance.result

    return (
      <View style={styles.appearance} key={`appearance-${index}`}>
        <Text style={styles.participantInfo}>
          {`${appearance.participantName}, ${appearance.instrumentName}`}
        </Text>
        {result && this.renderResultView(result)}
      </View>
    )
  }

  renderResultView(result: Result) {
    const abbreviatedRating = result.rating
      ? this.abbreviateRating(result.rating)
      : null

    return (
      <View style={styles.resultView}>
        <Text style={styles.points}>
          {result.points}
        </Text>
        {result.prize ? (
          <View style={styles.prizeContainer}>
            <Text style={styles.prize}>
              {result.prize}
            </Text>
            {result.advancesToNextRound &&
              <AdvancementBadge style={styles.advancementBadge} />
            }
          </View>
        ) : (
          <Text style={styles.rating} numberOfLines={1}>
            {abbreviatedRating}
          </Text>
        )}
      </View>
    )
  }

  abbreviateRating(rating: string): string {
    // Note the thin spaces between one-letter abbreviations
    switch (rating) {
      case 'mit hervorragendem Erfolg teilgenommen':
        return 'm. h. E. teilgen.'
      case 'mit sehr gutem Erfolg teilgenommen':
        return 'm. s. g. E. teilg.'
      case 'mit gutem Erfolg teilgenommen':
        return 'm. g. E. teilgen.'
      case 'mit Erfolg teilgenommen':
        return 'm. E. teilgen.'
      case 'teilgenommen':
        return 'teilgen.'
      default:
        return rating
    }
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    paddingBottom: 12,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 12,
  },
  appearance: {
    alignItems: 'flex-start',
    flexDirection: 'row',
  },
  participantInfo: {
    color: colors.gray,
    flex: 1,
    fontFamily: fonts.regular.normal,
    fontSize: 16,
  },
  resultView: {
    flexDirection: 'row',
  },
  points: {
    color: colors.gray,
    fontFamily: fonts.regular.normal,
    fontSize: 16,
    marginLeft: 8,
    marginRight: 8,
    textAlign: 'right',
    width: 20,
  },
  prizeContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    width: 90,
  },
  prize: {
    color: colors.gray,
    fontFamily: fonts.regular.normal,
    fontSize: 16,
    width: 55,
  },
  advancementBadge: {
    marginLeft: 2,
  },
  rating: {
    color: colors.gray,
    fontFamily: fonts.regular.normal,
    fontSize: 14,
    marginTop: 2,
    width: 90,
  },
  generalInfo: {
    color: colors.gray,
    fontFamily: fonts.regular.normal,
    fontSize: 16,
    marginTop: 5,
  },
})

export default ResultCell
