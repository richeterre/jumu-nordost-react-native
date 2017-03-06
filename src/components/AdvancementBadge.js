// @flow

import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import colors from '../constants/colors'
import fonts from '../constants/fonts'

type Props = {|
  style?: any,
|}

export default function AdvancementBadge({ style }: Props) {
  return (
    <View style={[styles.root, style]}>
      <Text style={styles.text}>WL</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: colors.success,
    borderRadius: 6,
    paddingBottom: 1,
    width: 30,
  },
  text: {
    backgroundColor: colors.transparent,
    color: colors.white,
    fontFamily: fonts.bold.normal,
    fontSize: 14,
    textAlign: 'center',
  },
})
