import React, { Component, Fragment } from 'react';
import TextDisplay from '../containers/TextDisplay.jsx';
import MetricsDisplay from '../containers/MetricsDisplay.jsx';
import Keyboard from '../containers/Keyboard.jsx';

class App extends Component {
  render() {
    return (
      <Fragment>
        <h1>Type Metrics</h1>
        <MetricsDisplay />
        <TextDisplay />
        <Keyboard />
      </Fragment>
    );
  }
}

export default App;
