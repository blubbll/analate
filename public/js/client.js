//💜//i love you monad
var fetch = window.fetch, alert = window.alert, DEBUG = window.DEBUG, $ = window.$, needRender = window.needRender, initRender = window.initRender, tippy = window.tippy;

//localized "Translating..."-msg
$("placeholder").text($("verb-0").attr("title"));

document.addEventListener("DOMContentLoaded", function(event ) {
  setTimeout(console.clear, 499);

  setTimeout(function()  {
    DEBUG && console.log(("Requested language is:"), $.params.tl);

    if ($.params.sl === "auto") {
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
       $("html").attr("state", "loading-held");
      var autoSelect = $("verb-2").attr("title");
      $("placeholder").html(
        (("<span style=\"color: red;\">" + ($("verb-1").attr("title"))) + ("</span>\
\n         <u>" + autoSelect) + "</u>"));
    }
  }, 999);
});
