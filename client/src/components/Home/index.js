import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import './home.css';
import Signin from './Signin'
import Protected from './Protected'
import Register from './Register'

class Home extends Component {
  render() {
    return (
      <Router>
        <div className="home">
          <header className="home-header">
            <h1 className="home-title">React / Express User Registration &amp; Authentication Example</h1>
            <p>React, Express, bcrypt, Passport</p>

            <Link to='/signin'><button>Sign-in</button></Link>
            <Link to='/register'><button>Register</button></Link>
            <Link to='/protected'><button>Protected Page</button></Link>
            <Link to='/'><button>Home</button></Link>
          </header>
          <Route path='/register' component={Register} />
          <Route path='/signin' component={Signin} />
          <Route path='/protected' component={Protected} />

        </div>
      </Router>
    );
  }
}

export default Home;
