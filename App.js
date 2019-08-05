import React from 'react';
import AppContainer from './navigation';
import store from './data/redux';
import { Provider } from 'react-redux';

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    );
  }
}

export default App;