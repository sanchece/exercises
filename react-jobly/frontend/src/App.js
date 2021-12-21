import { BrowserRouter } from "react-router-dom";
import Routes from "./routes/Routes";
import Navbar from "./routes/Navbar";
``````//#endregion                          ````````import JoblyApi from "./api";
import UserData from "./UserDataContext";
import React, { useEffect, useState } from "react";

import jwt from "jsonwebtoken";

function App() {
  const [token, setToken] = useLocalStorage("token");
  const [user, setUser] = useState(null);
  const [jobApps, setJobApps] = useState(new Set([]));

  useEffect(
    function mountUser() {
      async function getUser() {
        if (token) {
          let { username } = jwt.decode(token);
          JoblyApi.token = token;
          let user = await JoblyApi.getUser(username);
          setUser(user);
          setJobApps(new Set(user.applications));
          console.log("user fetched--->", user);
        } 
        else console.log("no token");
      }
      getUser();
    },
    [token]
  );

  const applyJob = (id) => {
    JoblyApi.applyToJob(user.username, id);
    setJobApps(new Set([...jobApps, id]));
  };
  const checkIfApplied = (id) => {
    return jobApps.has(id);
  };

  async function signUp(data) {
    try {
      let token = await JoblyApi.signup(data);
      setToken(token);
      return { success: true };
    } catch (errors) {
      return { success: false, errors };
    }
  }
  async function logIn(data) {
    try {
      let token = await JoblyApi.login(data);
      setToken(token);
      return { success: true };
    } catch (errors) {
      return { success: false, errors };
    }
  }

  function logOut() {
    setToken(null);
    setUser(null);
  }

  return (
    <BrowserRouter>
      <UserData.Provider
        value={{ user, setUser, jobApps, applyJob, checkIfApplied }}
      >
        <div className="App">
          <Navbar logOut={logOut} />
          <Routes signUp={signUp} logIn={logIn} />
        </div>
      </UserData.Provider>
    </BrowserRouter>
  );
}

export default App;
