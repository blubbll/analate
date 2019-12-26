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

const { $, initRender, tippy } = window;

document.addEventListener("DOMContentLoaded", function(event) {
  setTimeout(console.clear, 499);

  setTimeout(() => {
    initRender();

    let Content = window.CONTENT;
    Object.keys(Content).forEach(key => {
      const val = Content[key];
      Object.keys(Content[key]).forEach(key => {
        const d = val[key]; //data
        const el = $(`#${key}`);
        el.text(d.c); //d.c = content
        el.attr("title", d.t); //title
        el.attr("alt", d.a); //alt tag  for img etc
        el.attr("placeholder", d.p); //placeholder
      });
    });
  }, 999);
});
