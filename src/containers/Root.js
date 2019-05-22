import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { BrowserRouter as Router, Route } from 'react-router-dom'
import { renderToStaticMarkup } from 'react-dom/server'

import { connect } from 'react-redux'
import { commonActions } from '../actions'
import DevTools from './DevTools'

import { LocalizeProvider, withLocalize } from 'react-localize-redux'
import enTranslations from '../translations/en.json'

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'

import Header from '../components/Shared/Header'
import Message from '../components/Shared/Message'
import UploadPage from './Upload/UploadPage'
import Promote from './Promote/Promote'
import Login from './Login'

class Root extends Component {
  constructor(props) {
    super(props)

    // basic init of localization component
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

  // making sure BE and FE versions match - shows info message if not
  componentDidMount() {
    this.props.checkVersion(this.props.version)
    // this.props.setupSession()
  }

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Router basename="sample-receiving">
          <div className="app">
            <Header />
            {this.props.message ? (
              <Message type="Success" msg={this.props.message} />
            ) : null}
            {this.props.error ? (
              <div>
                <Message msg={this.props.message} />
                {process.env.NODE_ENV !== 'production' ? <DevTools /> : <div />}
              </div>
            ) : !this.props.sessionValid ? (
              <div>
                {process.env.NODE_ENV !== 'production' ? <DevTools /> : <div />}
                <Login />
              </div>
            ) : (
              <div>
                <Route path="/(upload|)" component={UploadPage} />
                <Route path="/promote" component={Promote} />
                {process.env.NODE_ENV !== 'production' ? <DevTools /> : <div />}
              </div>
            )}
          </div>
        </Router>
      </MuiThemeProvider>
    )
  }
}

const mapStateToProps = state => ({
  formIsLoading: state.common.formIsLoading,
  version: state.common.version,
  versionValid: state.common.versionValid,
  sessionValid: state.common.sessionValid,
  error: state.common.error,
  message: state.common.message,
})
const mapDispatchToProps = {
  ...commonActions,
}

export default withLocalize(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Root)
)

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    primary: {
      logo: '#319ae8',
      light: '#8FC7E8',
      main: '#007CBA',
      dark: '#006098',
    },
    secondary: {
      light: '#F6C65B',
      main: '#DF4602',
      dark: '#C24D00',
    },

    textSecondary: '#e0e0e0',
  },
})
