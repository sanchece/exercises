import { Switch, Route, Redirect } from "react-router-dom";
import React, { useContext } from "react";
import CompanyList from "../companies/CompanyList";
import JobList from "../jobs/JobList";
import CompanyDetail from "../companies/CompanyDetail";
import SignUpForm from "../Forms/SignUpForm";
import LogInForm from "../Forms/LogInForm";
import Profile from "../Forms/ProfileForm";
import UserData from "../UserDataContext";

const Routes = ({ signUp, logIn }) => {
  const { user } = useContext(UserData);

  return (
    <div>
      <Switch>
        <Route exact path="/">
          <div>this is homepage</div>
        </Route>
        <Route exact path="/login">
          <LogInForm logIn={logIn} />
        </Route>
        <Route exact path="/signup">
          <SignUpForm signUp={signUp} />
        </Route>
        <Route exact path="/jobs">
          {user ? <JobList /> : <Redirect to="/login" />}
        </Route>
        <Route exact path="/companies">
          {user ? <CompanyList /> : <Redirect to="/login" />}
        </Route>
        <Route exact path="/companies/:company">
          {user ? <CompanyDetail /> : <Redirect to="/login" />}
        </Route>
        <Route exact path="/profile">
        {user ? <Profile /> : <Redirect to="/login" />}
          
        </Route>
      </Switch>
    </div>
  );
};

export default Routes;
