// @flow

import axios from 'axios'
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/observable/fromPromise'

import config from '../../config'

axios.defaults.baseURL = config.baseUrl
axios.defaults.headers.common['X-Api-Key'] = config.apiKey

class ApiService {
  get$(path: string, urlParams: Object) {
    return Observable
      .fromPromise(axios.get(path, { params: urlParams }))
      .map(response => response.data)
  }
}

export default new ApiService()
