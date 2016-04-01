'use strict';

var React = require('react-native');
var {
  Component,
  SegmentedControlIOS,
  StyleSheet
} = React;

import { PRIMARY_COLOR } from './Constants';

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
    marginTop: 5,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 5
  }
});

export default SegmentedControl;
