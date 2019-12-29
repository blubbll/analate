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
  var withNormalizedKeys = function(o ) {
    return Object.entries(o)
      .map(function(value)  {var key = value[0], value = value[1];return [key.replace(/\s+/g, ""), value]})
      .reduce(function(result, value)  {var normalizedKey = value[0], value = value[1];
        result[normalizedKey] =
          value && typeof value === "object"
            ? withNormalizedKeys(value)
            : value;
        return result;
      }, {});
  };

  var sanitize = function(input, cut)  {
    var output = (input.text() || "").trim().replace(/(\r\n|\n|\r)/gm, ""); //uwu linebreaks are bwad
    !cut && input.remove();
    //console.log(output);
    return output;
  };

  window.wasTranslated = function()  {
    return $("#google-infowindow").length > 0;
  };

  window.initRender = function(original ) {
    // console.log($("data#content>.notranslate").length);

    var gt = window.wasTranslated();

    var Content = (window.CONTENT = {});

    $.each($("data#content>item"), function(i, item)  {
      var ELEMENT = { original: {}, translated: {} };
      var id = $(item).attr("data-id");

      $.each($(item).find("prop"), function(i, prop)  {
        
        var VARS = [];
        
        //init
        ELEMENT.original[("" + ($(prop).attr("name")))] = { c: "" };
        ELEMENT.translated[("" + ($(prop).attr("name")))] = { c: "" };

        //set original
        [
          (ELEMENT.original[("" + ($(prop).attr("name")))].c = sanitize(
            gt ? $(prop).find(".google-src-text") : $(prop).find("c")
          ))
        ];

        //set translated
        gt && [
          (ELEMENT.translated[("" + ($(prop).attr("name")))].c = sanitize(
            $(prop).find(".notranslate")
          ))
        ];

        //push vars
        $.each($(prop).find("v"), function(i, v)  {
          VARS.push($(v).text());
        });

        //vars
        var bon = ("🌿💮");
        Object.keys(ELEMENT.original).forEach(function(key ) {
          ELEMENT.original[("" + ($(prop).attr("name")))].vars.forEach(function(_var ) {
            //content
            var c = ELEMENT.original[key].c;

            //if text includes variable
            if (c.includes(bon)) {
              //replace in original
              ELEMENT.original[key].c = c.replace(bon, _var);
              //replace in translated
              gt && [
                (ELEMENT.translated[key].c = ELEMENT.translated[key].c.replace(
                  bon,
                  _var
                ))
              ];
            }
          });
        });
      });

      //put element into correct id
      Content[id] = ELEMENT;
    });

    !gt && [(document.title = "NOT TRANSLATED")];
    DEBUG && console.debug(Content);
  };
}
