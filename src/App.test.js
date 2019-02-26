import React from 'react'
import ReactDOM from 'react-dom'
import Dropdown from './components/Upload/Dropdown'
const onChange = jest.fn()
it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<Dropdown onChange={onChange} />, div)
  ReactDOM.unmountComponentAtNode(div)
})
