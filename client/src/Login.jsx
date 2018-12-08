import React from 'react';
import PropTypes from 'prop-types';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin(event) {
    const { loginUser } = this.props;
    event.preventDefault();
    loginUser(this.state);
  }

  render() {
    return (
      <div className="card mx-auto col-sm-4 border">
        <div className="card-body">
          <form>
            <h3>Login</h3>
            {/* Email Address */}
            <div className="form-group row">
              {/* eslint-disable-next-line */}
              <label htmlFor="email" className="bmd-label-floating col-sm-8">
                Email Address
              </label>
              <div className="col-sm-8">
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  onChange={e => this.setState({ email: e.target.value })}
                />
                <small id="emailHelp" className="form-text text-muted">
                  We&#39;ll never share your email with anyone else (But we&#39;ll spam the hell out
                  of it like every other website).
                </small>
              </div>
            </div>
            {/* Password */}
            <div className="form-group row">
              {/* eslint-disable-next-line */}
              <label htmlFor="password" className="bmd-label-floating col-sm-8">
                Password
              </label>
              <div className="col-sm-8">
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  onChange={e => this.setState({ password: e.target.value })}
                />
              </div>
            </div>
            {/*  Login Button */}
            <div className="form-group row">
              <div className="col-sm-5">
                <button type="submit" className="btn btn-primary" onClick={this.handleLogin}>
                  Login
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
};

export default Login;
