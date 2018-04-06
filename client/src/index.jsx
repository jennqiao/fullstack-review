import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      repos: []
    }

  }

  search (term) {
    console.log(`${term} was searched`);

    let data = {term: term};

    fetch('http://localhost:1128/repos', {
      body: JSON.stringify(data), // must match 'Content-Type' header
      headers: {
        'content-type': 'application/json'
      },
      method: 'POST'
    })
    .then(response => console.log(response));
  }

  componentDidMount(){
    this.getRepos();

  }

  getRepos(){

    fetch('http://localhost:1128/repos')
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
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this)}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));