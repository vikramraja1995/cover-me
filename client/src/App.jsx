import React from 'react';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      company: '[Company]',
      greeting: 'Hiring Manager',
      addresseeName: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // eslint-disable-next-line class-methods-use-this
  handleSubmit(event) {
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <form action="">
          {/*  Company's name */}
          <div className="form-group row">
            <label htmlFor="companyName" className="col-sm-2 col-form-label">
              Company Name
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                id="companyName"
                placeholder="Company Name"
                onChange={e => this.setState({ company: e.target.value })}
              />
            </div>
          </div>

          {/*  Greeting options */}
          <fieldset className="form-group">
            <div className="row">
              <legend className="col-form-label col-sm-2 pt-0">Greeting</legend>
              {/*  Hiring Manager greeting */}
              <div className="col-sm-10">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="greeting"
                    id="hiringManager"
                    value="Hiring Manager"
                    defaultChecked
                    onClick={() => this.setState({ greeting: 'Hiring Manager' })}
                  />
                  <label className="form-check-label" htmlFor="hiringManager">
                    Hiring Manager
                  </label>
                </div>
                {/*  Company's team greeting */}
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="greeting"
                    id="companyTeam"
                    value="team"
                    onClick={() => this.setState({ greeting: 'team' })}
                  />
                  <label className="form-check-label" htmlFor="companyTeam">
                    {this.state.company}
                    's Team
                  </label>
                </div>
                {/*  Custom name for greeting */}
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="greeting"
                    id="customName"
                    value="custom"
                    onClick={() => this.setState({ greeting: 'custom' })}
                  />
                  <label className="form-check-label" htmlFor="customName">
                    <input
                      type="text"
                      placeholder="Addressee's Name"
                      onChange={e => this.setState({ addresseeName: e.target.value })}
                      onClick={() => document.getElementById('customName').click()}
                    />
                  </label>
                </div>
              </div>
            </div>
          </fieldset>

          {/*  Submit Button */}
          <div className="form-group row">
            <div className="col-sm-10">
              <button type="submit" className="btn btn-primary" onClick={this.handleSubmit}>
                Generate
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default App;
