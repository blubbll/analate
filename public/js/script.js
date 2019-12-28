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

  window.initRender = function(cb ) {
    // console.log($("data#content>.notranslate").length);

    var gt = window.wasTranslated();

    var Content = (window.CONTENT = {});

    $.each($("data#content>item"), function(i, item)  {
      var ELEMENT = { original: {}, translated: {}, vars: [] };
      var id = $(item).attr("data-id");

      $.each($(item).find("prop"), function(i, el)  {
        $.each($(el).find("var"), function(i, Var)  {
          ELEMENT.vars.push($(Var).text());
        });

        [
          (ELEMENT.original[("" + ($(el).attr("name")))] = sanitize(
            gt ? $(el).find(".google-src-text") : $(el).find("t")
          ))
        ];

        gt && [
          (ELEMENT.translated[("" + ($(el).attr("name")))] = sanitize(
            $(el).find(".notranslate")
          ))
        ];

        //vars
        var bon = "⚛";
        Object.keys(ELEMENT.original).forEach(function(key ) {
          ELEMENT.vars.forEach(function(_var ) {
            var t = ELEMENT.original[key];

            //if text includes variable
            if (t.includes(bon)) {
              //replace in original
              ELEMENT.original[key] = t.replace(bon, _var);
              //replace in translated
              gt && [
                (ELEMENT.translated[key] = ELEMENT.translated[key].replace(
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

    cb && cb();
  };
}
