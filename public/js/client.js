//💜//i love you monad
//console.log(location.href);
/*const linkTemplate = $("#templateLink").attr("href");
const nav = t => {
  event.preventDefault();
  const host = "https://analate.glitch.me";
  const toLink = $(t)
    .attr("nav-href")
    .replace("~", host);
  const toLinkFramed = linkTemplate.replace($.params.u, toLink);
  //location.replace(toLinkFramed);
  //window.top
  //location.href = toLinkMasted;
  //history.replaceState(null, null, toLink);

};*/

var $ = window.$, initRender = window.initRender, tippy = window.tippy;

document.addEventListener("DOMContentLoaded", function(event) {
  setTimeout(console.clear, 499);

  setTimeout(function()  {
    initRender();

    var Content = window.CONTENT;
    Object.keys(Content).forEach(function(key ) {
      var val = Content[key];
      Object.keys(Content[key]).forEach(function(key ) {
        var d = val[key]; //data
        var el = $(("#" + key));
        console.debug((("Filling el #" + key) + ":"), el);
        el.text(d.c); //d.c = content
        el.attr("title", d.t); //title
        el.attr("alt", d.a); //alt tag  for img etc
        el.attr("placeholder", d.p); //placeholder
      });
    });
  }, 999);
});
