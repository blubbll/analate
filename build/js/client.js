const { $, needRender, initRender, tippy } = window;

document.addEventListener("DOMContentLoaded", function(event) {
  setTimeout(console.clear, 499);

  setTimeout(() => {
    initRender();

    let Content = window.CONTENT;
    Object.keys(Content).forEach(id => {
      const types = Content[id];

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
