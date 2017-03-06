// @flow
import type { Performance } from '../redux/modules/performances'

import { get } from 'lodash'
import emojiFlag from 'emoji-flag'
import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'

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
            {performance.appearances.map((appearance, i) =>
              <View style={styles.appearance} key={'appearance' + (i + 1)} >
                <Text style={styles.participantInfo}>
                  {appearance.participantName}, {appearance.instrumentName}
                </Text>
                <Text style={styles.result}>
                  {get(appearance, 'result.points')}
                </Text>
              </View>
            )}
          </View>
          <Text style={styles.generalInfo}>
            {[predecessorInfo, `AG ${performance.ageGroup}`].join(', ')}
          </Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    paddingBottom: 8,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 8,
  },
  appearance: {
    flexDirection: 'row',
  },
  result: {
    color: colors.gray,
    fontFamily: fonts.regular.normal,
    fontSize: 16,
    width: 20,
  },
  participantInfo: {
    color: colors.gray,
    flex: 1,
    fontFamily: fonts.regular.normal,
    fontSize: 16,
  },
  generalInfo: {
    color: colors.gray,
    fontFamily: fonts.regular.normal,
    fontSize: 16,
    marginTop: 5,
  },
})

export default ResultCell
