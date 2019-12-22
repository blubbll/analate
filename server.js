// server.js
// where your node app starts

// init project
const express = require("express"),
  app = express(),
  cors = require("cors");

app.use(cors());

// we've started you off with Express,
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

app.get("*", (req, res, next) => {
  console.log(req.originalUrl);
  next();
  //res.redirect("https://example.com");
});



// http://expressjs.com/en/starter/basic-routing.html
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

// http://expressjs.com/en/starter/basic-routing.html
app.get("/link", (req, res) => {
  res.contentType("text/html;")
  res.write(`<html><body><a href="https://analate.glitch.me/test">test</a></body></html>`)
  res.end();
});

// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  console.log("Your app is listening on port " + listener.address().port);
});
