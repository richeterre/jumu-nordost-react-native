// @flow

import React, { Component } from 'react'
import SegmentedView from 'react-native-segmented-view'

import colors from '../constants/colors'
import fonts from '../constants/fonts'

type Props = {|
  onChange: () => any,
  selectedIndex: number,
  values: Array<string>,
|}

class SegmentedControl extends Component {
  props: Props

  render() {
    const { onChange, selectedIndex, values } = this.props

    const titleStyle = {
      color: colors.veryLightGray,
      fontFamily: fonts.regular.normal,
      fontSize: 14,
    }

    const selectedTitleStyle = {
      color: colors.primary,
      fontFamily: fonts.bold.normal,
    }

    return (
      <SegmentedView
        titles={values}
        index={selectedIndex}
        stretch
        onPress={onChange}
        titleStyle={titleStyle}
        selectedTitleStyle={selectedTitleStyle}
      />
    )
  }
}

export default SegmentedControl
