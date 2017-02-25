import React, { Component } from 'react'
import {
  SegmentedControlIOS,
  StyleSheet
} from 'react-native'

import { PRIMARY_COLOR } from './Constants'

class SegmentedControl extends Component {
  render() {
    return (
      <SegmentedControlIOS
        style={styles.segmentedControl}
        values={this.props.values}
        selectedIndex={this.props.selectedIndex}
        onChange={event => {
          const index = event.nativeEvent.selectedSegmentIndex
          this.props.onChange(index)
        }}
        tintColor={PRIMARY_COLOR}
      />
    )
  }
}

const styles = StyleSheet.create({
  segmentedControl: {
    marginTop: 4,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 4
  }
});

export default SegmentedControl;
