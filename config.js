// @flow

import { Platform } from 'react-native'

import secrets from './secrets' // See README

const localBaseUrl = Platform.OS === 'ios'
  ? 'http://localhost:5000/api/v1/'
  : 'http://10.0.2.2:5000/api/v1/'

export default {
  apiKey: secrets.apiKey,
  baseUrl: localBaseUrl,
  // baseUrl: 'http://www.jumu-nordost.eu/api/v1/' // Production
}
