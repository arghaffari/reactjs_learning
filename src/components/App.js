import React from 'react';
import Header from './Header';
import ContestList from './ContestList';
import Contest from './Contest';
import * as api from '../api';
import PropTypes from 'prop-types';

const pushState = (obj, url) => {
  window.history.pushState(obj, '', url);
};

const onPopState = handler => {
  window.onpopstate = handler;
};


class App extends React.Component {
  static propTypes = {
    initialData: PropTypes.object.isRequired
  }
  state = this.props.initialData;

  componentDidMount(){
    onPopState((event) => {
      console.log(event.state);
      this.setState({
        currentContestId: (event.state || {}).currentContestId
      });
      console.log(event.state);
      
    });
  }

  componentWillUnmount(){
    onPopState(null);
  }

  fetchContest = (contestId) => {

    pushState({
      currentContestId: contestId
    },
    '/contest/'+ contestId
    );

    api.fetchContest(contestId).then(contest => {
      this.setState({
        currentContestId: contest.id,
        contests: {
          ...this.state.contests,
          [contest.id]: contest
        }
      });
    });
	
  };

  fetchContestList = () => {

    pushState({
      currentContestId: null
    },
    '/'
    );

    api.fetchContestList().then(contests => {
      this.setState({
        currentContestId: null,
        contests
      });
    });
	
  };

  getMessage(){
    if(this.state.currentContestId){
      return this.currentContest().contestName;
    }

    return 'Naming Contests';
  }

  currentContest(){
    return this.state.contests[this.state.currentContestId];
  }

  currentContent(){
    if (this.state.currentContestId) {
      return <Contest {...this.currentContest()} contestListClick={this.fetchContestList}/>;
    }

    return <ContestList 
      onContestClick={this.fetchContest}
      contests={this.state.contests}/>;
  }

  render(){
    return (
      <div>
        <Header message={this.getMessage()} />
        {this.currentContent()}
      </div>
    );
  }
}


export default App;