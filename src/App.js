import React, { Component } from 'react'
import logo from './logo.svg'
import './App.scss'
import { Header, Table } from './comoponents'

class App extends Component {
  render() {
    return (
      <div className="main">
        <div className="mskcc-header" > REX V2</div>   
        <Header />

        <Table />
      </div>
    )
  }
}

export default App
