import React from 'react';
import PropTypes from 'prop-types';
import shortId from 'shortid';

class Form extends React.Component {
  constructor() {
    super();
    this.state = {
      company: '',
      rawEntries: {},
      formEntries: [],
      selected: {},
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.getFormEntries();
  }

  // TODO: This function is stubbed for now. Modify to get entries from the database.
  getFormEntries() {
    const rawEntries = {
      Greeting: ['Hiring Manager', "[Company's] Team", 'Input Tag'],
      'Role 1': ['Software', 'Javascript', 'Full-Stack', 'Front-End', 'Back-End'],
      'Role 2': ['Developer', 'Engineer'],
      Industry: [
        'Web Development',
        'Internet of Things',
        'Mobile Development',
        'Virtual Reality',
        'Biochemical',
      ],
      'Front-End Frameworks': ['React', 'Angular', 'Vue', 'AngularJS', 'Backbone'],
      Databases: ['PostgreSQL', 'Cassandra', 'MySQL', 'MongoDB', 'Redis', 'MariaDB'],
    };

    const selected = {};
    const keys = Object.keys(rawEntries);
    for (let i = 0; i < keys.length; i += 1) {
      selected[keys[i]] = '';
    }

    this.setState({ rawEntries, selected }, () => {
      this.populateForm();
    });
  }

  populateForm() {
    const { rawEntries } = this.state;
    const keys = Object.keys(rawEntries);
    const formEntries = [];
    for (let i = 0; i < keys.length; i += 1) {
      const key = keys[i];
      const values = rawEntries[key];
      const valueEntries = values.map(this.populateValues.bind(this, key)); // Make sure populateValues() has access to key
      formEntries.push(
        <fieldset key={shortId.generate()} className="form-group">
          <div className="row">
            <legend className="col-form-label col-sm-3 pt-0">{key}</legend>
            <div className="col-sm-5">{valueEntries}</div>
          </div>
        </fieldset>,
      );
    }
    this.setState({ formEntries });
  }

  populateValues(key, value, i) {
    return (
      <div key={shortId.generate()} className="form-check">
        <label className="form-check-label" htmlFor={`${key}-${i}`}>
          {value}
          <input
            className="form-check-input"
            type="radio"
            name={value}
            id={`${key}-${i}`}
            value={value}
            onClick={() => {
              const { selected } = this.state;
              selected[key] = value;
              this.setState({ selected });
            }}
          />
          <span className="circle">
            <span className="check" />
          </span>
        </label>
      </div>
    );
  }

  // TODO: Properly handle submitted form
  handleSubmit(event) {
    event.preventDefault();
    const { errorMessage, generateLetter } = this.props;
    const { selected } = this.state;

    const keys = Object.keys(selected);
    for (let i = 0; i < keys.length; i += 1) {
      const key = keys[i];
      if (selected[key] === '') {
        errorMessage(`Please choose your ${key}`);
        break;
      }
    }

    // if (company === '') {
    //   missing = 'Company';
    // } else if (greeting === '') {
    //   missing = 'Greeting';
    // } else if (greeting === 'custom' && addresseeName === '') {
    //   missing = 'Addressee name';
    // } else if (role === '') {
    //   missing = 'Role 1';
    // } else if (roleAppend === '') {
    //   missing = 'Role 2';
    // } else if (industry === '') {
    //   missing = 'Industry';
    // } else if (frontEndFramework === '') {
    //   missing = 'Front-End Framework';
    // } else if (database === '') {
    //   missing = 'Database';
    // }
    // if (missing !== '') {
    //   errorMessage(`Please choose your ${missing}`);
    //   return;
    // }
    // let fixedGreeting = greeting;
    // if (greeting === 'team') {
    //   fixedGreeting = `${company}'s  Team`;
    // } else if (greeting === 'custom') {
    //   fixedGreeting = addresseeName;
    // }
    window.scrollTo(0, 0);
    // generateLetter({
    //   company,
    //   greeting: fixedGreeting,
    //   role: `${role} ${roleAppend}`,
    //   industry,
    //   frontEndFramework,
    //   database,
    // });
  }

  render() {
    const { formEntries } = this.state;
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

          {/* Populate Form */}
          {formEntries}

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
