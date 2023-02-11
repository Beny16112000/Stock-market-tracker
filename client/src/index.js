import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import RegisterForm from './Components/Authentication/Register/register';
import LoginForm from './Components/Authentication/Login/login';
import LogoutPage from './Components/Authentication/Logout/logout';
import CompaniesAll from './Components/Companies/all';
import CompaniesFollow from './Components/Companies/follow';
import StockGraph from './Components/Companies/single';
import Navbar from './Components/Navbar/nav';


const register = ReactDOM.createRoot(document.getElementById('register'));
register.render(
  <Router>
  <Navbar />
  <React.StrictMode>
  <Switch>
    <Route path="/auth/register">
      <RegisterForm />
    </Route>
  </Switch>
  </React.StrictMode>
  </Router>
);


const login = ReactDOM.createRoot(document.getElementById('login'));
login.render(
  <Router>
  <React.StrictMode>
  <Switch>
    <Route path="/auth/login">
      <LoginForm />
    </Route>
  </Switch>
  </React.StrictMode>
  </Router>
);


const logout = ReactDOM.createRoot(document.getElementById('logout'));
logout.render(
  <Router>
  <React.StrictMode>
  <Switch>
    <Route path="/auth/logout">
      <LogoutPage />
    </Route>
  </Switch>
  </React.StrictMode>
  </Router>
);


const companiesAll = ReactDOM.createRoot(document.getElementById('ccompaniesAll'));
companiesAll.render(
  <Router>
  <React.StrictMode>
  <Switch>
    <Route path="/company/all">
      <CompaniesAll />
    </Route>
  </Switch>
  </React.StrictMode>
  </Router>
);


const companiesFollow = ReactDOM.createRoot(document.getElementById('companiesFollow'));
companiesFollow.render (
  <Router>
    <React.StrictMode>
    <Switch>
      <Route path="/company/follow">
        <CompaniesFollow />
      </Route>
    </Switch>
    </React.StrictMode>
  </Router>
);


const stockGraph = ReactDOM.createRoot(document.getElementById('stockGraph'));
stockGraph.render (
  <Router>
    <React.StrictMode>
    <Switch>
      <Route path="/company/single">
        <StockGraph />
      </Route>
    </Switch>
    </React.StrictMode>
  </Router>
);



reportWebVitals();