import React from "react";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import reducer, { initialState } from "./reducers";
import { setup } from "./actions";

import Header, { menu } from "./components/Header";
import Issues from "./components/Issues";
import PieSection from "./components/PieChart";
import News from "./components/News";
import Map from "./components/Map";
import Footer from "./components/Footer";

import "./styles/main.scss";
import { ApolloProvider } from "@apollo/react-hooks";
import ApolloClient from "apollo-boost";

const middlewares = [thunk];
const composeEnhancers = composeWithDevTools({
  name: "Backend API Store"
});

const store = createStore(
  reducer,
  initialState,
  composeEnhancers(applyMiddleware(...middlewares))
);

store.dispatch(setup());

const client = new ApolloClient({
  uri: "http://patrol.sitewanted.ru/graphql"
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <div className="app">
          <Header />

          <section id={Object.keys(menu)[1]} className="mg-5-v">
            <h2 className="container">Карта обращений</h2>
            <Map firstTop={6} />
          </section>

          <section id={Object.keys(menu)[2]} className="mg-5-v">
            <h2 className="container">Статистика</h2>
            <Issues />
            <PieSection />
          </section>

          <section className="mg-4-b">
            <News />
          </section>

          <Footer/>
        </div>
      </Provider>
    </ApolloProvider>
  );
}

export default App;
