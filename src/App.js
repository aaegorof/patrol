import React, { Suspense } from "react";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import reducer, { initialState } from "./reducers";
import { setup } from "./actions";

import Header, { menu } from "./components/Header";

import Faq from "./components/Faq";
import News from "./components/News";

import Footer from "./components/Footer";
import "./styles/main.scss";
import { ApolloProvider } from "@apollo/react-hooks";
import {client} from "./config";

const Steps = React.lazy(() => import("./components/Steps"));
const Issues = React.lazy(() => import("./components/Issues"));
const Map = React.lazy(() => import("./components/Map"));
const PieChart = React.lazy(() => import("./components/PieChart"));


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

function App() {
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <div className="app">
          <Header />
          <Suspense fallback={<div className="loader">Loading...</div>}>
          <section id={Object.keys(menu)[0]} className="steps-wrap full-height">

              <Steps />

          </section>

          <section id={Object.keys(menu)[1]} className="bg-white pd-4-v">

              <h2 className="container">Карта обращений</h2>
              <Map firstTop={6} />

          </section>

          <section id={Object.keys(menu)[2]} className="bg-white pd-4-v">

              <h2 className="container">Статистика</h2>
              <Issues />
              <PieChart/>

          </section>

          <section id={Object.keys(menu)[3]} className="pd-4-v">
            <Faq />
          </section>

          <section id={Object.keys(menu)[4]} className="bg-white pd-4-v">
            <News />
          </section>
          </Suspense>
          <Footer />
        </div>
      </Provider>
    </ApolloProvider>
  );
}

export default App;
