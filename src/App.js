import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import SortingVisualizer from './SortingVisualizer/SortingVisualizer'

class App extends Component {
  render() {
    return (
      <div className="App">
          <SortingVisualizer/>
      </div>
    );
  }
}

export default App;
