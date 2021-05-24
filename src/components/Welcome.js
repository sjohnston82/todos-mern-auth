import React from "react";

const Welcome = (props) => {
  return (
    <div>
      <h2>
        Welcome
        {props.credentials.username !== ""
          ? `, ${props.credentials.username}`
          : ""}
        !
      </h2>
    </div>
  );
};

export default Welcome;
