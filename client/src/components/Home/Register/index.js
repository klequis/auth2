import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actionCreators from '../../../store/actions'
import * as selectors from '../../../store/selectors'
import { log } from '../../../lib/ke-utils'

class Register extends Component {
  constructor(props) {
    super(props)
    this.state = {
        username: '',
        pwd: '',
        confirmpwd: '',
    }
  }
  handleChange = (e) => {
    console.log('change')
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  handleSubmit = (e) => {
    e.preventDefault()
    this.props.requestRegisterUser({ username: this.state.username, password: this.state.pwd })
  }
  render() {
    return (
      <div>
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor='username'>Username: </label>
          <input
            type='text'
            name='username'
            value={this.state.username}
            onChange={this.handleChange}
          />
          <label htmlFor='password'>Password: </label>
          <input
            type='password'
            name='pwd'
            value={this.state.pwd}
            onChange={this.handleChange}
          />
          <label htmlFor='password'>Confirm password: </label>
          <input
            type='password'
            name='confirmpwd'
            value={this.state.confirmpwd}
            onChange={this.handleChange}
          />
          <button type='submit'>Register</button>
        </form>

      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return {

  }
}
export default connect(mapStateToProps, actionCreators)(Register)
