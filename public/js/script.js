//💜//i love you monad
var $ = window.$, tippy = window.tippy, alert = window.alert;

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
    var output = (input.text() || "")
      .trim()
      .replace(/(\r\n|\n|\r)/gm, "") //uwu linebreaks are bwad
      //refix specific chars
      .replace(/🍩/gi, ".")
      .replace(/🍬/gi, ",")
    //(need to do this as certain languages fuck up commas)
    !cut && input.remove();
    console.log(output);
    return output;
  };

  window.fixRender = function(cb ) {
    $.each($("[x-ct]"), function(i, el)  {
      // console.log(el);
    });
  };

  window.initRender = function(cb ) {
    var Content;
    console.log($("data#content>.notranslate").length);
    if ($("data#content>.notranslate").length) {
      Content = window.CONTENT = withNormalizedKeys({
        original: JSON.parse(
          sanitize($("data#content>.notranslate>.google-src-text"))
        ),
        translated: JSON.parse(sanitize($("data#content>.notranslate")))
      });
    } else {
      document.title = "NOT TRANSLATIN";

      Content = window.CONTENT = {
        original: JSON.parse(sanitize($("data#content"))),
        translated: false
      };
    }

    cb && cb();
    console.log(Content);
  };
}
