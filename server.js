// server.js
// where your node app starts

// init project
const express = require("express"),
  app = express(),
  cors = require("cors"),
  sass = require("node-sass"),
  fs = require("fs");

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

//SASS
{
  const c = {
    in: `${__dirname}/public/css/tippy-theme.sass.css`
  };
  fs.writeFileSync(
    c.in.replace(".sass", ""),
    sass
      .renderSync({
        data: fs.readFileSync(c.in, "utf8")
      })
      .css.toString("utf8")
  );
}

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

// http://expressjs.com/en/starter/basic-routing.html
app.get("/link", (req, res) => {
  res.contentType("text/html;");
  res.write(
    `<html><body><a href="https://analate.glitch.me/test">test</a></body></html>`
  );
  res.end();
});

// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  console.log("Your app is listening on port " + listener.address().port);
});
