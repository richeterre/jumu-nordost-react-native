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
            <Text style={styles.dateInfo} numberOfLines={1}>
              {moment(contest.startDate).tz(contest.timeZone).format('LL')}
              –
              {moment(contest.endDate).tz(contest.timeZone).format('LL')}
            </Text>
          </View>
        </TouchableElement>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
  },
  name: {
    color: colors.gray,
    fontFamily: fonts.regular.normal,
    fontSize: 19,
    marginBottom: 5,
  },
  dateInfo: {
    color: colors.gray,
    fontFamily: fonts.regular.normal,
    fontSize: 14,
  },
})

export default ContestCell
