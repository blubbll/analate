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

const { $, fixLink, tippy } = window;

document.addEventListener("DOMContentLoaded", function(event) {
  setTimeout(console.clear, 499);

  setTimeout(() => {
    $("nav-link>.notranslate").each((v, el) => {
      fixLink(el);
    });
  }, 999);
});
