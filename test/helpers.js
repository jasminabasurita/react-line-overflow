import { expect } from 'chai'
import {
  threeToSix,
  cutHex,
  parseHex,
  createHexToRGB,
  hexToR,
  hexToG,
  hexToB,
  hexToRGB,
  styleProp,
  getHeight,
  getLineHeight,
  omit,
} from '../src/helpers'

describe('helpers', () => {
  describe('hex parsing functions', () => {
    describe('threeToSix', () => {
      it('converts 3 char hex to 6 char hex', () => {
        expect(threeToSix('1F8')).to.equal('11FF88')
        expect(threeToSix('F4A')).to.equal('FF44AA')
        expect(threeToSix('2B7')).to.equal('22BB77')
      })

      it('returns input if not 3 chars', () => {
        expect(threeToSix('11FF88')).to.equal('11FF88')
        expect(threeToSix('FF44AA')).to.equal('FF44AA')
        expect(threeToSix('22BB77')).to.equal('22BB77')
      })
    })

    describe('cutHex', () => {
      it('removes first character if first character is #', () => {
        expect(cutHex('#123')).to.equal('123')
        expect(cutHex('#11FF88')).to.equal('11FF88')
        expect(cutHex('#2b7')).to.equal('2b7')
      })

      it('returns input if first char is not #', () => {
        expect(cutHex('123')).to.equal('123')
        expect(cutHex('11FF88')).to.equal('11FF88')
        expect(cutHex('2b7')).to.equal('2b7')
      })
    })

    describe('parseHex', () => {
      it('parses 3 digit hex with #', () => {
        expect(parseHex('#123')).to.equal('112233')
        expect(parseHex('#F15')).to.equal('FF1155')
        expect(parseHex('#A2B')).to.equal('AA22BB')
      })

      it('parses 3 digit hex without #', () => {
        expect(parseHex('123')).to.equal('112233')
        expect(parseHex('F15')).to.equal('FF1155')
        expect(parseHex('A2B')).to.equal('AA22BB')
      })

      it('parses 3 digit hex with #', () => {
        expect(parseHex('#112233')).to.equal('112233')
        expect(parseHex('#FF1155')).to.equal('FF1155')
        expect(parseHex('#AA22BB')).to.equal('AA22BB')
      })

      it('parses 3 digit hex without #', () => {
        expect(parseHex('112233')).to.equal('112233')
        expect(parseHex('FF1155')).to.equal('FF1155')
        expect(parseHex('AA22BB')).to.equal('AA22BB')
      })
    })

    describe('createHexToRGB', () => {
      it('returns a function', () => {
        expect(typeof createHexToRGB(1, 2)).to.equal('function')
      })
    })

    describe('hexToR', () => {
      it('returns red value of hex in base 10', () => {
        expect(hexToR('#F12')).to.equal(255)
        expect(hexToR('#78F')).to.equal(119)
        expect(hexToR('#0FA')).to.equal(0)
        expect(hexToR('F12')).to.equal(255)
        expect(hexToR('78F')).to.equal(119)
        expect(hexToR('0FA')).to.equal(0)
        expect(hexToR('#FF1122')).to.equal(255)
        expect(hexToR('#7788FF')).to.equal(119)
        expect(hexToR('#00FFAA')).to.equal(0)
        expect(hexToR('FF1122')).to.equal(255)
        expect(hexToR('7788FF')).to.equal(119)
        expect(hexToR('00FFAA')).to.equal(0)
      })
    })

    describe('hexToG', () => {
      it('returns green value of hex in base 10', () => {
        expect(hexToG('#F12')).to.equal(17)
        expect(hexToG('#78F')).to.equal(136)
        expect(hexToG('#0FA')).to.equal(255)
        expect(hexToG('F12')).to.equal(17)
        expect(hexToG('78F')).to.equal(136)
        expect(hexToG('0FA')).to.equal(255)
        expect(hexToG('#FF1122')).to.equal(17)
        expect(hexToG('#7788FF')).to.equal(136)
        expect(hexToG('#00FFAA')).to.equal(255)
        expect(hexToG('FF1122')).to.equal(17)
        expect(hexToG('7788FF')).to.equal(136)
        expect(hexToG('00FFAA')).to.equal(255)
      })
    })

    describe('hexToB', () => {
      it('returns blue value of hex in base 10', () => {
        expect(hexToB('#F12')).to.equal(34)
        expect(hexToB('#78F')).to.equal(255)
        expect(hexToB('#0FA')).to.equal(170)
        expect(hexToB('F12')).to.equal(34)
        expect(hexToB('78F')).to.equal(255)
        expect(hexToB('0FA')).to.equal(170)
        expect(hexToB('#FF1122')).to.equal(34)
        expect(hexToB('#7788FF')).to.equal(255)
        expect(hexToB('#00FFAA')).to.equal(170)
        expect(hexToB('FF1122')).to.equal(34)
        expect(hexToB('7788FF')).to.equal(255)
        expect(hexToB('00FFAA')).to.equal(170)
      })
    })

    describe('hexToRGB', () => {
      it('returns a string with rgb values in base 10 seperated by commas', () => {
        expect(hexToRGB('#F12')).to.equal('255, 17, 34')
        expect(hexToRGB('#78F')).to.equal('119, 136, 255')
        expect(hexToRGB('#0FA')).to.equal('0, 255, 170')
        expect(hexToRGB('F12')).to.equal('255, 17, 34')
        expect(hexToRGB('78F')).to.equal('119, 136, 255')
        expect(hexToRGB('0FA')).to.equal('0, 255, 170')
        expect(hexToRGB('#FF1122')).to.equal('255, 17, 34')
        expect(hexToRGB('#7788FF')).to.equal('119, 136, 255')
        expect(hexToRGB('#00FFAA')).to.equal('0, 255, 170')
        expect(hexToRGB('FF1122')).to.equal('255, 17, 34')
        expect(hexToRGB('7788FF')).to.equal('119, 136, 255')
        expect(hexToRGB('00FFAA')).to.equal('0, 255, 170')
      })
    })
  })

  describe('computed pixels helpers', () => {
    describe('styleProp', () => {
      it('returns a function', () => {
        expect(typeof styleProp('height')).to.equal('function')
      })
      it('returns a function that takes in an object and returns the parsed integer from the initially given prop', () => {
        expect(styleProp('foo')({ foo: '15px', bar: '30px' })).to.equal(15)
      })
    })
    describe('getHeight', () => {
      it('returns the parsed integer from the height property of the given object', () => {
        expect(getHeight({ height: '15px', 'line-height': '9px' })).to.equal(15)
      })
    })
    describe('getLineHeight', () => {
      it('returns the parsed integer from the line-height property of the given object', () => {
        expect(getLineHeight({ height: '15px', 'line-height': '9px' })).to.equal(9)
      })
    })
  })

  describe('omit', () => {
    it('returns the given object without the specified keys', () => {
      expect(omit([ 'height', 'width' ], { height: 10, width: 30, lineHeight: 80, foo: 'bar' }))
        .to.deep.equal({ lineHeight: 80, foo: 'bar' })
    })
  })
})
