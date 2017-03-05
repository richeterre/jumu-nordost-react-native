// @flow

import React, { Component } from 'react'
import SegmentedView from 'react-native-segmented-view'

import colors from '../constants/colors'

type Props = {|
  onChange: () => any,
  selectedIndex: number,
  values: Array<string>,
|}

class SegmentedControl extends Component {
  props: Props

  render() {
    const { onChange, selectedIndex, values } = this.props

    const selectedTitleStyle = {
      color: colors.primary,
      fontWeight: 'bold',
    }

    return (
      <SegmentedView
        titles={values}
        index={selectedIndex}
        stretch
        onPress={onChange}
        selectedTitleStyle={selectedTitleStyle}
      />
    )
  }
}

export default SegmentedControl
