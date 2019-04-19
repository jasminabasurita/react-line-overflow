//threeToSix :: String -> String
export const threeToSix = hex =>
  hex.length === 3
    ? hex.split('').map(x => x + x).join('')
    : hex

//cutHex :: String -> String
export const cutHex = hex =>
  hex[0] === '#'
    ? hex.slice(1)
    : hex

export const parseHex = hex =>
  threeToSix(cutHex(hex))

//createHexToRGB :: (Number, Number) -> String -> Number
export const createHexToRGB = (i, j) => hex =>
  parseInt(parseHex(hex).substring(i, j), 16)

export const hexToR = createHexToRGB(0, 2)
export const hexToG = createHexToRGB(2, 4)
export const hexToB = createHexToRGB(4, 6)

//hexToRGB :: String -> String
export const hexToRGB = hex =>
  [ hexToR(hex), hexToG(hex), hexToB(hex) ].join(', ')

//styleProp :: String -> Object -> Number
export const styleProp = prop => styles =>
  parseInt(styles[prop])

//getHeight :: Object -> Number
export const getHeight = styleProp('height')

//getLineHeight :: Object -> Number
export const getLineHeight = styleProp('line-height')

//omit :: ([ String ], Object) -> Object
export const omit = (keys, obj) =>
  Object.keys(obj).reduce((acc, key) =>
    keys.indexOf(key) === -1 && obj[key] !== undefined 
      ? Object.assign(acc, { [key]: obj[key] })
      : acc
  , {})
