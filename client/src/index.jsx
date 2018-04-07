import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      repos: [],
      totalAdded:0,
      totalUpdated: 0
    }

  }

  search (term) {
    console.log(`${term} was searched`);

    let data = {term: term};

    fetch('/repos', {
      body: JSON.stringify(data), // must match 'Content-Type' header
      headers: {
        'content-type': 'application/json'
      },
      method: 'POST'
    })
    .then(response =>  response.json())
    .then((numbers)=> {
      console.log('here are the numbers!!', numbers);
      this.setState({
        totalAdded: numbers[0],
        totalUpdated: numbers[1]
      });
      this.getRepos();
    })
    
  }

  componentDidMount(){
    this.getRepos();

  }

  getRepos(){

    fetch('/repos')
    .then(response => response.json())
    .then(
      (repos) => {
        console.log('success', repos);
        this.setState({
          repos: repos
        })

      },

      (error)=> {
        console.log('sorry error!', error);

      }

    )
  }

  render () {
    return (<div>
      <h1>GITHUB HIGH SCORES</h1>
      <RepoList repos={this.state.repos}/>
      <Search className="search" onSearch={this.search.bind(this)}/>
      <h2>Repos added: {this.state.totalAdded}</h2>
      <h2>Repos updated: {this.state.totalUpdated}</h2>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));