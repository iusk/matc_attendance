import React from 'react';
import AppContainer from './navigation';
import store from './data/redux';
import { Provider } from 'react-redux';
import CheckConnection from './components/checkConnection';

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <CheckConnection />
        <AppContainer />
      </Provider>
    );
  }
}

export default App;