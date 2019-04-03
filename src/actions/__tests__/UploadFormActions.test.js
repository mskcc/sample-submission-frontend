import React, { Component } from 'react'

import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import multi from 'redux-multi'
import moxios from 'moxios'

import { uploadFormActions } from '../../actions/'

import { getChoicesForDNALibraryMock, initialFormStateMock } from '../../mocks'

const formTestStore = initialFormStateMock

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
    const store = mockStore(formTestStore)

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

  it('creates actions for Species selection with formatter', () => {
    const store = mockStore(formTestStore)
    const species = 'human'
    const data = { listname: {} }

    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.respondWith({
        status: 200,
        response: data,
      })
    })

    const expectedActions = [
      {
        type: 'SELECT_SPECIES_WITH_ID_FORMATTER',
      },
      {
        type: 'REQUEST_PICKLIST',
        picklist: 'PatientIDTypes',
      },

      {
        type: 'RECEIVE_PICKLIST_SUCCESS',
        picklist: data,
      },
    ]
    return store
      .dispatch(uploadFormActions.getFormatterForSpecies(species))
      .then(() => {
        const actions = store.getActions()
        expect(actions).toEqual(expectedActions)
      })
  })

  it('creates RECEIVE_PICKLIST_FAIL action for Species selection with formatter', () => {
    const store = mockStore(formTestStore)
    const species = 'Human'

    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.respondWith({
        status: 400,
        
      })
    })
    const expectedActions = [
      {
        type: 'SELECT_SPECIES_WITH_ID_FORMATTER',
      },
      {
        type: 'REQUEST_PICKLIST',
        picklist: 'PatientIDTypes',
      },

      {
        type: 'RECEIVE_PICKLIST_FAIL',
        error: 'Request failed with status code 400',
      },
    ]
    return store
      .dispatch(uploadFormActions.getFormatterForSpecies(species))
      .then(() => {
        const actions = store.getActions()
        expect(actions).toEqual(expectedActions)
      })
  })

  it('creates actions for Species selection without formatter', () => {
    const store = mockStore(formTestStore)
    const species = 'RNA'

    const expectedActions = [
      {
        type: 'SELECT_SPECIES_WITHOUT_ID_FORMATTER',
      },
    ]
    store.dispatch(uploadFormActions.getFormatterForSpecies(species))

    const actions = store.getActions()
    expect(actions).toEqual(expectedActions)
  })

  it('creates GET_APPLICATIONS_FOR_MATERIALS_SUCCESS when getApplicationsForMaterial returns choices', () => {
    const store = mockStore(formTestStore)
    const data = [
      { id: 'HemePACT_v4', value: 'HemePACT_v4' },
      { id: 'M-IMPACT_v1', value: 'M-IMPACT_v1' },
    ]
    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.respondWith({
        status: 200,
        response: {
          choices: data,
        },
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
        applications: data,
      },
    ]
    return store
      .dispatch(uploadFormActions.getApplicationsForMaterial(material))
      .then(() => {
        const actions = store.getActions()
        expect(actions).toEqual(expectedActions)
      })
  })

  it('creates GET_APPLICATIONS_FOR_MATERIAL_FAIL when getApplicationsForMaterial fails', async () => {
    const store = mockStore(formTestStore)
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
    const store = mockStore(formTestStore)
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
})
