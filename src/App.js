import React from "react";
import Home from "./Pages/Home";
import MovieDetails from "./Pages/MovieDetails";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const App = () => (
  <Router>
    <Switch>
      <Route path={["/", "/popular", "/top_rated", "/upcoming"]} exact component={Home} />
      <Route path="/movieDetails" component={MovieDetails} />
    </Switch>
  </Router>
);

export default App;