const express = require("express");
const bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var fs = require("fs");

const path = require("path");
const app = express();
const port = 3000;

// app.use(express.static("todo-app"));
app.use(express.static(__dirname + "/"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// To add new task
app.post("/addTask", urlencodedParser, (req, res) => {
  console.log(req.body.Task);
  var task = req.body.Task;

  // reading JSON file

  fs.readFile("./public/task.json", "utf8", (err, jsonString) => {
    if (err) {
      console.log("Error reading file from disk:", err);
      return;
    }
    try {
      const customer = JSON.parse(jsonString);
      //   console.log("Tasks are :", customer.Tasks); // => "Customer address is: Infinity Loop Drive"
      customer.Tasks.push(task);
      //   console.log("After update Tasks are :", customer.Tasks);
      fs.writeFile("./public/task.json", JSON.stringify(customer), () => {});
      //   res.send(`${customer.Tasks}`);
      res.redirect("/");
      //   window.location.href = "http://localhost/";
    } catch (err) {
      console.log("Error parsing JSON string:", err);
    }
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
