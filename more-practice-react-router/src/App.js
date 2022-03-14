import { Route, Switch, Redirect } from "react-router-dom";

import Layout from "./components/layout/Layout";
import AllQuotes from "./Pages/AllQuotes";
import QuoteDetail from "./Pages/QuoteDetail";
import NewQuote from "./Pages/NewQuote";
import NotFound from "./Pages/NotFound";

function App() {
  return (
    <Layout>
      <Switch>
        <Route path="/" exact>
          <Redirect to="/quotes" />
        </Route>
        <Route path="/quotes" exact>
          <AllQuotes />
        </Route>
        <Route path="/quotes/:quoteId">
          <QuoteDetail />
        </Route>
        <Route path="/new-quote">
          <NewQuote />
        </Route>
        <Route path='*'>
          <NotFound />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
