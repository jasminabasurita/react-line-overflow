import React from 'react'
import { expect } from 'chai'
import { createSandbox } from 'sinon'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-15'
import LineClamp from '../src'

configure({ adapter: new Adapter() })

global.window = {}

describe('LineClamp Component', () => {
  const sandbox = createSandbox()
  const mockGetComputedStyle = sandbox.stub()

  beforeEach(() => {
    window.getComputedStyle = mockGetComputedStyle
  })

  afterEach(() => {
    sandbox.resetHistory()
  })

  after(() => {
    sandbox.restore()
  })

  it('does not clamp when context height is not overflowing the maximum number of allowed lines', () => {
    mockGetComputedStyle.returns({ 'line-height': '3px', height: '6px' })
    const comp = shallow(
      <LineClamp
        lines={ 3 }
      />
    )
    const instance = comp.instance()
    instance.contextRef = 'mock-context'
    instance.componentDidMount()
    comp.update()
    expect(mockGetComputedStyle.called).to.equal(true)
    expect(mockGetComputedStyle.calledWith('mock-context')).to.equal(true)
    expect(comp.state().containerHeight).to.equal(9)
    expect(comp.state().lineHeight).to.equal(3)
    expect(comp.state().clamp).to.equal(false)
    expect(comp.children().first().children().length).to.equal(0)
  })

  it('clamps when context height is overflowing the maximum number of allowed lines', () => {
    mockGetComputedStyle.returns({ 'line-height': '3px', height: '10px' })
    const comp = shallow(
      <LineClamp
        lines={ 3 }
      />
    )
    const instance = comp.instance()
    instance.contextRef = 'mock-context'
    instance.componentDidMount()
    comp.update()
    expect(mockGetComputedStyle.called).to.equal(true)
    expect(mockGetComputedStyle.calledWith('mock-context')).to.equal(true)
    expect(comp.state().containerHeight).to.equal(9)
    expect(comp.state().lineHeight).to.equal(3)
    expect(comp.state().clamp).to.equal(true)
    expect(comp.children().first().children().length).to.equal(1)
    expect(comp.children().first().children().first().children().first().text()).to.equal('...')
    expect(comp.children().first().children().first().props().style.background)
      .to.equal('linear-gradient(to right, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1) 50%)')
  })

  it('accepts an optional ellipsis value', () => {
    mockGetComputedStyle.returns({ 'line-height': '3px', height: '10px' })
    const comp = shallow(
      <LineClamp
        lines={ 3 }
        ellipsis="~~~"
      />
    )
    const instance = comp.instance()
    instance.contextRef = 'mock-context'
    instance.componentDidMount()
    comp.update()
    expect(mockGetComputedStyle.called).to.equal(true)
    expect(mockGetComputedStyle.calledWith('mock-context')).to.equal(true)
    expect(comp.state().containerHeight).to.equal(9)
    expect(comp.state().lineHeight).to.equal(3)
    expect(comp.state().clamp).to.equal(true)
    expect(comp.children().first().children().length).to.equal(1)
    expect(comp.children().first().children().first().children().first().text()).to.equal('~~~')
  })

  it('accepts an optional background value', () => {
    mockGetComputedStyle.returns({ 'line-height': '3px', height: '10px' })
    const comp = shallow(
      <LineClamp
        lines={ 3 }
        background='#000'
      />
    )
    const instance = comp.instance()
    instance.contextRef = 'mock-context'
    instance.componentDidMount()
    comp.update()
    expect(mockGetComputedStyle.called).to.equal(true)
    expect(mockGetComputedStyle.calledWith('mock-context')).to.equal(true)
    expect(comp.state().containerHeight).to.equal(9)
    expect(comp.state().lineHeight).to.equal(3)
    expect(comp.state().clamp).to.equal(true)
    expect(comp.children().first().children().first().props().style.background)
      .to.equal('linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1) 50%)')
  })
})
