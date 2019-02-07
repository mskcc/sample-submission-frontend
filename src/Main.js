import React, { Component } from 'react'

import { renderToStaticMarkup } from 'react-dom/server'
import { withLocalize } from 'react-localize-redux'
import enTranslations from './translations/en.json'

import { Header, Table } from './comoponents'

import './Main.scss'

class Main extends Component {
  constructor(props) {
    super(props)

    this.props.initialize({
      languages: [{ name: 'English', code: 'en' }],
      translation: enTranslations,
      options: {
        renderToStaticMarkup,
        renderInnerHtml: false,
        defaultLanguage: 'en',
      },
    })
  }
  render() {
    return (
      <div className="main">
        <div className="mskcc-header"> REX V2</div>
        <Header />

        <Table />
      </div>
    )
  }
}

export default withLocalize(Main)
