import React, { Component } from 'react'

import uploadFormReducer from '../upload/uploadFormReducer'

import { initialFormStateMock } from '../../mocks'

const formTestStore = initialFormStateMock

describe('upload form reducers', () => {
  it('returns the initial state', () => {
    expect(uploadFormReducer(undefined, {})).toEqual(formTestStore)
  })

  it('handles container filtering', () => {
    const action = { type: 'FILTER_CONTAINERS_FOR_BS' }

    expect(uploadFormReducer(formTestStore, action)).toEqual({
      ...formTestStore,
      containers: formTestStore.filteredContainersBS,
    })

    const action2 = { type: 'SHOW_ALL_CONTAINERS' }

    expect(uploadFormReducer(formTestStore, action2)).toEqual({
      ...formTestStore,
      containers: formTestStore.allContainers,
    })
  })

  it('handles materials for selected application', () => {
    const expextedMaterials = [
      { id: 'RNA', value: 'RNA' },
      { id: 'Tissue', value: 'Tissue' },
    ]
    const action = {
      type: 'RECEIVE_MATERIALS_FOR_APPLICATION_SUCCESS',
      materials: expextedMaterials,
    }

    expect(uploadFormReducer(formTestStore, action)).toEqual({
      ...formTestStore,
      materials: expextedMaterials,
      formIsLoading: false,
    })
  })
})
