// @flow
import type { NavigationScreenProp } from 'react-navigation'
import type { State } from '../redux/modules'
import type { Contest, ContestCategory } from '../redux/modules/contests'
import type { Performance } from '../redux/modules/performances'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ListView, StyleSheet } from 'react-native'

import ContestCategoryCell from '../components/ContestCategoryCell'
import colors from '../constants/colors'

type PropsFromParent = {|
  navigation: NavigationScreenProp,
|}

type PropsFromState = {|
  contest: ?Contest,
|}

type Props = PropsFromParent & PropsFromState

type ComponentState = {|
  dataSource: ListView.DataSource,
|}

class ContestCategoryListScreen extends Component {
  props: Props
  state: ComponentState

  constructor(props) {
    super(props)
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    })
    this.state = {
      dataSource: dataSource.cloneWithRows(props.contest.contestCategories),
    }
  }

  selectContestCategory(contestCategory: ContestCategory) {
    // const { navigate } = this.props.navigation
    // navigate('')
  }

  renderRow(contestCategory: ContestCategory) {
    return (
      <ContestCategoryCell
        key={contestCategory.id}
        onSelect={() => this.selectContestCategory(contestCategory)}
        contestCategory={contestCategory}
      />
    )
  }

  render() {
    return (
      <ListView
        style={styles.root}
        dataSource={this.state.dataSource}
        renderRow={this.renderRow.bind(this)}
        enableEmptySections={true}
      />
    )
  }
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: colors.white,
  },
})

function mapStateToProps(state: State): PropsFromState {
  return {
    contest: state.contests.currentContest,
  }
}

export default connect(mapStateToProps)(ContestCategoryListScreen)
