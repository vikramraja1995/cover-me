import React from 'react';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin(event) {
    event.preventDefault();
    this.props.loginUser(this.state);
  }

  render() {
    return (
      <div className="card mx-auto col-sm-4 border">
        <div className="card-body">
          <form>
            <h3>Login</h3>
            {/* Email Address */}
            <div className="form-group row">
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
              </div>
            </div>
            {/* Password */}
            <div className="form-group row">
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

export default Login;
