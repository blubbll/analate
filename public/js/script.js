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
    var output = (input.text() || "").trim().replace(/(\r\n|\n|\r)/gm, ""); //uwu linebreaks are bwad

    !cut && input.remove();
    //console.log(output);
    return output;
  };

  window.wasTranslated = function()  {
    return $("#google-infowindow").length > 0;
  };

  window.initRender = function(cb ) {
    // console.log($("data#content>.notranslate").length);

    var gt = window.wasTranslated();

    var Content = (window.CONTENT = {});

    $.each($("data#content>item"), function(i, item)  {
      var ELEMENT = { original: {}, translated: {} };
      var id = $(item).attr("data-id");

      $.each($(item).find("prop"), function(i, prop)  {
        //stitch original START
        var stitchO = "";
        $.each($(prop).find(".google-src-text"), function(i, tex)  {
          stitchO += (" " + ($(tex).text()));
        });
        $(prop)
          .find(".google-src-text")
          .text(stitchO.slice(1));
        //stitch original END

        //init
        ELEMENT.original[("" + ($(prop).attr("name")))] = { c: "", vars: [] };
        ELEMENT.translated[("" + ($(prop).attr("name")))] = { c: "", vars: [] };

        //set original
        [
          (ELEMENT.original[("" + ($(prop).attr("name")))].c = sanitize(
            gt ? $(prop).find(".google-src-text") : $(prop).find("c")
          ))
        ];

        //push vars
        $.each($(prop).find("v"), function(i, v)  {
          ELEMENT.original[("" + ($(prop).attr("name")))].vars.push($(v).text());
          ELEMENT.translated[("" + ($(prop).attr("name")))].vars.push($(v).text());
        });

        //stitch translated START
        var stitchT = "";
        $.each($(prop).find(".notranslate"), function(i, tex)  {
          //skip actual vars
          !$(tex).hasClass("v") && [(stitchT += (" " + ($(tex).text())))];
        });
        $(prop)
          .find(".notranslate")
          .text(stitchT.slice(1));
        //stitch translated END

        //set translated
        gt && [
          (ELEMENT.translated[("" + ($(prop).attr("name")))].c = sanitize(
            $(prop).find(".notranslate")
          ))
        ];

        //vars original
        var bon = ("🃁🃏");
        Object.keys(ELEMENT.original).forEach(function(key ) {
          ELEMENT.original[("" + ($(prop).attr("name")))].vars.forEach(function(_var ) {
            //content
            var c = ELEMENT.original[key].c;

            //if text includes variable
            if (c.includes(bon)) {
              //replace in original
              ELEMENT.original[key].c = c.replace(bon, _var);
            }
          });
        });

        //vars translated

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
