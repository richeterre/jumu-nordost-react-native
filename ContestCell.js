'use strict';

var React = require('react-native');
var {
  Platform,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableNativeFeedback,
  View
} = React;

var ContestCell = React.createClass({
  render: function() {
    var TouchableElement = TouchableHighlight;
    if (Platform.OS === 'android') {
      TouchableElement = TouchableNativeFeedback;
    }
    return (
      <View>
        <TouchableElement
          onPress={this.props.onSelect}
        >
          <View style={styles.row}>
            {/* $FlowIssue #7363964 - There's a bug in Flow where you cannot
              * omit a property or set it to undefined if it's inside a shape,
              * even if it isn't required */}

            <View style={styles.container}>
              <View style={styles.rightContainer}>
                <Text style={styles.name}>{this.props.contest.name}</Text>
                <Text style={styles.dateInfo}>{this.props.contest.start_date}</Text>
              </View>
            </View>
          </View>
        </TouchableElement>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  rightContainer: {
    flex: 1
  },
  name: {
    fontSize: 20,
    marginBottom: 8,
    textAlign: 'left'
  },
  dateInfo: {
    marginBottom: 16,
    textAlign: 'left'
  },
});

export default ContestCell;
