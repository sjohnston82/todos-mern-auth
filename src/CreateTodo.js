import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
// import { CredentialsContext } from "./App";

const CreateTodo = (props) => {
  // const [credentials] = useContext(CredentialsContext);
  const [newTodo, setNewTodo] = useState({
    text: "",
    completed: false,
    completedOn: null,
    owner: props.credentials.username,
  });

  const token = props.credentials.token;

  const history = useHistory();

  //  possibly get rid of this, set new item to todos array in parent and then pass the entire new array as that users todos

  const postNewTodo = (todo) =>
    fetch("http://localhost:8000/create", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(todo),
    });

  const handleChange = (evt) => {
    setNewTodo({ ...newTodo, text: evt.target.value });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    await postNewTodo(newTodo);
    setNewTodo({ ...newTodo, text: "" });
    await props.getTodos();
    history.push("/");
  };

  return (
    <div>
      <h2>Add a new todo</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="text"
          id="text"
          placeholder="Enter a Todo..."
          value={newTodo.text}
          onChange={handleChange}
        />
        <button>Add New Todo</button>
      </form>
    </div>
  );
};

export default CreateTodo;
