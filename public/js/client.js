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

const { fixLink, tippy } = window;

$("nav-link>.notranslate").each((v, el) => {
  fixLink(el);
});

/* tooltips */
tippy("a", {
  content: "I'm a Tippy tooltip!",
  theme: "test"
});

const { jQuery } = window;