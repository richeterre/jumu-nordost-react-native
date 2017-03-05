// @flow
import type { Event } from 'react-native'

import React, { Component } from 'react'
import {
  SegmentedControlIOS,
  StyleSheet,
} from 'react-native'

import colors from '../constants/colors'

type Props = {|
  onChange: (event: Event) => any,
  selectedIndex: number,
  values: Array<string>,
|}

class SegmentedControl extends Component {
  props: Props

  render() {
    const { onChange, selectedIndex, values } = this.props

    return (
      <SegmentedControlIOS
        style={styles.segmentedControl}
        values={values}
        selectedIndex={selectedIndex}
        onChange={event => {
          const index = event.nativeEvent.selectedSegmentIndex
          onChange(index)
        }}
        tintColor={colors.primary}
      />
    )
  }
}

const styles = StyleSheet.create({
  segmentedControl: {
    marginTop: 4,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 4,
  },
})

export default SegmentedControl
