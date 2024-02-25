import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';

import App from './App';
import enableMock from './mock';

enableMock();

ReactDOM.render(
  <React.StrictMode>
    <>
      <App />
      {/*<MockSamples />*/}
    </>
  </React.StrictMode>,
  // eslint-disable-next-line no-undef
  document.getElementById('root'),
);
