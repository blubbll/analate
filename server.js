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

const bon = `🍬`;
const genHtml = input => {
  let html = "";
  Object.keys(input).forEach(id => {
    html += `<item data-id="${id}">`;
    const content = input[id];
    Object.keys(content).forEach(prop => {
      const c = content[prop].c; //content
      const vars = content[prop].vars;

      html += `<div name="${prop}" title="${c}" class="notranslate">`;
      //give vars
      if (vars) {
        vars.forEach((val, i) => {
          html += `<v>${val}</v>`;
        });
      }
      html += `</div>`;
    });
    html += `</item>`;
  });
  return html;
};
//never use the word THE before a variable...
/*
<item data-id="6">
  <prop name="text">
    <t>The 🌿💮 profile of 🌿💮.</t>
    <div class="notranslate">
      <var>Twitter</var>
      <var>mdo</var>
    </div>
  </prop>
  <prop name="title">
    <t>Go to the 🌿💮 profile of 🌿💮</t>
    <div class="notranslate">
      <var>Twitter</var>
      <var>mdo</var>
    </div>
  </prop>
</item>
*/

//never use - after a var or in front of a text, also never use two vars after each other
const exData = {
  1: {
    text: { c: "This is a heading" },
    title: {
      c: `This is a ${bon} and ${bon} test`,
      vars: ["cool", "Kristall-Chicken"]
    }
  },
  2: {
    text: { c: "This is the actual text" }
  },
  3: {
    text: { c: "I am a button." },
    title: { c: `Click me hard ${bon}`, vars: ["x3"] }
  },
  4: {
    text: { c: "Sample p Element" }
  },
  5: {
    text: { c: `Sample Link to download ${bon}`, vars: ["Bootstrap"] }
  },
  6: {
    text: { c: `The ${bon} profile of ${bon}`, vars: ["Twitter", "mdo"] },
    title: { c: `Go to the ${bon} profile of ${bon}`, vars: ["Twitter", "mdo"] }
  },
  nav_home: {
    text: { c: "Homepage" },
    title: { c: `This is a ${bon} test`, vars: ["cool"] }
  },
  img_cat: {
    title: { c: `${bon}`, vars: ["Cute cat :3"] }
  },
  text_cat: {
    text: {
      c: `
Lick butt run around the house at 4 in the morning and paw at your fat belly. Swipe at owner's legs chew on cable furrier and even more furrier hairball yet rub against owner because nose is wet cat not kitten around . Kitty pounce, trip, faceplant you didn't see that no you didn't definitely didn't lick, lick, lick, and preen away the embarrassment plan steps for world domination leave hair on owner's clothes russian blue. Weigh eight pounds but take up a full-size bed knock dish off table head butt cant eat out of my own dish. Playing with balls of wool jump launch to pounce upon little yarn mouse, bare fangs at toy run hide in litter box until treats are fed and that box? i can fit in that box yet chase after silly colored fish toys around the house, but make plans to dominate world and then take a nap meow and walk away sleep all day whilst slave is at work, play all night whilst slave is sleeping. Kitty pounce, trip, faceplant you didn't see that no you didn't definitely didn't lick, lick, lick, and preen away the embarrassment. I is not fat, i is fluffy dont wait for the storm to pass, dance in the rain. Eat a plant, kill a hand fight own tail and cat slap dog in face cats are the world and make plans to dominate world and then take a nap for no, you can't close the door, i haven't decided whether or not i wanna go out. Lick the other cats hunt by meowing loudly at 5am next to human slave food dispenser. Ask to go outside and ask to come inside and ask to go outside and ask to come inside i shall purr myself to sleep so stretch put butt in owner's face stare out cat door then go back inside meow meow we are 3 small kittens sleeping most of our time, we are around 15 weeks old i think, i don’t know i can’t count. Stuff and things more napping, more napping all the napping is exhausting for scratch the furniture meow in empty rooms. I hate cucumber pls dont throw it at me. Sniff all the things trip on catnip for lick butt and make a weird face catty ipsum, for i shredded your linens for you yet spit up on light gray carpet instead of adjacent linoleum. Adventure always i want to go outside let me go outside nevermind inside is better going to catch the red dot today going to catch the red dot today leave fur on owners clothes but catch mouse and gave it as a present or hiiiiiiiiii feed me now purr purr purr until owner pets why owner not pet me hiss scratch meow. Drool murf pratt ungow ungow. Howl on top of tall thing good now the other hand, too. Meow all night having their mate disturbing sleeping humans destroy house in 5 seconds mice i hate cucumber pls dont throw it at me. Spread kitty litter all over house cough furball into food bowl then scratch owner for a new one mewl for food at 4am. Spread kitty litter all over house sleep in the bathroom sink instantly break out into full speed gallop across the house for no reason but caticus cuteicus or chase dog then run away lick master's hand at first then bite because im moody.
${fs.readFileSync(__dirname + "/old/test.html")}
`
    }
  },
  nav_features: {
    text: { c: `Features ${bon}`, vars: [":3"] },
    title: { c: "Go to the Features-Page" }
  },
  nav_test: {
    text: { c: `Test ${bon}`, vars: [":3"] },
    title: { c: "This is a Navigation-test" }
  }
};



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
    { data: genHtml(exData) },
    (err, str) => {
      err ? console.warn(err) : res.send(str);
    }
  );
});

app.get("/ex", (req, res) => {
  res.json(exData)
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
