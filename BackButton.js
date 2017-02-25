import React, { Component } from 'react'
import { StyleSheet, Text } from 'react-native'

class BackButton extends Component {
  render() {
    return (
      <Text style={styles.text}>Zurück</Text>
    )
  }
}

const styles = StyleSheet.create({
  text: {
    color: 'white',
    marginLeft: 5,
    fontWeight: 'bold'
  }
})

export default BackButton
