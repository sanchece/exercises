import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const SignUpForm = ({ signUp }) => {
  const history = useHistory();
  const [signUpData, setSignUpData] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
  });

  async function handleSubmit(e) {
    e.preventDefault();
    let res = await signUp(signUpData);
    console.log("in handlesubmit", res);
    if (res.success) {
      console.log("success o nsigning up!");
      history.push("/companies");
    }
  }

  async function handleChange(e) {
    const { name, value } = e.target;
    setSignUpData((data) => ({ ...data, [name]: value }));
    console.log(signUpData);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username</label>
          <input
            name="username"
            value={signUpData.username}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={signUpData.password}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>First name</label>
          <input
            name="firstName"
            value={signUpData.firstName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Last name</label>
          <input
            name="lastName"
            value={signUpData.lastName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            className="form-control"
            value={signUpData.email}
            onChange={handleChange}
          />
        </div>

        <button type="submit" onSubmit={handleSubmit}>
          Sign Up!
        </button>
      </form>
    </div>
  );
};

export default SignUpForm;
