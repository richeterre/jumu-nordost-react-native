'use strict'

import punycode from 'punycode'

export const getFlag = function(countryCode) {
  const base = 127397
  const codePoints = countryCode.split('').map(function(letter) {
    return base + letter.charCodeAt(0)
  })
  return punycode.ucs2.encode(codePoints)
}
