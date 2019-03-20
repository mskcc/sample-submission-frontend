import React, { Component } from 'react'

import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import multi from 'redux-multi'

import renderer from 'react-test-renderer'
import { mount } from 'enzyme'
import TestUploadFormContainer from '../UploadFormContainer'

import { Provider } from 'react-redux'

import {
  initialFullStateMock
} from '../../../mocks'

// const formTestStore = initialFormStateMock

const middlewares = [thunk, multi]
const mockStore = configureStore(middlewares)


const UploadFormContainer = props => (
  <Provider store={mockStore(initialFullStateMock)}>
    <TestUploadFormContainer />
  </Provider>
)

describe('Render UploadFormContainer', () => {
  it('render UploadFormContainer correctly', () => {
    const UploadFormContainerComponent = renderer
      .create(<UploadFormContainer />)
      .toJSON()
    expect(UploadFormContainerComponent).toMatchSnapshot()
  })
})

describe('responds to input', () => {
  it('has species field', () => {
    const wrapper = mount(<UploadFormContainer />)
    expect(wrapper.find('#material').exists()).toBe(true)
  })


})
