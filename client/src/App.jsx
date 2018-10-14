import React from 'react';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      company: '[Company]',
      greeting: 'Hiring Manager',
      addresseeName: '',
      role: '',
      industry: '',
      frontEndFramework: '',
      database: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onCompanyNameChange = this.onCompanyNameChange.bind(this);
  }

  // Sets company state to [Company] if the input is empty so it looks neat in the greeting option
  onCompanyNameChange(e) {
    const text = e.target.value === '' ? '[Company]' : e.target.value;
    this.setState({ company: text });
  }

  // eslint-disable-next-line class-methods-use-this
  handleSubmit(event) {
    event.preventDefault();
  }

  populateRoles() {
    const roles = ['Software', 'Javascript', 'Full-Stack', 'Front-End', 'Back-End'];
    return roles.map((role, i) => {
      return (
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="role"
            id={`role-${i}`}
            value={role}
            onClick={() => this.setState({ role })}
          />
          <label className="form-check-label" htmlFor={`role-${i}`}>
            {role}
          </label>
        </div>
      );
    });
  }

  populateIndustry() {
    const industries = [
      'Web Development',
      'Internet of Things',
      'Mobile Development',
      'Virtual Reality',
      'Biochemical'
    ];
    return industries.map((industry, i) => {
      return (
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="industry"
            id={`industry-${i}`}
            value={industry}
            onClick={() => this.setState({ industry })}
          />
          <label className="form-check-label" htmlFor={`industry-${i}`}>
            {industry}
          </label>
        </div>
      );
    });
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
                onChange={this.onCompanyNameChange}
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

          {/*  Role options */}
          <fieldset className="form-group">
            <div className="row">
              <legend className="col-form-label col-sm-2 pt-0">Role 1</legend>
              {/*  Roles */}
              <div className="col-sm-2">{this.populateRoles()}</div>
            </div>
          </fieldset>

          <fieldset className="form-group">
            <div className="row">
              <legend className="col-form-label col-sm-2 pt-0">Role 2</legend>
              {/*  Role appends */}
              <div className="col-sm-2">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="role-append"
                    id="developer"
                    value="developer"
                    onClick={() => this.setState({ roleAppend: 'Developer' })}
                  />
                  <label className="form-check-label" htmlFor="developer">
                    Developer
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="role-append"
                    id="engineer"
                    value="engineer"
                    onClick={() => this.setState({ roleAppend: 'Engineer' })}
                  />
                  <label className="form-check-label" htmlFor="engineer">
                    Engineer
                  </label>
                </div>
              </div>
            </div>
          </fieldset>

          {/*  Industry options */}
          <fieldset className="form-group">
            <div className="row">
              <legend className="col-form-label col-sm-2 pt-0">Industry</legend>
              {/*  Industries */}
              <div className="col-sm-2">{this.populateIndustry()}</div>
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
