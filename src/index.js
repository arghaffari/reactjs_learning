import React from 'react';
import { hydrate } from 'react-dom';
import PropTypes from 'prop-types';
import App from './components/App';
import axios from 'axios';



hydrate(
  <App initialData={window.initialData}/>,
  document.getElementById('root')
);
 

