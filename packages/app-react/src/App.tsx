import React, { Component } from 'react';
import './App.css';
import '../../ontario-design-system-component-library/dist/ontario-design-system-components/ontario-icon-account.entry';
import { Ontario_icon_account } from '../../ontario-design-system-component-library/dist/ontario-design-system-components/ontario-icon-account.entry';


interface State {
  value: number | null;
}

class App extends Component<{}, State> {
  constructor(props: {}) {
    super(props);

    this.state = {
      value: null,
    };
  }

  updateRangeValue = (newValue: number) => {
    this.setState(() => ({
      value: newValue,
    }));
  };

  render() {
    return (
      <div className="App">
        <div className="App-content">
          <p>This is a sample React App where we can build out a demo of the Web Components.</p>
          <Ontario_icon_account color="blue"></Ontario_icon_account>
        </div>
      </div>
    );
  }
}

export default App;
