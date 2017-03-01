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

class ContestCell extends Component {
  render() {
    const contest = this.props.contest

    var TouchableElement = TouchableHighlight
    if (Platform.OS === 'android') {
      TouchableElement = TouchableNativeFeedback
    }

    return (
      <View>
        <TouchableElement
          onPress={this.props.onSelect}
        >
          <View style={styles.row}>
            {/* $FlowIssue #7363964 - There's a bug in Flow where you cannot
              * omit a property or set it to undefined if it's inside a shape,
              * even if it isn't required */}

            <View style={styles.container}>
              <View style={styles.rightContainer}>
                <Text style={styles.name}>{contest.name}</Text>
                <Text style={styles.dateInfo}>
                  {moment(contest.start_date).tz(contest.time_zone).format('LL')}
                  –
                  {moment(contest.end_date).tz(contest.time_zone).format('LL')}
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
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
    paddingTop: 10,
    paddingLeft: 20,
    paddingBottom: 10,
  },
  rightContainer: {
    flex: 1,
  },
  name: {
    fontSize: 20,
    marginBottom: 5,
    textAlign: 'left',
    color: colors.gray,
  },
  dateInfo: {
    textAlign: 'left',
    color: colors.gray,
  },
})

export default ContestCell
