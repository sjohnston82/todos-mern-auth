import React from "react";
import TodoItem from "./TodoItem";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const TodoList = (props) => {
  const removeTodo = (id) => {
    props.setTodos(props.todos.filter((todo) => todo._id !== id));
    props.deleteTodo(id);
  };

  const doneHandler = (id) => {
    props.handleToggle(id);
  };

  function All() {
    return (
      <div className="container">
        {props.todos.map((todo, index) => {
          return (
            <div key={index}>
              <TodoItem
                removeTodo={removeTodo}
                doneHandler={doneHandler}
                todo={todo}
                handleToggle={props.handleToggle}
              />
            </div>
          );
        })}
      </div>
    );
  }

  function Incomplete() {
    return props.todos
      .filter((todo) => !todo.completed)
      .map((todo, index) => {
        return (
          <div key={index}>
            <TodoItem
              removeTodo={removeTodo}
              doneHandler={doneHandler}
              todo={todo}
              handleToggle={props.handleToggle}
            />
          </div>
        );
      });
  }

  function Complete() {
    return props.todos
      .filter((todo) => todo.completed)
      .map((todo, index) => {
        return (
          <div key={index}>
            <TodoItem
              removeTodo={removeTodo}
              doneHandler={doneHandler}
              todo={todo}
              handleToggle={props.handleToggle}
            />
          </div>
        );
      });
  }

  return (
    <Router>
      <div className="container">
        <Link style={{ margin: "10px" }} to="/">
          All
        </Link>
        <Link style={{ margin: "10px" }} to="/incomplete">
          Incomplete
        </Link>
        <Link style={{ margin: "10px" }} to="/complete">
          Complete
        </Link>
      </div>

      <Switch>
        <Route exact path="/" component={All}>
          <All />
        </Route>

        <Route exact path="/incomplete" component={Incomplete}>
          <Incomplete />
        </Route>

        <Route exact path="/complete" component={Complete}>
          <Complete />
        </Route>
      </Switch>
    </Router>
  );
};

export default TodoList;
