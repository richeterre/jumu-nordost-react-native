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

import moment from 'moment-timezone';

var PerformanceCell = React.createClass({
  render: function() {
    const performance = this.props.performance
    const timeZone = this.props.timeZone

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
              <View style={styles.leftContainer}>
                <Text style={styles.time}>
                  {moment(performance.stage_time).tz(timeZone).format('HH:mm')}
                </Text>
              </View>
              <View style={styles.rightContainer}>
                <Text style={styles.categoryInfo}>
                  {performance.category_name}, AG {performance.age_group}
                </Text>
                <View style={styles.appearance}>
                  {performance.appearances.map((appearance, i) =>
                    <Text key={'appearance' + (i + 1)}>
                      {appearance.participant_name}, {appearance.instrument_name}
                    </Text>
                  )}
                </View>
                <Text style={styles.predecessorInfo}>
                  {performance.predecessor_host_name}
                </Text>
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
    paddingTop: 5,
    paddingBottom: 5,
    alignItems: 'flex-start',
    backgroundColor: '#F5FCFF',
  },
  leftContainer: {
    flex: 1
  },
  rightContainer: {
    flex: 4
  },
  categoryInfo: {
    fontSize: 16,
    marginBottom: 8,
    textAlign: 'left'
  },
  time: {
    marginBottom: 16,
    textAlign: 'left'
  },
  appearance: {},
  predecessorInfo: {}
});

export default PerformanceCell;
