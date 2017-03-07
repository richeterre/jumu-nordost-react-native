// @flow
import type { Contest } from '../redux/modules/contests'

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
  contest: Contest,
  onSelect: () => any,
|}

class ContestCell extends Component {
  props: Props

  render() {
    const { contest, onSelect } = this.props

    const TouchableElement = (Platform.OS === 'android')
      ? TouchableNativeFeedback
      : TouchableHighlight

    return (
      <View>
        <TouchableElement
          onPress={onSelect}
        >
          <View style={styles.container}>
            <Text style={styles.name} numberOfLines={1}>
              {`${emojiFlag(contest.hostCountry)} ${contest.name}`}
            </Text>
            <Text style={styles.dateRange} numberOfLines={1}>
              {this.formattedDateRange(
                contest.startDate,
                contest.endDate,
                contest.timeZone
              )}
            </Text>
          </View>
        </TouchableElement>
      </View>
    )
  }

  formattedDateRange(startDate: string, endDate: string, timeZone: string): string {
    const startMoment = moment(startDate).tz(timeZone)
    const endMoment = moment(endDate).tz(timeZone)

    if (startMoment.isSame(endMoment)) {
      return startMoment.format('LL')
    } else if (startMoment.isSame(endMoment, 'month')) {
      return `${startMoment.format('Do')}–${endMoment.format('LL')}`
    } else {
      return `${startMoment.format('LL')}–${endMoment.format('LL')}`
    }
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    paddingBottom: 12,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 8,
  },
  name: {
    color: colors.gray,
    fontFamily: fonts.regular.normal,
    fontSize: 19,
  },
  dateRange: {
    color: colors.gray,
    fontFamily: fonts.regular.normal,
    fontSize: 14,
  },
})

export default ContestCell
