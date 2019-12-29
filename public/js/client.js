//💜//i love you monad
var fetch = window.fetch, alert = window.alert, DEBUG = window.DEBUG, $ = window.$, needRender = window.needRender, initRender = window.initRender, tippy = window.tippy;

//localized "Translating..."-msg
$("placeholder.loading").text($("verb-0").attr("title"));

document.addEventListener("DOMContentLoaded", function(event ) {
  setTimeout(console.clear, 499);

  setTimeout(function()  {
    DEBUG && console.log(("Requested language is:"), $.params.tl);

    fetch($.params.u)
      .then(function(res ) {return res.text()})
      .then(function(t ) {
        initRender(t);

        var Content = window.CONTENT;
        var gt = window.wasTranslated();

        Object.keys(Content).forEach(function(id ) {
          var d = gt ? Content[id].translated : Content[id].original; //data
          var el = $(("#" + id));
          DEBUG && console.debug((("Filling el #" + id) + ":"), el);

          el.text(d.text);
          el.attr("title", d.title); //title
          el.attr("alt", d.alt); //alt tag  for img etc
          el.attr("placeholder", d.placeholder); //placeholder

          //done
          setTimeout(function()  {
            $("#content-wrapper placeholder").removeClass("loading");
            $("gtp .loader").css({ display: "none" });
          }, 99);
        });
      });
  }, 999);
});
