'use strict';

import punycode from 'punycode';

export const getFlag = function(country_code) {
  const base = 127397
  const codePoints = country_code.split('').map(function(letter) {
    return base + letter.charCodeAt(0)
  })
  return punycode.ucs2.encode(codePoints)
}
