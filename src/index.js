import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import Main from './Main'
import * as serviceWorker from './serviceWorker'

import { LocalizeProvider } from 'react-localize-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
  palette: {
    primary: {
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

const App = props => (
  <LocalizeProvider>
    <MuiThemeProvider theme={theme}>
      <Router>
        <Route path="/" component={Main} />
      </Router>
    </MuiThemeProvider>
  </LocalizeProvider>
)

ReactDOM.render(<App />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
