const { $, tippy, alert } = window;

//q
{
  $.params = {};
  $.updateQuery = () => {
    var match,
      pl = /\+/g, // Regex for replacing addition symbol with a space
      search = /([^&=]+)=?([^&]*)/g,
      decode = s => {
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
  const withNormalizedKeys = o => {
    return Object.entries(o)
      .map(([key, value]) => [key.replace(/\s+/g, ""), value])
      .reduce((result, [normalizedKey, value]) => {
        result[normalizedKey] =
          value && typeof value === "object"
            ? withNormalizedKeys(value)
            : value;
        return result;
      }, {});
  };

  const sanitize = (input, cut) => {
    const output = (input.text() || "").trim().replace(/(\r\n|\n|\r)/gm, ""); //uwu linebreaks are bwad
    //refix specific chars
    //.replace(/🍩/gi, ".")
    //.replace(/🍬/gi, ",")
    //(need to do this as certain languages fuck up commas)
    !cut && input.remove();
    //console.log(output);
    return output;
  };

  window.fixRender = cb => {
    $.each($("[x-ct]"), (i, el) => {
      // console.log(el);
    });
  };

  window.initRender = cb => {
    // console.log($("data#content>.notranslate").length);

    let Content = (window.CONTENT = {});

    $.each($("data#content>item"), (i, el) => {
      const ELEMENT = {};
      const vars = [];
      $.each($(el).find("prop"), (i, el) => {
        ELEMENT.original = {
          [`${$(el).attr("name")}`]: sanitize($(el).find(".google-src-text"))
        };
        ELEMENT.translated = {
          [`${$(el).attr("name")}`]: sanitize($(el).find(".notranslate"))
        };
      });
      $.each($(el).find("variable"), (i, el) => {
        vars.push($(el).text());
      });
      const bon = "🍬";

      Object.keys(ELEMENT.original).forEach(key => {
        const val = ELEMENT.translated[key];
        if (val.includes(bon)) {
          const changed = ELEMENT.translated[key].replace(bon, vars[0]);
          ELEMENT.original[key] = changed;
          ELEMENT.translated[key] = changed;
          vars.splice(1); //remove from arr
        }
      });

      //console.log(ELEMENT);
      Content[$(el).attr("data-id")] = ELEMENT;
     
    });

     console.log(Content);
    /* if ($("data#content>.notranslate").length) {
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
    }*/

    cb && cb();
    console.log(Content);
  };
}
