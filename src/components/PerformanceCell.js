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

class PerformanceCell extends Component {
  render() {
    const performance = this.props.performance
    const timeZone = this.props.timeZone

    const predecessorHostCountry = performance.predecessor_host_country
    const predecessorHostName = performance.predecessor_host_name

    const predecessorInfo = predecessorHostCountry && predecessorHostName
      ? `${emojiFlag(predecessorHostCountry)} ${predecessorHostName}`
      : null

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
              <View style={styles.leftContainer}>
                <Text style={styles.time}>
                  {moment(performance.stage_time).tz(timeZone).format('HH:mm')}
                </Text>
              </View>
              <View style={styles.rightContainer}>
                <Text style={styles.categoryInfo}>
                  {performance.category_name}, AG {performance.age_group}
                </Text>
                <View style={styles.appearances}>
                  {performance.appearances.map((appearance, i) =>
                    <Text key={'appearance' + (i + 1)} style={styles.appearanceText}>
                      {appearance.participant_name}, {appearance.instrument_name}
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
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'left',
  },
  time: {
    color: colors.gray,
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  appearanceText: {
    color: colors.gray,
    fontSize: 15,
  },
  predecessorInfo: {
    color: colors.gray,
    fontSize: 15,
    marginTop: 5,
  },
})

export default PerformanceCell
