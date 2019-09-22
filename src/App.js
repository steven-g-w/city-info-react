import React, { Component } from 'react';
import logo from './logo.svg';
import Map from './map/Map'
import './App.css';

class App extends Component {

  state = {
    facilities: []
  };

  key = null;

  test() {
    console.log('test')
  }

  componentDidMount() {
    this.fetchData()
  }

  fetchData() {
    fetch(`https://cityinfoapiaustraliaeast.azurewebsites.net/parental-facilities${this.key ? `?key=${this.key}` : ''}`)
      .then(res => res.json())
      .then((data) => this.setState(state => ({ facilities: data })))
      .catch(console.log)
  }

  handleChange(event) {
    this.key = event.target.value;
  }

  onSearch() {
    this.fetchData();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h2>Find Parental Facilities</h2>
          <div className="input-group mb-3">
            <input type="text" className="form-control" placeholder="Search Facilities" onChange={e => this.handleChange(e)}/>
            <div className="input-group-append">
              <button className="btn btn-outline-secondary" type="button" onClick={() => this.onSearch()}>Search</button>
            </div>
          </div>
          <Map state={this.state} />
          <small>Click on each point for detailed information</small>
        </header>
      </div>
    );
  }
}

export default App;
