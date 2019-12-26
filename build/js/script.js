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
    const output = (input.text() || "")
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

  window.fixRender = cb => {
    $.each($("[x-ct]"), (i, el) => {
      // console.log(el);
    });
  };

  window.initRender = cb => {
    let Content;
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
