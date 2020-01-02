const { fetch, alert, DEBUG, $, needRender, initRender, tippy } = window;

//localized "Translating..."-msg
$("placeholder").text($("verb-0").attr("title"));

document.addEventListener("DOMContentLoaded", event => {
  setTimeout(console.clear, 499);

  setTimeout(() => {
    DEBUG && console.log(`Requested language is:`, $.params.tl);

    const oLanguage = $("verb-3").attr("title");
    const oLanguageShort = $("verb-3").attr("short");

    if ($.params.sl === "auto" || $.params.sl === oLanguageShort) {
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

        //done
        setTimeout(() => {
          $("html").attr("state", "loading-done");
          DEBUG && console.debug("Translation done");
        }, 99);
      };

      const u = ($.params.u || location.href).split("?")[0];
      fetch(`${u}/ex`)
        .then(res => res.text())
        .then(t => {
          initRender(t, done);
        });
    } else {
      $("html").attr("state", "loading-held");
      const autoSelect = $("verb-2").attr("title");
      $("placeholder").html(`
       <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25" height="150" width="150"><path d="M12 0l8 9h-6v15h-4v-15h-6z"></path></svg>
        <span style="color: red;">${$("verb-1").attr("title")}</span>
            <i>${autoSelect}</i>
            <i>${oLanguage}</i>
        `);
    }
  }, 999);
});
