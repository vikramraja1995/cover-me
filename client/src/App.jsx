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
      auth: false
    };
    this.loginUser = this.loginUser.bind(this);
    this.generateLetter = this.generateLetter.bind(this);
    this.errorMessage = this.errorMessage.bind(this);
  }

  loginUser() {
    this.setState({ auth: true });
  }

  generateLetter(data) {
    this.setState({ error: '' });
    fetch('/api/generate', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' }
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
    if (this.state.auth === false) {
      return <Login loginUser={this.loginUser} />;
    }
    return (
      <div>
        <Navigation />
        {this.state.error === '' ? (
          ''
        ) : (
          <div className="alert alert-danger" role="alert">
            {this.state.error}
          </div>
        )}
        <div className="container">
          <div className="row">
            <div className="col">
              <Form generateLetter={this.generateLetter} errorMessage={this.errorMessage} />
            </div>
            <div className="col">
              <Letter letter={this.state.letter} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
