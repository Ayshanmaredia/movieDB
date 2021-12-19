import React from "react";
import "./components/FontAwesomeIcons";
import Home from "./Pages/Home";
import MovieDetails from "./Pages/MovieDetails";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { DataProvider } from "./DataContext";

const App = () => (
  <Router>
    <DataProvider>
      <Switch>
        <Route path={["/", "/popular", "/top_rated", "/upcoming"]} exact component={Home} />
        <Route path="/movieDetails" component={MovieDetails} />
      </Switch>
    </DataProvider>
  </Router>
);

export default App;