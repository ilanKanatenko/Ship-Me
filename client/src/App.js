// import logo from "./logo.svg";
import "./App.css";
import Landing from "./components/Landing/Landing";
import Home from "./components/Home/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Account from "./components/Account/Account";
import Companies from "./components/Companies/Companies";
import Profile from "./components/Forms/UserForm";
import Company from "./components/Forms/CompanyForm";

import MainNavBar from "./components/shared/MainNavBar";
import SecondaryNavBar from "./components/shared/SecondaryNavBar";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          {/* <Route path="/about">
            <About />
          </Route> */}
          <Route exact path="/sign-in">
            <header className="App-header">
              <Landing formType="sign-in"></Landing>
            </header>
          </Route>
          <Route exact path="/sign-up">
            <header className="App-header">
              <Landing formType="sign-up"></Landing>
            </header>
          </Route>
          <Route exact path="/select-company">
            <header className="App-header">
              <Landing formType="/select-company"></Landing>
            </header>
          </Route>
        </Switch>

        <Switch>
          <Route exact path="/account">
            <MainNavBar />
            <SecondaryNavBar />
            <Account />
          </Route>
          <Route key="add-client" exact path="/profile">
            <Profile />
          </Route>
          <Route key="edit-client" exact path="/profile/edit">
            <MainNavBar />
            <SecondaryNavBar />
            <Profile />
          </Route>
          <Route key="edit-chosen-user" exact path="/profile/edit/:id">
            <MainNavBar />
            <SecondaryNavBar />
            <Profile />
          </Route>
          <Route key="add-company" exact path="/company">
            <Company />
          </Route>
          <Route key="edit-company" exact path="/company/edit">
            <MainNavBar />
            <SecondaryNavBar />
            <Company />
          </Route>
          <Route key="edit-chosen-company" exact path="/company/edit/:id">
            <MainNavBar />
            <SecondaryNavBar />
            <Company />
          </Route>
          <Route exact path="/companies">
            <MainNavBar />
            <SecondaryNavBar />
            <Companies />
          </Route>

          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/shipments">
            <MainNavBar />
            <Home />
          </Route>
          <Route exact path="/order">
            <MainNavBar />
          </Route>
        </Switch>
      </Router>

      {/* <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}
    </div>
  );
}

export default App;
