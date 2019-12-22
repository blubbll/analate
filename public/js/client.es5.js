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

var $ = window.$, fixLink = window.fixLink, tippy = window.tippy;

$("nav-link>.notranslate").each(function(v, el)  {
  fixLink(el);
});

/* tooltips */
tippy("a", {
  content: "I'm a Tippy tooltip!",
  theme: "test"
});

var jQuery = window.jQuery;
