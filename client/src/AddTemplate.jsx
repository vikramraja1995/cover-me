import React from 'react';
import PropTypes from 'prop-types';
import shortId from 'shortid';

class Form extends React.Component {
  constructor() {
    super();
    this.state = {
      company: '',
      greeting: '',
      addresseeName: '',
      role: '',
      roleAppend: '',
      industry: '',
      frontEndFramework: '',
      database: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // TODO: Look into merging all the population functions into one
  populateRoles() {
    const roles = ['Software', 'Javascript', 'Full-Stack', 'Front-End', 'Back-End'];
    return roles.map((role, i) => (
      <div key={shortId.generate()} className="form-check">
        <label className="form-check-label" htmlFor={`role-${i}`}>
          {role}
          <input
            className="form-check-input"
            type="radio"
            name="role"
            id={`role-${i}`}
            value={role}
            onClick={() => this.setState({ role })}
          />
          <span className="circle">
            <span className="check" />
          </span>
        </label>
      </div>
    ));
  }

  populateIndustry() {
    const industries = [
      'Web Development',
      'Internet of Things',
      'Mobile Development',
      'Virtual Reality',
      'Biochemical',
    ];
    return industries.map((industry, i) => (
      <div key={shortId.generate()} className="form-check">
        <label className="form-check-label" htmlFor={`industry-${i}`}>
          {industry}
          <input
            className="form-check-input"
            type="radio"
            name="industry"
            id={`industry-${i}`}
            value={industry}
            onClick={() => this.setState({ industry })}
          />
          <span className="circle">
            <span className="check" />
          </span>
        </label>
      </div>
    ));
  }

  populateFrontEndFrameworks() {
    const frontEndFrameworks = ['React', 'Angular', 'Vue', 'AngularJS', 'Backbone'];
    return frontEndFrameworks.map((frontEndFramework, i) => (
      <div key={shortId.generate()} className="form-check">
        <label className="form-check-label" htmlFor={`frontEndFramework-${i}`}>
          {frontEndFramework}
          <input
            className="form-check-input"
            type="radio"
            name="frontEndFramework"
            id={`frontEndFramework-${i}`}
            value={frontEndFramework}
            onClick={() => this.setState({ frontEndFramework })}
          />
          <span className="circle">
            <span className="check" />
          </span>
        </label>
      </div>
    ));
  }

  populateDatabases() {
    const databases = ['PostgreSQL', 'Cassandra', 'MySQL', 'MongoDB', 'Redis', 'MariaDB'];
    return databases.map((database, i) => (
      <div key={shortId.generate()} className="form-check">
        <label className="form-check-label" htmlFor={`database-${i}`}>
          {database}
          <input
            className="form-check-input"
            type="radio"
            name="database"
            id={`database-${i}`}
            value={database}
            onClick={() => this.setState({ database })}
          />
          <span className="circle">
            <span className="check" />
          </span>
        </label>
      </div>
    ));
  }

  // eslint-disable-next-line class-methods-use-this
  handleSubmit(event) {
    event.preventDefault();
    const { errorMessage, generateLetter } = this.props;
    const {
      company,
      greeting,
      addresseeName,
      role,
      roleAppend,
      industry,
      frontEndFramework,
      database,
    } = this.state;
    let missing = '';
    if (company === '') {
      missing = 'Company';
    } else if (greeting === '') {
      missing = 'Greeting';
    } else if (greeting === 'custom' && addresseeName === '') {
      missing = 'Addressee name';
    } else if (role === '') {
      missing = 'Role 1';
    } else if (roleAppend === '') {
      missing = 'Role 2';
    } else if (industry === '') {
      missing = 'Industry';
    } else if (frontEndFramework === '') {
      missing = 'Front-End Framework';
    } else if (database === '') {
      missing = 'Database';
    }
    if (missing !== '') {
      errorMessage(`Please choose your ${missing}`);
      return;
    }
    let fixedGreeting = greeting;
    if (greeting === 'team') {
      fixedGreeting = `${company}'s  Team`;
    } else if (greeting === 'custom') {
      fixedGreeting = addresseeName;
    }
    window.scrollTo(0, 0);
    generateLetter({
      company,
      greeting: fixedGreeting,
      role: `${role} ${roleAppend}`,
      industry,
      frontEndFramework,
      database,
    });
  }

  render() {
    const { company } = this.state;
    return (
      <div className="border-right border-light">
        <form action="">
          {/*  Company's name */}
          <div className="form-group row">
            <div className="col-sm-5">
              <input
                type="text"
                className="form-control"
                id="companyName"
                placeholder="Company's Name"
                onChange={e => this.setState({ company: e.target.value })}
              />
            </div>
          </div>

          {/*  Greeting options */}
          <fieldset className="form-group">
            <div className="row">
              <legend className="col-form-label col-sm-3 pt-0">Greeting</legend>
              {/*  Hiring Manager greeting */}
              <div className="col-sm-5">
                <div className="form-check">
                  <label className="form-check-label" htmlFor="hiringManager">
                    Hiring Manager
                    <input
                      className="form-check-input"
                      type="radio"
                      name="greeting"
                      id="hiringManager"
                      value="Hiring Manager"
                      onClick={() => this.setState({ greeting: 'Hiring Manager' })}
                    />
                    <span className="circle">
                      <span className="check" />
                    </span>
                  </label>
                </div>
                {/*  Company's team greeting */}
                <div className="form-check">
                  <label className="form-check-label" htmlFor="companyTeam">
                    {company === '' ? '[Company]' : company}
                    &#39;s Team
                    <input
                      className="form-check-input"
                      type="radio"
                      name="greeting"
                      id="companyTeam"
                      value="team"
                      onClick={() => this.setState({ greeting: 'team' })}
                    />
                    <span className="circle">
                      <span className="check" />
                    </span>
                  </label>
                </div>
                {/*  Custom name for greeting */}
                <div className="form-check">
                  <label className="form-check-label" htmlFor="customName">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="greeting"
                      id="customName"
                      value="custom"
                      onClick={() => this.setState({ greeting: 'custom' })}
                    />
                    <span className="circle">
                      <span className="check" />
                    </span>
                    <input
                      className="form-control"
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
              <legend className="col-form-label col-sm-3 pt-0">Role 1</legend>
              {/*  Roles */}
              <div className="col-sm-5">{this.populateRoles()}</div>
            </div>
          </fieldset>

          {/* TODO: Populate this using a loop */}
          <fieldset className="form-group">
            <div className="row">
              <legend className="col-form-label col-sm-3 pt-0">Role 2</legend>
              {/*  Role appends */}
              <div className="col-sm-5">
                <div className="form-check">
                  <label className="form-check-label" htmlFor="developer">
                    Developer
                    <input
                      className="form-check-input"
                      type="radio"
                      name="role-append"
                      id="developer"
                      value="developer"
                      onClick={() => this.setState({ roleAppend: 'Developer' })}
                    />
                    <span className="circle">
                      <span className="check" />
                    </span>
                  </label>
                </div>
                <div className="form-check">
                  <label className="form-check-label" htmlFor="engineer">
                    Engineer
                    <input
                      className="form-check-input"
                      type="radio"
                      name="role-append"
                      id="engineer"
                      value="engineer"
                      onClick={() => this.setState({ roleAppend: 'Engineer' })}
                    />
                    <span className="circle">
                      <span className="check" />
                    </span>
                  </label>
                </div>
              </div>
            </div>
          </fieldset>

          {/*  Industry options */}
          <fieldset className="form-group">
            <div className="row">
              <legend className="col-form-label col-sm-3 pt-0">Industry</legend>
              {/*  Industries */}
              <div className="col-sm-5">{this.populateIndustry()}</div>
            </div>
          </fieldset>

          {/*  Front-End Framework options */}
          <fieldset className="form-group">
            <div className="row">
              <legend className="col-form-label col-sm-3 pt-0">Front-End Framework</legend>
              {/*  Front-End Frameworks */}
              <div className="col-sm-5">{this.populateFrontEndFrameworks()}</div>
            </div>
          </fieldset>

          {/*  Database options */}
          <fieldset className="form-group">
            <div className="row">
              <legend className="col-form-label col-sm-3 pt-0">Database</legend>
              {/*  Database */}
              <div className="col-sm-5">{this.populateDatabases()}</div>
            </div>
          </fieldset>

          {/*  Submit Button */}
          <div className="form-group row">
            <div className="col-sm-5">
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

Form.propTypes = {
  errorMessage: PropTypes.func.isRequired,
  generateLetter: PropTypes.func.isRequired,
};

export default Form;
