import React, { Component } from 'react';
import './App.css';
import '../../ontario-design-system-component-library/dist/ontario-design-system-components/ontario-icon-account.entry';
import { OntarioHeader } from '@ontario-digital-service/ontario-design-system-component-library-react';

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
			    <OntarioHeader />
          <p>This is a sample React App where we can build out a demo of the Web Components.</p>
        </div>
      </div>
    );
  }
}

export default App;
