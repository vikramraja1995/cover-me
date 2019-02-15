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
      Greeting: ['Hiring Manager', '%input%'],
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
    const fields = Object.keys(rawEntries);
    const formEntries = [];
    for (let i = 0; i < fields.length; i += 1) {
      const field = fields[i];
      const options = rawEntries[field];
      // Make sure populateValues() has access to field
      const optionEntries = options.map(this.populateValues.bind(this, field));
      formEntries.push(
        <fieldset key={shortId.generate()} className="form-group">
          <div className="row">
            <legend className="col-form-label col-sm-3 pt-0">{field}</legend>
            <div className="col-sm-5">{optionEntries}</div>
          </div>
        </fieldset>,
      );
    }
    this.setState({ formEntries });
  }

  populateValues(field, option, i) {
    const input = option === '%input%';
    return (
      <div key={shortId.generate()} className="form-check">
        <label className="form-check-label" htmlFor={`${field}-${i}`}>
          {input ? '' : option}
          <input
            className="form-check-input"
            type="radio"
            name={field}
            id={`${field}-${i}`}
            value={option}
            onClick={() => {
              const { selected } = this.state;
              const customIn = document.getElementById(`${field}-custom-${i}`);
              selected[field] = customIn === null ? option : customIn.value;
              this.setState({ selected });
            }}
          />
          <span className="circle">
            <span className="check" />
          </span>
          {/* Add custom input field if %input% is detected as a option */}
          {input ? (
            <input
              id={`${field}-custom-${i}`}
              className="form-control"
              type="text"
              placeholder="Custom"
              onChange={(e) => {
                const { selected } = this.state;
                selected[field] = e.target.value;
                this.setState({ selected });
              }}
              onClick={() => document.getElementById(`${field}-${i}`).click()}
            />
          ) : (
            ''
          )}
        </label>
      </div>
    );
  }

  handleSubmit(event) {
    event.preventDefault();
    const { errorMessage, generateLetter } = this.props;
    const { company, selected } = this.state;

    const fields = Object.keys(selected);
    for (let i = 0; i < fields.length; i += 1) {
      const field = fields[i];
      if (selected[field] === '') {
        errorMessage(`Please choose your ${field}`);
        return;
      }
    }
    window.scrollTo(0, 0);
    generateLetter({ company, selected });
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
                onChange={e => this.setState({ company: e.target.option })}
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
