import './index.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import 'bootstrap/dist/css/bootstrap.css';
import App from './App';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { CONSOLE_TITLE_STYLE, CONSOLE_BODY_STYLE } from './constants/styles.js';
import { EMAIL_ADDRESS } from './constants/index.js';

const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
const rootElement = document.getElementById('root');

ReactDOM.render(
  <BrowserRouter basename={baseUrl}>
    <App />
  </BrowserRouter>,
  rootElement);

  console.log('%cMatt States', CONSOLE_TITLE_STYLE);
  console.log(
      `%cThanks for inspecting my site. Feel free to reach out at:\n ${EMAIL_ADDRESS}`,
      CONSOLE_BODY_STYLE
  );
  console.log('%c ', CONSOLE_TITLE_STYLE);