'use strict';

// Grab credentials (add this file if missing, as it's ignored by Git)
const credentials = require('./credentials.json');

export const BASE_URL = 'http://192.168.56.1:5000/api/v1/';
export const API_KEY = credentials['api-key'];
