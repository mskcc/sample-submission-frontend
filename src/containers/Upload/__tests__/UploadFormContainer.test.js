import React, { Component } from 'react'

import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import multi from 'redux-multi'
import moxios from 'moxios'

import renderer from 'react-test-renderer'
import { mount } from 'enzyme'
import TestUploadFormContainer from '../UploadFormContainer'

import { Provider } from 'react-redux'
import { uploadFormActions } from '../../../actions/'
import uploadFormReducer from '../../../reducers/upload/uploadFormReducer'

import {
  getChoicesForDNALibraryMock,
  initialFormStateMock,
} from '../../../mocks'

const testStore = initialFormStateMock

const middlewares = [thunk, multi]
const mockStore = configureStore(middlewares)

describe('upload form actions', () => {
  beforeEach(function() {
    moxios.install()
  })

  afterEach(function() {
    moxios.uninstall()
  })
  it('should execute clearMaterial', () => {
    const store = mockStore(testStore)

    const expectedActions = [
      {
        type: 'CLEAR_MATERIAL',
      },
      {
        type: 'CLEARED',
      },
    ]
    store.dispatch(uploadFormActions.clearMaterial())
    const actions = store.getActions()
    expect(actions).toEqual(expectedActions)
  })

  it('creates GET_APPLICATIONS_FOR_MATERIALS_SUCCESS when getApplicationsForMaterial returns choices', () => {
    const store = mockStore(testStore)
    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.respondWith({
        status: 200,
        response: getChoicesForDNALibraryMock,
      })
    })

    const material = 'DNA Library'

    const expectedActions = [
      {
        type: 'SELECT_MATERIAL',
        selectedMaterial: material,
      },
      {
        type: 'REQUEST_APPLICATIONS_FOR_MATERIAL',
      },
      {
        type: 'RECEIVE_APPLICATIONS_FOR_MATERIAL_SUCCESS',
      },
    ]
    return store
      .dispatch(uploadFormActions.getApplicationsForMaterial(material))
      .then(() => {
        const actions = store.getActions()
        expect(actions).toEqual(expectedActions)
      })
  })

  it('creates GET_APPLICATIONS_FOR_MATERIAL_FAIL when getApplicationsForMaterial fails', () => {
    const store = mockStore(testStore)
    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.respondWith({
        status: 404,
      })
    })

    const material = 'DNA Library'

    const expectedActions = [
      {
        type: 'SELECT_MATERIAL',
        selectedMaterial: material,
      },
      {
        type: 'REQUEST_APPLICATIONS_FOR_MATERIAL',
      },
      {
        type: 'RECEIVE_APPLICATIONS_FOR_MATERIAL_FAIL',
        error: 'Request failed with status code 404',
      },
    ]
    return store
      .dispatch(uploadFormActions.getApplicationsForMaterial(material))
      .then(() => {
        const actions = store.getActions()
        expect(actions).toEqual(expectedActions)
      })
  })
  it('creates GET_MATERIALS_FOR_APPLICATION_FAIL when getMaterialsForApplication fails', () => {
    const store = mockStore(testStore)
    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.respondWith({
        status: 404,
      })
    })

    const application = 'DNA Library'

    const expectedActions = [
      {
        type: 'SELECT_APPLICATION',
        selectedApplication: application,
      },
      {
        type: 'REQUEST_MATERIALS_FOR_APPLICATION',
      },
      {
        type: 'RECEIVE_MATERIALS_FOR_APPLICATION_FAIL',
        error: 'Request failed with status code 404',
      },
    ]
    return store
      .dispatch(uploadFormActions.getMaterialsForApplication(application))
      .then(() => {
        const actions = store.getActions()
        expect(actions).toEqual(expectedActions)
      })
  })

  // TODO FORM SUBMIT/VALIDATION FAIL  case ActionTypes.RECEIVE_MATERIALS_FOR_APPLICATION_SUCCESS:
  // return {
  //   ...state,
  //   formIsLoading: false,
  //   materials: [{ id: 'error', value: 'error' }],
  // }
})

describe('upload form reducers', () => {
  it('should return the initial state', () => {
    expect(uploadFormReducer(undefined, {})).toEqual(initialFormStateMock)
  })
})
