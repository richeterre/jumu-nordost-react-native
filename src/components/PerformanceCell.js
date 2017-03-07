// @flow
import type { Performance } from '../redux/modules/performances'

import emojiFlag from 'emoji-flag'
import moment from 'moment-timezone'
import React, { Component } from 'react'
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableNativeFeedback,
  View,
} from 'react-native'

import forwardArrow from '../../images/arrow-forward.png'
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
                {performance.appearances.map((appearance, index) =>
                  <Text key={`appearance-${index}`} style={styles.appearanceText}>
                    {`${appearance.participantName}, ${appearance.instrumentName}`}
                  </Text>
                )}
              </View>
              {predecessorInfo &&
                <Text style={styles.predecessorInfo}>
                  {predecessorInfo}
                </Text>
              }
            </View>
            <Image style={styles.arrow} source={forwardArrow} />
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
    paddingTop: 8,
    paddingLeft: 16,
    paddingRight: 12,
    paddingBottom: 8,
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
  arrow: {
    alignSelf: 'center',
    marginLeft: 4,
    tintColor: colors.veryLightGray,
  },
})

export default PerformanceCell
