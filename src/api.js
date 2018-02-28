import React from 'react';
import axios from 'axios';

export const fetchContest = contestId => {
  return axios.get('/api/contests/' + contestId)
    .then(res => res.data);
};