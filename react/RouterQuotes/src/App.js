import React, { Suspense } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import Layout from "./components/layout/Layout";
import LoadingSpinner from "./components/UI/LoadingSpinner";

const NewQuote = React.lazy(() => import("./pages/new-quote"));
const Quotes = React.lazy(() => import("./pages/quotes"));
const NotFound = React.lazy(() => import("./pages/NotFound"));
const Index = React.lazy(() => import("./pages/index"));

function App() {
  return (
    <Layout>
      <Suspense
        fallback={
          <div className="centered">
            <LoadingSpinner />
          </div>
        }
      >
        <Switch>
          <Route path="/" exact>
            <Redirect to="/index" />
          </Route>
          <Route path="/index">
            <Index />
          </Route>
          <Route path="/quotes/new-quote" exact>
            <NewQuote />
          </Route>
          <Route path="/quotes/:quote">
            <Quotes />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </Suspense>
    </Layout>
  );
}

export default App;
