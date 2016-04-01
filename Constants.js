'use strict';

// Grab credentials (add this file if missing, as it's ignored by Git)
const credentials = require('./credentials.json');

export const BASE_URL = 'http://10.0.2.2:5000/api/v1/'; // AVD
// export const BASE_URL = 'http://192.168.56.1:5000/api/v1/'; // Genymotion
// export const BASE_URL = 'http://www.jumu-nordost.eu/api/v1/'; // Production
export const API_KEY = credentials['api-key'];

export const PRIMARY_COLOR = '#D61921';
