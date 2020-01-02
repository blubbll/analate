//💜//i love you monad
var fetch = window.fetch, alert = window.alert, DEBUG = window.DEBUG, $ = window.$, needRender = window.needRender, initRender = window.initRender, tippy = window.tippy;

//localized "Translating..."-msg
$("placeholder").text($("verb-0").attr("title"));

document.addEventListener("DOMContentLoaded", function(event ) {
  setTimeout(console.clear, 499);

  setTimeout(function()  {
    DEBUG && console.log(("Requested language is:"), $.params.tl);

    var oLanguage = $("verb-3").attr("title");
    var oLanguageShort = $("verb-3").attr("short");

    if ($.params.sl === "auto" || $.params.sl === oLanguageShort) {
      var done = function()  {
        var Content = window.CONTENT;
        var gt = window.wasTranslated();

        Object.keys(Content).forEach(function(id ) {
          var d = gt ? Content[id].translated : Content[id].original; //data
          var el = $(("#" + id));
          DEBUG && console.debug((("Filling el #" + id) + ":"), el);

          d.text && el.text(d.text.c);
          d.title && el.attr("title", d.title.c); //title
          d.alt && el.attr("alt", d.alt.c); //alt tag  for img etc
          d.placeholder && el.attr("placeholder", d.placeholder.c); //placeholder
        });

        //done
        setTimeout(function()  {
          $("html").attr("state", "loading-done");

          window.top !== window.parent
            ? $("html").attr("state", "loading-done") //framed
            : $("html").attr("state", "loading-done-m"); //mframed

          DEBUG && console.debug("Translation done");
        }, 99);
      };

      var u = ($.params.u || location.href).split("?")[0];
      fetch((("" + u) + "/ex"))
        .then(function(res ) {return res.text()})
        .then(function(t ) {
          initRender(t, done);
        });
    } else {
      var autoSelect = $("verb-2").attr("title");
      $("placeholder").html((("\
\n       <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 25 25\" height=\"150\" width=\"150\"><path d=\"M12 0l8 9h-6v15h-4v-15h-6z\"></path></svg>\
\n        <span style=\"color: red;\">" + ($("verb-1").attr("title"))) + ("</span>\
\n            <i>" + autoSelect) + ("</i>\
\n            <i>" + oLanguage) + "</i>\
\n        "));

      window.top !== window.parent
        ? $("html").attr("state", "loading-held") //framed
        : $("html").attr("state", "loading-held-m"); //mframed
    }
  }, 999);
});
