import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";

const Login = (props) => {
  const [user, setUser] = useState({ username: "", password: "" });
  // const [credentials, setCredentials] = useContext(CredentialsContext);

  const history = useHistory();

  const handleChange = (evt) => {
    setUser({ ...user, [evt.target.name]: evt.target.value });
  };

  async function loginUser(user) {
    await fetch("http://localhost:8000/login/", {
      method: "POST",
      body: JSON.stringify({
        username: user.username,
        password: user.password,
      }),
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
    })
      .then(async (res) => await res.json())
      .then(async (data) => {
        await props.setCredentials({
          username: user.username,
          password: user.password,
          token: data.token,
        });
        history.push("/");
      });
    // .then(history.push("/"));
  }

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    await loginUser(user).then(() => {
      history.push("/");
    });
  };

  return (
    <div>
      <h2>
        Please log in or <Link to="/register">Register</Link>.
      </h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          value={user.username}
          id="username"
          placeholder="Enter your username"
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          id="password"
          value={user.password}
          onChange={handleChange}
          placeholder="Enter your password"
        />
        <button>Log In</button>
      </form>
    </div>
  );
};

export default Login;
