import React, { Suspense, useState, useEffect } from "react";
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
import { client } from "./config";
import arrow from "../src/img/icon/arrow.svg";
import { Link } from "react-scroll";

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
  const [topClass, setToTopClass] = useState(null)
  const toTopClass = () => {
    setToTopClass(window.pageYOffset/document.body.scrollHeight > 0.2 ? "shown" : "hidden")
  }

  useEffect(() => {
    window.addEventListener('scroll', () => {
      window.requestAnimationFrame(toTopClass);
    }, [])
  })

  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <div className="app">
          <Header />
          <Suspense fallback={<div className="loader">Loading...</div>}>
            <section className="steps-wrap full-height">
              <Steps />
            </section>

            <section
              id={Object.keys(menu)[1]}
              className="bg-white pd-4-t pd-xs-1-b pd-sm-4-b"
            >
              <h2 className="container hide-sm-max">Карта обращений</h2>
              <Map firstTop={6} />
            </section>

            <section id={Object.keys(menu)[2]} className="bg-white pd-4-v">
              <h2 className="container">Статистика</h2>
              <Issues />
              <PieChart />
            </section>

            <section id={Object.keys(menu)[3]} className="pd-4-v">
              <Faq />
            </section>

            <section id={Object.keys(menu)[4]} className="bg-white pd-4-v">
              <News />
            </section>
          </Suspense>
          <Footer />
          <Link
            to="root"
            className={`to-top ${topClass}`}
            smooth="easeOutQuint"
            duration={1250}
          >
            <img src={arrow} alt="To top"/>
          </Link>
        </div>
      </Provider>
    </ApolloProvider>
  );
}

export default App