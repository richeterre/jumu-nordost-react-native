import React, { Component } from 'react'
import SegmentedView from 'react-native-segmented-view'

import colors from '../constants/colors'

class SegmentedControl extends Component {
  render() {
    const selectedTitleStyle = {
      color: colors.primary,
      fontWeight: 'bold',
    }

    return (
      <SegmentedView
        titles={this.props.values}
        index={this.props.selectedIndex}
        stretch
        onPress={this.props.onChange}
        selectedTitleStyle={selectedTitleStyle}
      />
    )
  }
}

export default SegmentedControl
