import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./views/Home";
import Sets from "./views/Sets";
import Practice from "./views/Practice";
import NoMatch from "./views/NoMatch";
import NavigationBar from "./components/NavigationBar";

import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="App">
      <Router>
        <NavigationBar />

        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/sets" component={Sets} />
          <Route exact path="/practice" component={Practice} />
          <Route component={NoMatch} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
