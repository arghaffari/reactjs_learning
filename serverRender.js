import React from 'react'
import axios from 'axios'
import config from './config'
import ReactDOMServer from 'react-dom/server'
import App from './src/components/App'


const serverRender = () => {
	console.log("**************");
	console.log('${config.serverUrl}/api/contests');
	console.log("**************");
	return axios.get('http://0.0.0.0:8080/api/contests')
				.then(res => {
					return ReactDOMServer.renderToString(<App initialContests={res.data.contests}/>);
				})
				.catch(console.error);
}

export default serverRender;