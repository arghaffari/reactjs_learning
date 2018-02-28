import React from 'react';
import Header from './Header';
import ContestList from './ContestList';
import Contest from './Contest';
import * as api from '../api';
import PropTypes from 'prop-types';

const pushState = (obj, url) => {
  window.history.pushState(obj, '', url);
};


class App extends React.Component {
  state = { 
    message: 'Hi!Hi',
    contests: this.props.initialContests
  };

  componentDidMount(){
		
  }

  componentWillUnmount(){
  }

  fetchContest = (contestId) => {

    pushState({
      currentContestId: contestId
    },
    '/contest/'+ contestId
    );

    api.fetchContest(contestId).then(contest => {
      console.log(contest.contest);
      this.setState({
        message: contest.contest.description,
        currentContestId: contest.contest.id,
        contest: {
          ...this.state.contests,
          [contest.id]: contest
        }
      });
    });
	
  };

  currentContest(){
    if (this.state.currentContestId) {
      return <Contest {...this.state.contests[this.state.currentContestId]} />;
    }

    return <ContestList 
      onContestClick={this.fetchContest}
      contests={this.state.contests}/>;
  }

  render(){
    return (
      <div>
        <Header message={this.state.message} />
        {this.currentContest()}
      </div>
    );
  }
}

App.propTypes = {
  message: PropTypes.string,
  initialContests: PropTypes.object.isRequired
};

export default App;