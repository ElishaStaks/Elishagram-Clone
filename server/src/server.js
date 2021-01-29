// require("dotenv").config();
const express = require("express");
const cors = require("cors");
const auth = require("./routes/auth");
const user = require("./routes/user");
const post = require("./routes/post");
const connectToDatabase = require("./database");

const app = express();

connectToDatabase();
app.use(express.json());
app.use(cors());

app.use("/api/v1/auth", auth);
app.use("/api/v1/users", user);
app.use("/api/v1/posts", post);

const PORT = 5000;
app.listen(PORT, console.log(`Server is running on localhost:${PORT}`));