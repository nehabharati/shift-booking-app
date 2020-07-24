import React from "react";
import "./css/index.css";
import Navbar from "./components/Navbar";
import CurrentShift from "./components/CurrentShift";
import AvailableShift from "./components/AvailableShift";
import Helsinki from "./components/Helsinki";
import Turku from "./components/Turku";
import Tampere from "./components/Tampere";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Switch>
          <Route path="/current" exact component={CurrentShift} />
          <Route path="/available" component={AvailableShift} />
          <Route path="/helsinki" component={Helsinki} />
          <Route path="/turku" component={Turku} />
          <Route path="/tampere" component={Tampere} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
