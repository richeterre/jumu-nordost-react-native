// @flow

import React from 'react'
import { Image, StyleSheet, TouchableOpacity } from 'react-native'

import colors from '../constants/colors'

type Props = {
  icon: number,
  onPress: () => any,
  style?: any,
}

export default function IconButton(props: Props) {
  const { icon, onPress, style } = props

  return (
    <TouchableOpacity style={style} onPress={onPress}>
      <Image style={styles.icon} source={icon} />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  icon: {
    tintColor: colors.white,
  },
})
