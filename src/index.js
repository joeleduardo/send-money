import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import HomeContainer from './pages/Home.container';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <Provider store={store}>
    <HomeContainer />
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
