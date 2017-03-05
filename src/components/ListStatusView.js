// @flow

import React from 'react'
import { StyleSheet, Text } from 'react-native'

import colors from '../constants/colors'
import fonts from '../constants/fonts'

type Props = {
  style?: any,
  text: string,
}

export default function ListStatusView(props: Props) {
  const { style, text } = props

  return (
    <Text style={[styles.root, style]}>{text}</Text>
  )
}

const styles = StyleSheet.create({
  root: {
    color: colors.lightGray,
    fontFamily: fonts.regular.italic,
    fontSize: 19,
    marginLeft: 16,
    marginRight: 16,
    textAlign: 'center',
  },
})
