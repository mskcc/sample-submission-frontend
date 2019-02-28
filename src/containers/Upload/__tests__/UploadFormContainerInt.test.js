import React, { Component } from 'react'

import thunk from 'redux-thunk'
import multi from 'redux-multi'
import moxios from 'moxios'

import renderer from 'react-test-renderer'
import { mount } from 'enzyme'
import TestUploadFormContainer from '../UploadFormContainer'

import { Provider } from 'react-redux'
// import { uploadFormActions } from '../../../actions/'
// import uploadFormReducer from '../../../reducers/upload/uploadFormReducer'
import configureStore from '../../../store/configureStore'

import { initialFormContainerStateMock } from '../../../mocks'

// const testStore = initialFormStateMock

// const middlewares = [thunk, multi]
// const mockStore = configureStore(middlewares)

const store = configureStore
const UploadFormContainer = props => (
  <Provider store={store}>
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

  // it('has species field', () => {
  //   const onChangeMock = jest.fn()
  //   const wrapper = mount(<UploadFormContainer />)
  //   const materialInput = wrapper.find('#material').first()

  //   const event = { target: { value: 'Cells' } }
  //   materialInput.simulate('change', event)
  //   console.log(store.getState())
  //   console.log(materialInput.value)
  //   expect(store.getState().upload.form.selectedMaterial).toEqual('Cells')
  // })
})

// describe('should handle combinations', () =>{
// it('filters containers on material changes', () => {

// })

// })
// })
