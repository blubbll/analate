//💜//i love you monad
var DEBUG = window.DEBUG, $ = window.$, tippy = window.tippy, alert = window.alert;

//q
{
  $.params = {};
  $.updateQuery = function()  {
    var match,
      pl = /\+/g, // Regex for replacing addition symbol with a space
      search = /([^&=]+)=?([^&]*)/g,
      decode = function(s ) {
        return decodeURIComponent(s.replace(pl, " "));
      },
      query = window.location.search.substring(1);
    while ((match = search.exec(query)))
      $.params[decode(match[1])] = decode(match[2]);
  };
  window.onpopstate = $.updateQuery;
  $.updateQuery();
}

{
  window.DEBUG = 1;
}
{
  var sanitize = function(input, cut)  {
    var output = (input || "").trim().replace(/(\r\n|\n|\r)/gm, ""); //uwu linebreaks are bwad
    //console.log(output);
    return output;
  };

  window.wasTranslated = function()  {
    return $("#google-infowindow").length > 0;
  };

  window.initRender = function(original, cb)  {
    // console.log($("data#content>.notranslate").length);

    var gt = window.wasTranslated();

    var Content = (window.CONTENT = {});

    var ODATA = JSON.parse(original);
    $.each($("data#content>item"), function(i, item)  {
      var id = $(item).attr("data-id");
      var ELEMENT = { original: ODATA[id], translated: {} };

      $.each($(item).find("div.notranslate"), function(i, prop)  {
        //init
        ELEMENT.translated[("" + ($(prop).attr("name")))] = { c: "", vars: [] };

        //push vars
        $.each($(prop).find("v"), function(i, v)  {
          ELEMENT.translated[("" + ($(prop).attr("name")))].vars.push($(v).text());
        });

        //set translated
        gt && [
          (ELEMENT.translated[("" + ($(prop).attr("name")))].c = sanitize(
            $(prop).attr("title")
          ))
        ];

        var bon = ("🍬");
        gt &&
          Object.keys(ELEMENT.translated).forEach(function(key ) {
            ELEMENT.translated[("" + ($(prop).attr("name")))].vars.forEach(function(_var ) {
              //content
              var c = ELEMENT.translated[key].c;

              //if text includes variable
              if (c.includes(bon)) {
                //replace in translated
                ELEMENT.translated[key].c = c.replace(bon, _var);
              }
            });
          });
      });

      //put element into correct id
      Content[id] = ELEMENT;
    });

    !gt && [(document.title = "NOT TRANSLATED")];
    cb && cb();
    DEBUG && console.debug(Content);
  };
}

//less tracking
{
  var t = window._setupIW;
  window._setupIW = function()  {
    t();
    console.log("infowindow was triggered");
  };
}
window._csi = function(from, to, u)  {
  console.log("nope", { from: from, to: to, u: u });
};
