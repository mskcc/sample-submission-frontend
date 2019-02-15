import React, { Component } from 'react'
import renderer from 'react-test-renderer'
import { mount } from 'enzyme'
import TestDropdown from '../Dropdown'

const Dropdown = props => <TestDropdown {...props} />

describe('Render Dropdown', () => {
  it('render Dropdown correctly', () => {
    const DropdownComponent = renderer.create(<Dropdown />).toJSON()
    expect(DropdownComponent).toMatchSnapshot()
  })

  it('render Dropdown correctly with loading animation', () => {
    const wrapper = mount(<Dropdown dynamic loading={true} />)
    const progress = wrapper.find('LinearProgress').first()
    expect(progress.exists()).toBe(true)
  })
})
 