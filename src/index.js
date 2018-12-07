import React, { Component } from 'react'
import cn from './index.scss'
import { compose, curryN, omit, prop, replace } from 'ramda'

const getNumberPixels = compose(Number, replace(/[a-zA-Z]+/, ''))
const styleProp = curryN(2, compose(getNumberPixels, prop))
const getHeight = styleProp('height')
const getLineHeight = styleProp('line-height')
const compProps = [
  'lines',
  'ellipsis',
]

class LineClamp extends Component {
  constructor(...params) {
    super(...params)
    this.contextRef = null
    this.setContextRef = el => this.contextRef = el
    this.state = {
      clamp: false,
      containerHeight: 0,
      lineHeight: 0,
    }
  }

  componentDidMount() {
    if(this.contextRef) {
      const contextStyles = window.getComputedStyle(this.contextRef)

      const lineHeight = getLineHeight(contextStyles)
      const containerHeight = lineHeight * this.props.lines
      const clamp = getHeight(contextStyles) > containerHeight

      this.setState({ clamp, containerHeight, lineHeight })
    }
  }

  render() {
    const {
      props: {
        children,
        ellipsis = "...",
        ...rest,
      },
      state: {
        clamp,
        containerHeight,
        lineHeight,
      },
    } = this
    return (
      <div
        className={ cn.clamp }
        style={{ height: `${containerHeight}px` }}
      >
        <div ref={ this.setContextRef } { ...omit(compProps, rest) }>
          { children }
          { clamp &&
            <div
              style={{ height: `${lineHeight}px` }}
              className={ cn.ellipsis }>
              { ellipsis }
            </div>
          }
        </div>
      </div>
    )
  }
}

export default LineClamp

