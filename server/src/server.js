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

require('./models/Comment');
require('./models/User');
require('./models/Post');

app.use(auth);
app.use(user);
app.use(post);

const PORT = 5000;
app.listen(PORT, console.log(`Server is running on localhost:${PORT}`));