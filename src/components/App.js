import React from 'react'
import Header from './Header'
import data from '../testData.json'
import ContestList from './ContestList'
import Contest from './Contest'

const pushState = (obj, url) => {
	window.history.pushState(obj, '', url);
	console.log(url);
}


class App extends React.Component {
	state = { 
		message: "Hi!Hi",
		contests: this.props.initialContests
		 };
	componentDidMount(){
		console.log('did mount');
		
		// debugger();
	};
	componentWillUnmount(){
		console.log('unmounted');
		// debugger();
	};
	fetchContest = (contestId) => {
		console.log(contestId);
		pushState({
			currentContestId: contestId
		},
		'/contest/'+ contestId
		);

		this.setState({
			message: this.state.contests[contestId].contestName,
			currentContestId: contestId
		});
	};
	currentContest(){
		if (this.state.currentContestId) {
			return <Contest {...this.state.contests[this.state.currentContestId]} />
		};

		return <ContestList 
			  		onContestClick={this.fetchContest}
			  		contests={this.state.contests}
			  	/>;
	}
	render(){
		return (
		  <div>
		  	<Header message={this.state.message} />
		  	{this.currentContest()}
		  </div>
		)
	}
}

export default App;