// server.js
// where your node app starts

// init project
const express = require("express"),
  app = express(),
  cors = require("cors"),
  sass = require("node-sass"),
  fs = require("fs"),
  ejs = require("ejs");

app.use(cors());

// we've started you off with Express,
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

app.get("*", (req, res, next) => {
  //console.log(req.originalUrl);
  next();
  //res.redirect("https://example.com");
});

const genHtml = input => {
  let html = "";
  Object.keys(input).forEach(id => {
    html += `<item data-id="${id}">`;
    const content = input[id].content;
    const vars = input[id].vars;
    Object.keys(content).forEach(prop => {
      const c = content[prop]; //content
      //normal prop
      if (prop !== "vars") {
        html += `<prop name="${prop}"><c>${c}</c></prop>`;
      }
    });
    //give vars
    if (vars) {
      html += `<div class="notranslate">`;

      vars.forEach((val, i) => {
        html += `<v>${val}</v>`;
      });

      html += `</div>`;
    }
  });
  return html;
};

/*<item data-id="nav_home">
  <prop name="text"><t>Homepage</t></prop>
  <div class="notranslate">
    <v>cool</v>
  </div>
</item>*/

const exData = genHtml({
  nav_home: {
    content: {
      text: "Homepage",
      title: "This is a 🌿💮 test"
    },
    
  }
});

//TRANSPILE es6 js to es5
const es6tr = require("es6-transpiler");
const transpile = file => {
  var result = es6tr.run({ filename: file });
  const ext = ".es5";
  const output = `${file.replace("/build", "/public")}`;
  //.replace(".js", `.${ext.slice(1)}`)}.js`;

  console.log(`🔥Transpiling ${file} to ${output}...`);
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

//compile sass function
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
  compile(`${__dirname}/build/css/custom.css`);
  compile(`${__dirname}/build/css/bs-theme.css`);
  compile(`${__dirname}/build/css/loader.css`);
}
app.set("view engine", "ejs");
// http://expressjs.com/en/starter/basic-routing.html
app.get("/", (req, res) => {
  //res.sendFile(__dirname + "/views/index.html");
  ejs.renderFile(
    `${__dirname}/views/index.ejs.html`,
    { data: exData },
    (err, str) => {
      err ? console.warn(err) : res.send(str);
    }
  );
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
