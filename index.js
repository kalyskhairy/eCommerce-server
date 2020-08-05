require('dotenv').config()
const express = require("express");
const cors = require("cors");
const app = express();
const router = require("./router/index.js");
const port = process.env.PORT || 3000;
const Error = require('./middleware/errorHandler.js')

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(router);
app.use(Error)
// app.get("/", (req, res) => {
//   res.status(200).send("Hallo kita masuk ke ecommerce");
// });

app.listen(port, () => {
  console.log(`we are at http://localhost:${port}`);
});
