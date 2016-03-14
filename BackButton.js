'use strict';

var React = require('react-native');
var {
  Component,
  StyleSheet,
  Text
} = React;

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

export default BackButton;
