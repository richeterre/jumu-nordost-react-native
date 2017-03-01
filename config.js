import secrets from './secrets' // See README

export default {
  apiKey: secrets.apiKey,
  baseUrl: 'http://10.0.2.2:5000/api/v1/', // AVD,
  // baseUrl: 'http://192.168.56.1:5000/api/v1/' // Genymotion,
  // baseUrl: 'http://www.jumu-nordost.eu/api/v1/' // Production
}
