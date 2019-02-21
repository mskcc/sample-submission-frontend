import React, { Component } from 'react'

import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import DevTools from './DevTools'
import { Route } from 'react-router-dom'
import { renderToStaticMarkup } from 'react-dom/server'
import { LocalizeProvider, withLocalize } from 'react-localize-redux'
import enTranslations from '../translations/en.json'

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'

import Header from '../components/Shared/Header'
import Upload from './Upload/Upload'
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

  render() {
    const { store } = this.props
    return (
      <MuiThemeProvider theme={theme}>
        <Provider store={store}>
          <div className="app">
            <Header />
            <Route path="/upload" component={Upload} />
            <Route path="/promote" component={Promote} />
            {process.env.NODE_ENV !== 'production' ? <DevTools /> : <div />}
          </div>
        </Provider>
      </MuiThemeProvider>
    )
  }
}

Root.propTypes = {
  store: PropTypes.object.isRequired,
}

export default withLocalize(Root)
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
