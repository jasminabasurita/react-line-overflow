import { compose } from 'ramda'

//threeToSix :: String -> String
const threeToSix = hex =>
  hex.length === 3
    ? hex.split('').map(x => x + x).join('')
    : hex

//cutHex :: String -> String
const cutHex = hex =>
  hex[0] === '#'
    ? hex.slice(1)
    : hex

const parseHex = compose(threeToSix, cutHex)

//createHexToRGB :: (Number, Number) -> String -> Number
const createHexToRGB = (i, j) => hex =>
  parseInt(parseHex(hex).substring(i, j), 16)

const hexToR = createHexToRGB(0, 2)
const hexToG = createHexToRGB(2, 4)
const hexToB = createHexToRGB(4, 6)

//hexToRGB :: String -> String
export const hexToRGB = hex =>
  [ hexToR(hex), hexToG(hex), hexToB(hex) ].join(', ')
