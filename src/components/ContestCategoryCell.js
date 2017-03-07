// @flow
import type { ContestCategory } from '../redux/modules/contests'

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
  contestCategory: ContestCategory,
  onSelect: () => any,
|}

class ContestCell extends Component {
  props: Props

  render() {
    const { contestCategory, onSelect } = this.props

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
              {contestCategory.name}
            </Text>
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
    flexDirection: 'row',
    paddingBottom: 12,
    paddingLeft: 16,
    paddingRight: 12,
    paddingTop: 12,
  },
  name: {
    color: colors.gray,
    flex: 1,
    fontFamily: fonts.regular.normal,
    fontSize: 16,
  },
  arrow: {
    alignSelf: 'center',
    marginLeft: 4,
    tintColor: colors.veryLightGray,
  },
})

export default ContestCell
