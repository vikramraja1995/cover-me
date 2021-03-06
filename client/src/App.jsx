import React from 'react';
import Form from './Form';
import Letter from './Letter';
import Navigation from './Navigation';
import Login from './Login';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      letter: '',
      error: '',
      auth: null,
    };
    this.loginUser = this.loginUser.bind(this);
    this.generateLetter = this.generateLetter.bind(this);
    this.errorMessage = this.errorMessage.bind(this);
    fetch('/auth/check').then((res) => {
      if (res.status === 200) {
        this.setState({ auth: true });
      } else {
        this.setState({ auth: false });
      }
    });
  }

  loginUser(data) {
    fetch('/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' },
    }).then((res) => {
      if (res.status === 200) {
        this.errorMessage('');
        this.setState({ auth: true });
      } else {
        this.errorMessage('The password or email you entered is incorrect!');
      }
    });
  }

  generateLetter(data) {
    this.setState({ error: '' });
    fetch('/api/generate', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' },
    })
      .then(raw => raw.json())
      .then(({ letter }) => {
        this.setState({ letter });
      });
  }

  errorMessage(error) {
    this.setState({ error }, () => {
      window.scrollTo(0, 0);
    });
  }

  render() {
    const { error, letter, auth } = this.state;
    let view = <Login loginUser={this.loginUser} />;

    if (auth === true) {
      view = (
        <div>
          <div>
            <Navigation />
            <div className="container">
              <div className="row">
                <div className="col">
                  <Form generateLetter={this.generateLetter} errorMessage={this.errorMessage} />
                </div>
                <div className="col">
                  <Letter letter={letter} />
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return error ? (
      <div>
        <div className="alert alert-danger m-0" role="alert">
          {/* TODO: Remove lower margin, look into fading in, stick to top */}
          {error}
        </div>
        {view}
      </div>
    ) : (
      view
    );
  }
}

export default App;
