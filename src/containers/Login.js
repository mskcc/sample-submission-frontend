import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { parse } from 'query-string'
import TextField from '@material-ui/core/TextField'
import { withStyles } from '@material-ui/core/styles'
import { withLocalize } from 'react-localize-redux'

import { commonActions } from '../actions'
import Message from '../components/Shared/Message'

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.username = React.createRef()
    this.pw = React.createRef()
  }

  handleSubmit = event => {
    event.preventDefault()
    console.log(event.target.value)
    console.log(this.pw.current.value)
    console.log(this.username.current.value)
    // this.props.login(formValues)
  }

  render() {
    const isDev = process.env.NODE_ENV !== 'production'
    const { error, submitting, pristine } = this.props
    return (
      <React.Fragment>
        <h1>Log in!</h1>
        {error && <Message msg={this.props.errorMessage} />}
        {isDev && <p>Hint: a@a.com / password</p>}
        <form onSubmit={this.handleSubmit}>
          <TextField
            id="standard-name"
            label="MSK Username"
            // class
            ref={this.username}
            margin="normal"
          />
          <TextField
            id="password-input"
            label="MSK Password"
            // className={classes.textField}
            ref={this.pw}
            type="password"
            autoComplete="current-password"
            margin="normal"
          />

          <div className="row">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={pristine || submitting}
            >
              {submitting ? 'Logging in...' : 'Submit'}
            </button>
          </div>
        </form>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  error: state.common.error,
  errorMessage: state.common.errorMessage,
})
const mapDispatchToProps = {
  ...commonActions,
}

export default withLocalize(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Login)
)

// const withForm = reduxForm({ form: FORM_NAME })

// const withConnect = connect((state, props) => ({
//   initialValues: {
//     redirect: parse(props.location.search).next || '/',
//   },
// }))

// const withSagas = injectSagas(require('security/sagas/login'))

// export default compose(
//   withConnect,
//   withForm,
//   withSagas
// )(Login)
