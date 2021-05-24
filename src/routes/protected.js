const User = require("../models/User");
const express = require("express");
const jwt = require("jsonwebtoken");
const Todo = require("../models/Todo");

const router = express.Router();
const SECRET_KEY =
  "sdf2354r3rfsfsdfsdf23wdfsdf434t5gdsfsdfsgsdfsdfsdfdsfsef234rt345t3tgefgxcswp";

router.get("/", async (req, res) => {
  const authorization = req.header("Authorization") || "";
  const [type, token] = authorization.split(" ");
  if (token === undefined) {
    console.log("token not reaching here");
  }

  if (type === "Bearer" && jwt.verify(token, SECRET_KEY)) {
    const payload = jwt.decode(token, SECRET_KEY);
    User.findOne({ _id: payload._id }, (err, user) => {
      if (err) return res.status(500).send(err);
      if (!user) return res.status(400).send("not a valid user");
      console.log("here i am");
      Todo.find({ owner: user.username }, (err, todos) => {
        if (err) {
          console.log("Error: " + err);
        } else {
          console.log(todos);
          res.json(todos);
        }
      });
    });
  } else {
    return res.status(400).send("unauthorized");
  }
});

router.post("/create", (req, res) => {
  const authorization = req.header("Authorization") || "";
  const [type, token] = authorization.split(" ");

  if (type === "Bearer" && jwt.verify(token, SECRET_KEY)) {
    const payload = jwt.decode(token, SECRET_KEY);
    User.findOne({ _id: payload._id }, (err, user) => {
      if (err) return res.status(500).send(err);
      if (!user) return res.status(400).send("not a valid user");

      const todo = new Todo(req.body);
      todo
        .save()
        .then((todo) => {
          console.log(todo);
          res.json(todo);
        })
        .catch((err) => {
          res.status(500).send(err.message);
        });
    });
  } else {
    return res.status(400).send("unauthorized");
  }
});

router.delete("/delete/:id", (req, res) => {
  const authorization = req.header("Authorization") || "";
  const [type, token] = authorization.split(" ");

  if (type === "Bearer" && jwt.verify(token, SECRET_KEY)) {
    const payload = jwt.decode(token, SECRET_KEY);
    User.findOne({ _id: payload._id }, (err, user) => {
      if (err) return res.status(500).send(err);
      if (!user) return res.status(400).send("not a valid user");

      const id = req.params.id;

      Todo.findByIdAndDelete(id, function (err) {
        if (err) {
          console.log(err);
        }
        console.log("Item", id, "deleted.");
      });
    });
  } else {
    return res.status(400).send("unauthorized");
  }
});

router.put("/done/:id", (req, res) => {
  const authorization = req.header("Authorization") || "";
  const [type, token] = authorization.split(" ");

  if (type === "Bearer" && jwt.verify(token, SECRET_KEY)) {
    const payload = jwt.decode(token, SECRET_KEY);
    User.findOne({ _id: payload._id }, (err, user) => {
      if (err) return res.status(500).send(err);
      if (!user) return res.status(400).send("not a valid user");

      Todo.findById(req.params.id, function (err, todo) {
        todo.completed = !todo.completed;
        if (todo.completedOn === null) {
          todo.completedOn = new Date().toLocaleString();
        } else {
          todo.completedOn = null;
        }

        todo.save(function (err, todo) {
          if (err) {
            console.log(err);
          } else {
            res.json(todo);
          }
        });
      });
    });
  } else {
    return res.status(400).send("unauthorized");
  }
});

module.exports = router;
