import React from "react";
import { useHistory } from "react-router-dom";

const Logout = (props) => {
  const history = useHistory();

  const handleNo = (e) => {
    e.preventDefault();
    history.push("/");
  };

  const handleYes = async (e) => {
    e.preventDefault();
    await props.setCredentials({ username: "", token: "" });
    history.push("/login");
  };

  return (
    <div>
      <h2>Are you sure you want to log out?</h2>
      <button onClick={handleYes}>Yes</button>
      <button onClick={handleNo}>No</button>
    </div>
  );
};

export default Logout;
