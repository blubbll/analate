//💜//i love you monad
var $ = window.$, needRender = window.needRender, initRender = window.initRender, tippy = window.tippy;

document.addEventListener("DOMContentLoaded", function(event) {
  setTimeout(console.clear, 499);

  setTimeout(function()  {
    initRender();

    var Content = window.CONTENT;
    Object.keys(Content).forEach(function(id ) {
      var types = Content[id];

      console.log(types.translated)
      
     /*   const d = types[type]; //data
        const el = $(`#${id}`);
        console.debug(`Filling el #${id}:`, el);

        console.log(type)
        
        el.text(d.text);

        el.attr("title", d.title); //title
        el.attr("alt", d.alt); //alt tag  for img etc
        el.attr("placeholder", d.placeholder); //placeholder
      */
    });
  }, 999);
});
