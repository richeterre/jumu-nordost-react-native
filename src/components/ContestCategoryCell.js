// @flow
import type { ContestCategory } from '../redux/modules/contests'

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
          </View>
        </TouchableElement>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    paddingBottom: 16,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 16,
  },
  name: {
    color: colors.gray,
    fontFamily: fonts.regular.normal,
    fontSize: 16,
  },
})

export default ContestCell
