import React from 'react'
import ReactDOM from 'react-dom'
import DropdownField from './components/Header/DropdownField'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<DropdownField />, div)
  ReactDOM.unmountComponentAtNode(div)
})
