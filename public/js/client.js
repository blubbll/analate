//💜//i love you monad

var $ = window.$, fixRender = window.fixRender, initRender = window.initRender, tippy = window.tippy;

document.addEventListener("DOMContentLoaded", function(event) {
  setTimeout(console.clear, 499);

  setTimeout(function()  {
    fixRender();
    initRender();

   /* let Content = window.CONTENT;
    Object.keys(Content).forEach(key => {
      const val = Content[key];
      Object.keys(Content[key]).forEach(key => {
        const d = val[key]; //data
        const el = $(`#${key}`);
        console.debug(`Filling el #${key}:`, el);
        el.text(d.text); //d.c = content
        el.attr("title", d.title); //title
        el.attr("alt", d.alt); //alt tag  for img etc
        el.attr("placeholder", d.placeholder); //placeholder
      });
    });*/
  }, 999);
});
