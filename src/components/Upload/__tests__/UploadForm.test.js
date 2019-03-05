import React, { Component } from 'react'
import renderer from 'react-test-renderer'
import { mount } from 'enzyme'
import TestUploadForm from '../UploadForm'

import { initialFormStateMock } from '../../../mocks'

const UploadForm = props => <TestUploadForm form={initialFormStateMock} />

describe('Render UploadForm', () => {
  it('render UploadForm correctly', () => {
    const UploadFormComponent = renderer.create(<UploadForm />).toJSON()
    expect(UploadFormComponent).toMatchSnapshot()
  })
})

