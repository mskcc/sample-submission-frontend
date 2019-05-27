import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import { renderToStaticMarkup } from 'react-dom/server'

import { connect } from 'react-redux'
import { commonActions } from '../actions'
import DevTools from './DevTools'

import { LocalizeProvider, withLocalize } from 'react-localize-redux'
import enTranslations from '../translations/en.json'

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'

import Header from '../components/Shared/Header'
import Message from '../components/Shared/Message'
import UploadPage from './Upload/UploadPage'
import Promote from './Promote/Promote'
import Login from './Login'
import Logout from './Logout'
import ErrorPage from './ErrorPage'

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

  componentDidMount() {
    // making sure BE and FE versions match - shows info message if not
    this.props.checkVersion(this.props.version)
    this.props.refreshToken()
  }

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Router basename="sample-receiving">
          <div className="app">
            <Header loggedIn={this.props.loggedIn} />
            {process.env.NODE_ENV !== 'production' ? <DevTools /> : <div />}

            {this.props.error ? (
              <ErrorPage />
            ) : (
              <React.Fragment>
                {this.props.message && <Message msg={this.props.message} />}
                {this.props.loading && (
                  <CircularProgress color="secondary" size={24} />
                )}
                <div>
                  <Route path="/(upload|)" component={UploadPage} />
                  <Route path="/promote" component={Promote} />
                  <Route path="/logout" component={Logout} />
                  <Route path="/login" component={Login} />
                  <Route path="/error" component={ErrorPage} />
                </div>{' '}
              </React.Fragment>
            )}
          </div>
        </Router>
      </MuiThemeProvider>
    )
  }
}

const mapStateToProps = state => ({
  ...state.common,
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
