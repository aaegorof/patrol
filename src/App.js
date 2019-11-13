import React from 'react';
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from 'redux-thunk';
import reducer, {initialState} from "./reducers"
import { setup } from "./actions";
import Issues from "./components/Issues"
import logo from './img/logo.svg';

import './styles/main.scss';

const middlewares = [thunk];

const store = createStore(reducer, initialState, applyMiddleware(...middlewares))

store.dispatch(setup())


function App() {
  return (
      <Provider store={store}>
          <div className="app">
            <header className="main-header">
            </header>
            <Issues></Issues>
          </div>
      </Provider>
  );
}

export default App;
