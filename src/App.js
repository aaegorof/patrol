import React from 'react'
import { createStore, applyMiddleware } from "redux"
import { Provider } from "react-redux"
import thunk from 'redux-thunk'
import reducer, {initialState} from "./reducers"
import { setup } from "./actions"
import Issues from "./components/Issues"
import logo from './img/logo.svg';
import Header, {menu} from "./components/Header"
import './styles/main.scss'
import PieSection from "./components/PieChart";

const middlewares = [thunk];

const store = createStore(reducer, initialState, applyMiddleware(...middlewares))

store.dispatch(setup())


function App() {
  return (
      <Provider store={store}>
          <div className="app">
            <Header/>

            <section id={Object.keys(menu)[2]}>
              <Issues />
              <PieSection/>
            </section>

          </div>
      </Provider>
  );
}

export default App;
