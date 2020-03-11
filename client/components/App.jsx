import React, { Component } from 'react';
import TextDisplay from '../containers/TextDisplay.jsx';
import MetricsDisplay from '../containers/MetricsDisplay.jsx';

class App extends Component {
  render() {
    return (
      <div>
        <h1>Type Metrics</h1>
        <MetricsDisplay />
        <TextDisplay />
      </div>
    );
  }
}

export default App;
