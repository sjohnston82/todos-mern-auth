import React, { useState, useEffect, useCallback } from "react";
import { Route, Switch, Link, useHistory } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Welcome from "./components/Welcome";
import Register from "./pages/Register";
import CreateTodo from "./pages/CreateTodo";
import TodoList from "./components/TodoList";
import Logout from "./pages/Logout";
import moment from "moment";

export const CredentialsContext = React.createContext();

function App() {
  const [todos, setTodos] = useState([]);
  const [credentials, setCredentials] = useState({ username: "", token: "" });
  const history = useHistory();

  const token = credentials.token;

  const checkLoginStatus = useCallback(() => {
    if (!!credentials) {
      history.push("/login");
    }
  }, [credentials, history]);

  const getTodos = useCallback(() => {
    fetch("http://localhost:8000/", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((todos) => {
        setTodos(todos);
      });
  }, [token]);

  const deleteTodo = (id) => {
    fetch("http://localhost:8000/delete/" + id, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
  };

  const handleToggle = (id) => {
    fetch("http://localhost:8000/done/" + id, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());

    let toggled = todos.map((todo) => {
      return todo._id === id
        ? {
            ...todo,
            completed: !todo.completed,
            completedOn: moment().format("YYYY-MM-DD"),
          }
        : { ...todo };
    });
    setTodos(toggled);
    getTodos();
  };

  useEffect(() => {
    checkLoginStatus();
    if (token) {
      getTodos();
    }
  }, [token, checkLoginStatus, getTodos]);
  return (
    <div className="App">
      <nav>
        {credentials.token !== "" ? (
          <div>
            <Link exact to="/">
              Todos List
            </Link>
            <br />
            <Link to="/create">+ Add Todo +</Link>
            <br />
            <Link to="/logout">Logout</Link>
          </div>
        ) : (
          ""
        )}
        <br />
        {!credentials && <Link to="/login">Log In</Link>}
        {!credentials && <Link to="/register">Register</Link>}
      </nav>
      <Switch>
        <Route exact path="/">
          <Welcome credentials={credentials} />
          <TodoList
            todos={todos}
            setTodos={setTodos}
            deleteTodo={deleteTodo}
            handleToggle={handleToggle}
          />
        </Route>
        <Route path="/login">
          <Login setCredentials={setCredentials} />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/create">
          <CreateTodo credentials={credentials} getTodos={getTodos} />
        </Route>
        <Route path="/logout">
          <Logout credentials={credentials} setCredentials={setCredentials} />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
