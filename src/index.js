import React, { Component } from 'react'
import {
  getHeight,
  getLineHeight,
  hexToRGB,
  omit,
} from './helpers'

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
        background = '#fff',
        children,
        ellipsis = '...',
        ...rest
      },
      state: {
        clamp,
        containerHeight,
        lineHeight,
      },
    } = this
    const rgb = hexToRGB(background)
    return (
      <div
        style={{
          maxHeight: `${containerHeight}px`,
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <div ref={ this.setContextRef } { ...omit(compProps, rest) }>
          { children }
          { clamp &&
            <div
              style={{
                background: `linear-gradient(to right, rgba(${rgb}, 0), rgba(${rgb}, 1) 50%)`,
                display: 'flex',
                justifyContent: 'flex-end',
                position: 'absolute',
                bottom: '0',
                right: '0',
                width: '2em',
                height: `${ lineHeight }px`,
              }}
            >
              { ellipsis }
            </div>
          }
        </div>
      </div>
    )
  }
}

LineClamp.displayName = 'LineClamp'

export default LineClamp

