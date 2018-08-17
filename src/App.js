import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(){
    super();
    this.state = {
      quotes: [],
      isLoading: false,
      error: null,
    }
  }
  componentDidMount(){
    this.__fetchQuote();
  }
  __fetchQuote(){
    this.setState({ isLoading: true });
    fetch('https://favqs.com/api/qotd')
    .then(response => {
      if(response.ok){
        return response.json();
      }
      else{
        throw new Error('Something went wrong ...');
      }
    }).then(data => {
        this.setState({
          quotes: data.quote,
          isLoading: false
        })
    })
    .catch(error => this.setState({ error, isLoading: false }));
  }
  render() {
    const { quotes, isLoading, error } = this.state;
    if(error){
      return <p>{error.message}</p>;
    }

    if(isLoading){
      return <p>Loading ...</p>;
    }
    return (
      <div className="App">
        <p className="App-intro">
          {quotes.author}
        </p>
        <p>
          {quotes.body}
        </p>
        <button onClick={this.__fetchQuote.bind(this)}>again</button>
      </div>
    );
  }
}

export default App;
