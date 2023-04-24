import React from 'react';
import ReactDOM from 'react-dom/client';
import Parse from 'parse';
import { HashRouter } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import './index.css';
import App from './App/App';

const PARSE_APPLICATION_ID = 'ijp69LClWRgHWiSOARhA2G6l1uFHKzHbNqPWVRWi';
const PARSE_HOST_URL = 'https://parseapi.back4app.com/';
const PARSE_JAVASCRIPT_KEY = '9R0N30UhBs5JIyFk5s1lqSJS6c2lVY6edNl94tIx';
Parse.initialize(PARSE_APPLICATION_ID, PARSE_JAVASCRIPT_KEY);
Parse.serverURL = PARSE_HOST_URL;

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>
);
