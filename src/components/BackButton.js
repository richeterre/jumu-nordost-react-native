import React, { Component } from 'react'
import { StyleSheet, Text } from 'react-native'

import colors from '../constants/colors'

class BackButton extends Component {
  render() {
    return (
      <Text style={styles.text}>Zurück</Text>
    )
  }
}

const styles = StyleSheet.create({
  text: {
    color: colors.white,
    marginLeft: 5,
    fontWeight: 'bold',
  },
})

export default BackButton
