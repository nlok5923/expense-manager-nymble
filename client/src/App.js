import "semantic-ui-css/semantic.min.css";
import React from "react"
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import LandingPage from "./Pages/Landing/index"
import Login from "./Pages/Login/index"
import Register from "./Pages/Register/index"
import Dashboard from "./Pages/Dashboard/index"
import Expenses from "./Pages/Dashboard/Expenses/index"
import Reports from "./Pages/Dashboard/Report/index"

const App = () => {
  return (
    <div> 
      <Router>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/dashboard/expenses" component={Expenses} />
          <Route exact path="/dashboard/reports" component={Reports} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
