const { DEBUG, $, needRender, initRender, tippy } = window;

//localized "Translating..."-msg
$("placeholder.loading").text($("verb-0").attr("title"));

document.addEventListener("DOMContentLoaded", event => {
  setTimeout(console.clear, 499);

  setTimeout(() => {
    initRender();

    let Content = window.CONTENT;

    const gt = window.wasTranslated();

    Object.keys(Content).forEach(id => {
      const d = gt ? Content[id].translated : Content[id].original; //data
      const el = $(`#${id}`);
      DEBUG && console.debug(`Filling el #${id}:`, el);

      el.text(d.text);
      el.attr("title", d.title); //title
      el.attr("alt", d.alt); //alt tag  for img etc
      el.attr("placeholder", d.placeholder); //placeholder

      //done
      setTimeout(() => {
        $("#content-wrapper placeholder").removeClass("loading");
        $("gtp .loader").css({ display: "none" });
      }, 99);
    });
  }, 999);
});
