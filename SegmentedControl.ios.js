'use strict';

var React = require('react-native');
var {
  Component,
  SegmentedControlIOS
} = React;

class SegmentedControl extends Component {
  render() {
    return (
      <SegmentedControlIOS
        values={this.props.values}
        selectedIndex={this.props.selectedIndex}
        onChange={this.props.onChange}
      />
    )
  }
}

export default SegmentedControl;
