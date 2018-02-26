import React from 'react';
import { hydrate } from 'react-dom';
import PropTypes from 'prop-types';
import App from './components/App'
import axios from 'axios'


axios.get('/api/contests')
			.then(res => {
				hydrate(
					<App initialContests={res.data.contests}/>,
					document.getElementById('root')
				);
			})
			.catch(console.error);

