import React from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const Letter = ({ letter }) => (
  <div className="card">
    <div className="card-body">
      {letter.split('\n').map((paragraph, i) => (
        <div key={`pg-${i}`}>
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
export default Letter;
