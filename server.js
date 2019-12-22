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

//TRANSPILE
const es6tr = require("es6-transpiler");

const transpile = file => {
  var result = es6tr.run({ filename: file });
  const ext = ".es5";
  const output = `${file.replace("/build", "/public")}`;
  //.replace(".js", `.${ext.slice(1)}`)}.js`;

  console.log(`🔥Transpilinmg ${file} to ${output}...`);
  if (result.src)
    [
      fs.writeFileSync(
        output,
        `//💜//i love you monad\r\n${result.src.replace(/\0/gi, "")}`
      ),
      console.log(`✔️Transpiled ${file} to ${output}!`)
    ];
  else console.warn(`⚠️Error at transpiling of file ${file}:`, result);
};

const compile = file => {
  const output = file.replace("/build/", "/public/");
  console.log(`🔥Compiling ${file} to ${output}...`);
  fs.writeFileSync(
    output,
    sass
      .renderSync({
        data: fs.readFileSync(file, "utf8")
      })
      .css.toString("utf8")
  );
  console.log(`✔️Compiled ${file} to ${output}!`);
};

if (process.env.PROJECT_NAME) {
  transpile(`${__dirname}/build/js/script.js`);
  transpile(`${__dirname}/build/js/client.js`);
  compile(`${__dirname}/build/css/tippy-theme.css`);
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
