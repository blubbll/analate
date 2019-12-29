const { fetch, alert, DEBUG, $, needRender, initRender, tippy } = window;

//localized "Translating..."-msg
$("placeholder").text($("verb-0").attr("title"));

document.addEventListener("DOMContentLoaded", event => {
  setTimeout(console.clear, 499);

  setTimeout(() => {
    DEBUG && console.log(`Requested language is:`, $.params.tl);

    const done = () => {
      let Content = window.CONTENT;
      const gt = window.wasTranslated();

      Object.keys(Content).forEach(id => {
        const d = gt ? Content[id].translated : Content[id].original; //data
        const el = $(`#${id}`);
        DEBUG && console.debug(`Filling el #${id}:`, el);

        d.text && el.text(d.text.c);
        d.title && el.attr("title", d.title.c); //title
        d.alt && el.attr("alt", d.alt.c); //alt tag  for img etc
        d.placeholder && el.attr("placeholder", d.placeholder.c); //placeholder
      });
    };
    //done
    setTimeout(() => {
      $("html").attr("state", "loading-done");
      DEBUG && console.debug("Translation done");
    }, 99);

    $.params.u
      ? fetch($.params.u)
          .then(res => res.text())
          .then(t => {
            initRender(done);
          })
      : initRender(done);
  }, 999);
});
