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
    var output = (input.text() || "").trim().replace(/(\r\n|\n|\r)/gm, ""); //uwu linebreaks are bwad
    //refix specific chars
    //.replace(/🍩/gi, ".")
    //.replace(/🍬/gi, ",")
    //(need to do this as certain languages fuck up commas)
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
      var vars = [];
      var id = $(item).attr("data-id");

      $.each($(item).find("prop"), function(i, el)  {
        [
          (ELEMENT.original[("" + ($(el).attr("name")))] = sanitize(
            $(el).find(".google-src-text")
          ))
        ];

        gt && [
          (ELEMENT.translated[("" + ($(el).attr("name")))] = sanitize(
            $(el).find(".notranslate")
          ))
        ];
      });
      $.each($(item).find("variable"), function(i, el)  {
        vars.push($(el).text());
      });
      var bon = "🍬";

      gt //was translated
        ? Object.keys(ELEMENT.original).forEach(function(key ) {
            var val = ELEMENT.translated[key];
            if (val.includes(bon)) {
              var changed = ELEMENT.translated[key];
              vars.forEach(function(_val, _key)  {
                changed = changed.replace(bon, _val);
              });

              ELEMENT.original[key] = changed;
              ELEMENT.translated[key] = changed;
            }
          })
        : //without google translate
          Object.keys(ELEMENT.original).forEach(function(key ) {
            var val = ELEMENT.original[key];
            if (val.includes(bon)) {
              var changed = ELEMENT.original[key];
              vars.forEach(function(_val, _key)  {
                changed = changed.replace(bon, _val);
              });

              ELEMENT.original[key] = changed;
            }
          });

      //put element into correct id
      Content[id] = ELEMENT;
    });

    !gt && [(document.title = "NOT TRANSLATED")];
    console.log(Content);

    cb && cb();
  };
}
