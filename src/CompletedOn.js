import React from "react";
// import "./CompletedOn.css";

const CompletedOn = (props) => {
  console.log(props.data);
  return (
    <div>
      <p id="completed-on">Completed on {props.data}</p>
    </div>
  );
};

export default CompletedOn;
