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
    console.log(input.text())
    var output = (input.text() || "")
      .trim()
      .replace(/\s·|·\s\s/gi, ".")
      .replace(/،/gi, ",") //remove shitty arabic commas
     // .replace(/""/gi, "\"") //wtf azerbaidchan
   // !cut && input.remove();
    return output;
  };

  window.fixRender = function(cb) {
    
    $.each($("[x-ct]"), function(i, el) {
     // console.log(el);
    })
    
  }
  
  window.initRender = function(cb ) {
    var Content;
    if ($("data#content>.notranslate").length) {
      Content = window.CONTENT = withNormalizedKeys({
        original: JSON.parse(
          sanitize($("data#content>.notranslate>.google-src-text"))
        ),
        translated: JSON.parse(sanitize($("data#content>.notranslate")))
      });
    } else {
      
      document.title="NOT TRANSLATIN"
      
      Content = window.CONTENT = {
        original: JSON.parse(sanitize($("data#content"))),
        translated: false
      };
    }

    cb && cb();
    console.log(Content);

  };
}
