const { $, needRender, initRender, tippy } = window;

document.addEventListener("DOMContentLoaded", function(event) {
  setTimeout(console.clear, 499);

  setTimeout(() => {
    initRender();

    let Content = window.CONTENT;

    const gt = window.wasTranslated();

    Object.keys(Content).forEach(id => {
      const d = gt ? Content[id].translated : Content[id].original; //data
      const el = $(`#${id}`);
      console.debug(`Filling el #${id}:`, el);

      el.text(d.text);

      el.attr("title", d.title); //title
      el.attr("alt", d.alt); //alt tag  for img etc
      el.attr("placeholder", d.placeholder); //placeholder
    });
  }, 999);
});
