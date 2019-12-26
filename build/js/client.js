
const { $, fixRender, initRender, tippy } = window;

document.addEventListener("DOMContentLoaded", function(event) {
  setTimeout(console.clear, 499);

  setTimeout(() => {
    fixRender();
    initRender();

    let Content = window.CONTENT;
    Object.keys(Content).forEach(key => {
      const val = Content[key];
      Object.keys(Content[key]).forEach(key => {
        const d = val[key]; //data
        const el = $(`#${key}`);
        console.debug(`Filling el #${key}:`, el);
        el.text(d.c); //d.c = content
        el.attr("title", d.t); //title
        el.attr("alt", d.a); //alt tag  for img etc
        el.attr("placeholder", d.p); //placeholder
      });
    });
  }, 999);
});
