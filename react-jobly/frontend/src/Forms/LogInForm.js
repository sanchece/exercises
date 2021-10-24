import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const LogInForm = ({ logIn }) => {
  const history = useHistory();
  const [logInData, setLogInData] = useState({
    username: "",
    password: "",
  });

  async function handleSubmit(e) {
    e.preventDefault();
    let res = await logIn(logInData);
    console.log(logInData);
    console.log("in handle Log In", res);
    if (res.success) {
      console.log("success in logging in");
      history.push("/companies");
    }
  }

  async function handleChange(e) {
    const { name, value } = e.target;
    setLogInData((data) => ({ ...data, [name]: value }));
    console.log(logInData);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username</label>
          <input
            name="username"
            value={logInData.username}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={logInData.password}
            onChange={handleChange}
          />
        </div>

        <button type="submit" onSubmit={handleSubmit}>
          Log In!
        </button>
      </form>
    </div>
  );
};

export default LogInForm;
