// @flow
import type { Performance } from '../redux/modules/performances'

import emojiFlag from 'emoji-flag'
import moment from 'moment-timezone'
import React, { Component } from 'react'
import {
  Platform,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableNativeFeedback,
  View,
} from 'react-native'

import colors from '../constants/colors'
import fonts from '../constants/fonts'

type Props = {|
  onSelect: () => any,
  performance: Performance,
  timeZone: string,
|}

class PerformanceCell extends Component {
  props: Props

  render() {
    const { onSelect, performance, timeZone } = this.props

    const { predecessorHostCountry, predecessorHostName } = performance

    const predecessorInfo = predecessorHostCountry && predecessorHostName
      ? `${emojiFlag(predecessorHostCountry)} ${predecessorHostName}`
      : null

    const TouchableElement = (Platform.OS === 'android')
      ? TouchableNativeFeedback
      : TouchableHighlight

    return (
      <View>
        <TouchableElement onPress={onSelect}>
          <View style={styles.row}>
            <View style={styles.container}>
              <View style={styles.leftContainer}>
                <Text style={styles.time}>
                  {moment(performance.stageTime).tz(timeZone).format('HH:mm')}
                </Text>
              </View>
              <View style={styles.rightContainer}>
                <Text style={styles.categoryInfo}>
                  {performance.categoryName}, AG {performance.ageGroup}
                </Text>
                <View style={styles.appearances}>
                  {performance.appearances.map((appearance, i) =>
                    <Text key={'appearance' + (i + 1)} style={styles.appearanceText}>
                      {appearance.participantName}, {appearance.instrumentName}
                    </Text>
                  )}
                </View>
                {predecessorInfo &&
                  <Text style={styles.predecessorInfo}>
                    {predecessorInfo}
                  </Text>
                }
              </View>
            </View>
          </View>
        </TouchableElement>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
    flexDirection: 'row',
    paddingTop: 5,
    paddingLeft: 20,
    paddingRight: 10,
    paddingBottom: 5,
  },
  leftContainer: {
    flex: 1,
  },
  rightContainer: {
    flex: 5,
  },
  categoryInfo: {
    color: colors.gray,
    fontFamily: fonts.bold.normal,
    fontSize: 16,
    marginBottom: 8,
    textAlign: 'left',
  },
  time: {
    color: colors.gray,
    fontFamily: fonts.bold.normal,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  appearanceText: {
    color: colors.gray,
    fontFamily: fonts.regular.normal,
    fontSize: 16,
  },
  predecessorInfo: {
    color: colors.gray,
    fontFamily: fonts.regular.normal,
    fontSize: 16,
    marginTop: 5,
  },
})

export default PerformanceCell
