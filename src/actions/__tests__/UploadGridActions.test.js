import React, { Component } from 'react'

import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import multi from 'redux-multi'
import moxios from 'moxios'

import { uploadGridActions } from '../../actions/'

import {
  initialFullStateMock,
  formValuesMock,
  gridMock,
  columnDefsResponseMock,
} from '../../mocks'

const gridTestStore = initialFullStateMock

const middlewares = [thunk, multi]
const mockStore = configureStore(middlewares)

let API_ROOT = 'http://localhost:9004'
if (process.env.NODE_ENV === 'production') {
  API_ROOT = '/apps/auth/'
  // API_ROOT = 'https://rex.mskcc.org/apps/auth/'
}

describe('upload grid actions', () => {
  beforeEach(function() {
    moxios.install()
  })

  afterEach(function() {
    moxios.uninstall()
  })

  it('should execute getColumns and getInitialColumns', () => {
    const store = mockStore(gridTestStore)

    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.respondWith({
        status: 200,
        response: columnDefsResponseMock,
      })
    })
    const expectedActions = [
      {
        type: 'REQUEST_COLUMNS',
      },
      {
        type: 'REQUEST_INITIAL_COLUMNS',
      },
      {
        type: 'RECEIVE_COLUMNS_SUCCESS',
        grid: gridMock,
        form: formValuesMock,
      },
    ]

    return store
      .dispatch(uploadGridActions.getColumns(formValuesMock))
      .then(() => {
        const actions = store.getActions()
        expect(actions).toEqual(expectedActions)
      })
  })

  it('should execute getInitialColumns fail actions)', () => {
    const store = mockStore(gridTestStore)
    const errResp = {
      status: 400,
      response: { message: 'problem' },
    }

    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.reject(errResp)
    })
    const expectedActions = [
      {
        type: 'REQUEST_INITIAL_COLUMNS',
      },
      {
        type: 'RECEIVE_COLUMNS_FAIL',
        material: 'Cells',
        application: 'AmpliSeq',
        error: errResp,
      },
    ]

    return store
      .dispatch(
        uploadGridActions.getInitialColumns({
          material: 'Cells',
          application: 'AmpliSeq',
        })
      )
      .then(() => {
        const actions = store.getActions()
        expect(actions).toEqual(expectedActions)
      })
  })

  // it('creates GET_APPLICATIONS_FOR_MATERIALS_SUCCESS when getApplicationsForMaterial returns choices', () => {
  //   const store = mockStore(gridTestStore)
  //   moxios.wait(() => {
  //     const request = moxios.requests.mostRecent()
  //     request.respondWith({
  //       status: 200,
  //       response: getChoicesForDNALibraryMock,
  //     })
  //   })

  //   const material = 'DNA Library'

  //   const expectedActions = [
  //     {
  //       type: 'SELECT_MATERIAL',
  //       selectedMaterial: material,
  //     },
  //     {
  //       type: 'REQUEST_APPLICATIONS_FOR_MATERIAL',
  //     },
  //     {
  //       type: 'RECEIVE_APPLICATIONS_FOR_MATERIAL_SUCCESS',
  //     },
  //   ]
  //   return store
  //     .dispatch(uploadGridActions.getApplicationsForMaterial(material))
  //     .then(() => {
  //       const actions = store.getActions()
  //       expect(actions).toEqual(expectedActions)
  //     })
  // })

  // it('creates GET_APPLICATIONS_FOR_MATERIAL_FAIL when getApplicationsForMaterial fails', () => {
  //   const store = mockStore(gridTestStore)
  //   moxios.wait(() => {
  //     const request = moxios.requests.mostRecent()
  //     request.respondWith({
  //       status: 404,
  //     })
  //   })

  //   const material = 'DNA Library'

  //   const expectedActions = [
  //     {
  //       type: 'SELECT_MATERIAL',
  //       selectedMaterial: material,
  //     },
  //     {
  //       type: 'REQUEST_APPLICATIONS_FOR_MATERIAL',
  //     },
  //     {
  //       type: 'RECEIVE_APPLICATIONS_FOR_MATERIAL_FAIL',
  //       error: 'Request failed with status code 404',
  //     },
  //   ]
  //   return store
  //     .dispatch(uploadGridActions.getApplicationsForMaterial(material))
  //     .then(() => {
  //       const actions = store.getActions()
  //       expect(actions).toEqual(expectedActions)
  //     })
  // })
  // it('creates GET_MATERIALS_FOR_APPLICATION_FAIL when getMaterialsForApplication fails', () => {
  //   const store = mockStore(gridTestStore)
  //   moxios.wait(() => {
  //     const request = moxios.requests.mostRecent()
  //     request.respondWith({
  //       status: 404,
  //     })
  //   })

  //   const application = 'DNA Library'

  //   const expectedActions = [
  //     {
  //       type: 'SELECT_APPLICATION',
  //       selectedApplication: application,
  //     },
  //     {
  //       type: 'REQUEST_MATERIALS_FOR_APPLICATION',
  //     },
  //     {
  //       type: 'RECEIVE_MATERIALS_FOR_APPLICATION_FAIL',
  //       error: 'Request failed with status code 404',
  //     },
  //   ]
  //   return store
  //     .dispatch(uploadGridActions.getMaterialsForApplication(application))
  //     .then(() => {
  //       const actions = store.getActions()
  //       expect(actions).toEqual(expectedActions)
  //     })
  // })
})
