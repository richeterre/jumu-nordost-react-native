// @flow

import React from 'react'
import { StyleSheet, View } from 'react-native'

import colors from '../constants/colors'

type Props = {
  style?: any,
}

export default function Separator(props: Props) {
  const { style } = props

  return (
    <View style={[styles.root, style]} />
  )
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: colors.separator,
    height: 1,
  },
})
