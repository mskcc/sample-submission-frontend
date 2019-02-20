import React, { Component } from 'react'
import renderer from 'react-test-renderer'
import { mount } from 'enzyme'
import TestInput from '../Input'

const Input = props => <TestInput {...props} />

describe('Render Input', () => {
  it('render Input correctly', () => {
    const InputComponent = renderer.create(<Input />).toJSON()
    expect(InputComponent).toMatchSnapshot()
  })
})
