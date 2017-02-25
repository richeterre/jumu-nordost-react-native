import React, { Component } from 'react'
import SegmentedView from 'react-native-segmented-view';

class SegmentedControl extends Component {
  render() {
    return (
      <SegmentedView
        titles={this.props.values}
        index={this.props.selectedIndex}
        stretch
        onPress={this.props.onChange}
        selectedTitleStyle={{fontWeight:'bold', color: '#D61921'}}
      />
    )
  }
}

export default SegmentedControl;
