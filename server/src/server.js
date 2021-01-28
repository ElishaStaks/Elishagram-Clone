require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`server started in ${process.env.NODE_ENV} mode at port ${PORT}`));