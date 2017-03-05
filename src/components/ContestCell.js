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
          <View style={styles.row}>
            <View style={styles.container}>
              <View style={styles.rightContainer}>
                <Text style={styles.name}>
                  {`${emojiFlag(contest.hostCountry)} ${contest.name}`}
                </Text>
                <Text style={styles.dateInfo}>
                  {moment(contest.startDate).tz(contest.timeZone).format('LL')}
                  –
                  {moment(contest.endDate).tz(contest.timeZone).format('LL')}
                </Text>
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
    alignItems: 'center',
    backgroundColor: colors.white,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 10,
    paddingLeft: 20,
    paddingBottom: 10,
  },
  rightContainer: {
    flex: 1,
  },
  name: {
    color: colors.gray,
    fontSize: 20,
    marginBottom: 5,
    textAlign: 'left',
  },
  dateInfo: {
    textAlign: 'left',
    color: colors.gray,
  },
})

export default ContestCell
