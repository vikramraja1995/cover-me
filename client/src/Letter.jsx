import React from 'react';
import PropTypes from 'prop-types';
import shortId from 'shortid';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const Letter = ({ letter }) => (
  <div className="card">
    <div className="card-body">
      {letter.split('\n').map(paragraph => (
        <div key={shortId.generate()}>
          {paragraph}
          <br />
        </div>
      ))}
      <br />
      {letter === '' ? (
        ''
      ) : (
        <CopyToClipboard text={letter}>
          <button type="button" className="badge badge-primary">
            Copy
          </button>
        </CopyToClipboard>
      )}
    </div>
  </div>
);

Letter.propTypes = {
  letter: PropTypes.string.isRequired,
};

export default Letter;
