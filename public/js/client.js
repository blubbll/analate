//💜//i love you monad
var $ = window.$, needRender = window.needRender, initRender = window.initRender, tippy = window.tippy;

document.addEventListener("DOMContentLoaded", function(event) {
  setTimeout(console.clear, 499);

  setTimeout(function()  {
    initRender();

    var Content = window.CONTENT;

    var gt = window.wasTranslated();

    Object.keys(Content).forEach(function(id ) {
      var d = gt ? Content[id].translated : Content[id].original; //data
      var el = $(("#" + id));
      console.debug((("Filling el #" + id) + ":"), el);

      el.text(d.text);

      el.attr("title", d.title); //title
      el.attr("alt", d.alt); //alt tag  for img etc
      el.attr("placeholder", d.placeholder); //placeholder
    });
  }, 999);
});
