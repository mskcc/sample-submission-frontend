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

class Root extends Component {
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

  componentDidMount() {
    this.props.checkVersion(this.props.version)
    // this.props.getMaterialsAndApplications()
    // this.props.getPicklist('Species')
  }

  render() {
    return (
      <MuiThemeProvider theme={theme}>
          <Router>
            {this.props.error && !this.props.formIsLoading ? (
              <div className="app">
                <Header />
                <Message msg={this.props.error} />
                {process.env.NODE_ENV !== 'production' ? <DevTools /> : <div />}
              </div>
            ) : (
              <div className="app">
                <Header />

                <Route path="/upload" component={UploadPage} />
                <Route path="/promote" component={Promote} />
                {process.env.NODE_ENV !== 'production' ? <DevTools /> : <div />}
              </div>
            )}
          </Router>
      </MuiThemeProvider>
    )
  }
}

const mapStateToProps = state => ({
  formIsLoading: state.common.formIsLoading,
  version: state.common.version,
  versionValid: state.common.versionValid,
  error: state.common.error,
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
// <Route path="/:login/:name"
//              component={RepoPage} />
//       <Route path="/:login"
//              component={UserPage} />

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

      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      light: '#F6C65B',
      main: '#DF4602',
      dark: '#C24D00',
    },
    // error: will use the default color
  },
})
