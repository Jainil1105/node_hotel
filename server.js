const express = require("express");
const app = express();
const db = require("./db");
const bodyParser = require("body-parser");
app.use(bodyParser.json()); //store data to req.body

app.get("/", function (req, res) {
  res.send("welcome to our hotel");
});

const personroutes = require('./routes/personroutes')
const menuitemroutes = require('./routes/menuitemroutes')

app.use('/person', personroutes)
app.use('/menuitem', menuitemroutes)

app.listen(3000, () => {
  console.log("listnig on the port 3000");
});
 
