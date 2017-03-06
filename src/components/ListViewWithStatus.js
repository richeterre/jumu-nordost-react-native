// @flow

import React from 'react'
import { ListView, RefreshControl, StyleSheet, View } from 'react-native'

import ListStatusView from './ListStatusView'
import Separator from './Separator'

type Props = {
  dataSource: ListView.DataSource,
  onRefresh: () => any,
  refreshing: boolean,
  renderRow: (rowData: any, sectionID: string, rowID: string, highlightRow: boolean) => any,
  statusText: ?string,
  style?: any,
}

export default function ListViewWithStatus(props: Props) {
  const {
    dataSource,
    onRefresh,
    refreshing,
    renderRow,
    statusText,
    style,
  } = props

  return (
    <View style={style}>
      <View style={styles.statusContainer}>
        {statusText &&
          <ListStatusView style={styles.statusView} text={statusText} />}
      </View>
      <ListView
        style={styles.listView}
        dataSource={dataSource}
        renderRow={renderRow}
        renderSeparator={renderSeparator}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => onRefresh()}
          />
        }
        enableEmptySections={true}
      />
    </View>
  )
}

function renderSeparator(rowID, sectionID) {
  return (
    <Separator
      style={styles.separator}
      key={`separator-${sectionID}-${rowID}`}
    />
  )
}

const styles = StyleSheet.create({
  statusContainer: {
    bottom: 0,
    left: 0,
    right: 0,
    top: 0,
    position: 'absolute',
  },
  statusView: {
    marginTop: 96,
  },
  separator: {
    marginLeft: 16,
  },
})
