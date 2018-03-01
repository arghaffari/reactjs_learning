import React from 'react';
import axios from 'axios';
import config from './config';
import ReactDOMServer from 'react-dom/server';
import App from './src/components/App';

const getApiUrl = contestId =>{
  console.log(config.serverUrl + '/api/contests/' + contestId);
  if(contestId){
    return config.serverUrl + '/api/contests/' + contestId;
  }
  return config.serverUrl + '/api/contests';
};

const getInitialData = (contestId, apiData) => {
  if(contestId){
    return {
      currentContestId: apiData.id,
      contests: {
        [apiData.id]: apiData
      }
    };
  }

  return {
    contests: apiData.contests
  };
};


const serverRender = (contestId) => {
  return axios.get(getApiUrl(contestId))
    .then(res => {
      const initialData = getInitialData(contestId, res.data);
      return {
        initialMarkup: ReactDOMServer.renderToString(
          <App initialData={initialData} />
        ),
        initialData
      };
    })
    .catch(console.error);
};

export default serverRender;