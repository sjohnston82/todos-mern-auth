import React from "react";
import "../styles/Todo.css";
import CompletedOn from "./CompletedOn";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";

const TodoItem = (props) => {
  const handleClick = (e) => {
    e.preventDefault();
    props.handleToggle(props.todo._id);
    props.doneHandler(props.todo._id);
  };

  return (
    <div>
      <p
        key={props.todo._id}
        className={props.todo.completed ? "completed" : ""}
        onClick={handleClick}
      >
        {props.todo.text}
      </p>
      {props.todo.completed && <CompletedOn todo={props.todo} />}
      <FontAwesomeIcon
        onClick={() => props.removeTodo(props.todo._id)}
        icon={faTimesCircle}
      />
    </div>
  );
};

export default TodoItem;
