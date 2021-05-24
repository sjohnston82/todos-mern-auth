const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");

const PORT = 8000;
const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

const publicRoutes = require("./routes/public");
app.use("/", publicRoutes);

const protectedRoutes = require("./routes/protected");
app.use("/", protectedRoutes);

const connectDatabase = async (hostname, databaseName) => {
  const database = await mongoose.connect(
    `mongodb://${hostname}/${databaseName}`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    }
  );

  console.log(`database connected at mongodb://${hostname}/${databaseName}`);

  return database;
};

app.listen(PORT, async () => {
  await connectDatabase("localhost", "todos");
  console.log("listening on port " + PORT);
});
