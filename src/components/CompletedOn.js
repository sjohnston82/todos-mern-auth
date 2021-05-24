import React from "react";
// import "./CompletedOn.css";
import moment from "moment";

const CompletedOn = (props) => {
  return (
    <div>
      <p id="completed-on">Completed on {moment().format("YYYY-MM-DD")}</p>
    </div>
  );
};

export default CompletedOn;
