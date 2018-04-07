import React from 'react';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      term: ''
    }
  }

  onChange (e) {
    this.setState({
      term: e.target.value
    });
  }

  search() {
    this.props.onSearch(this.state.term);
    this.setState({
      term:''
    });
  }

  render() {
    return (<div>
      <h4>SEE HOW YOU RANK</h4>
      Enter your github username: <input value={this.state.term} onChange={this.onChange.bind(this)}/>       
      <button onClick={this.search.bind(this)}> PLAY </button>
    </div>) 
  }
}

export default Search;