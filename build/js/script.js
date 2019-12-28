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

  window.wasTranslated = () => {
    return $("#google-infowindow").length > 0;
  };

  window.initRender = cb => {
    // console.log($("data#content>.notranslate").length);

    const gt = window.wasTranslated();

    let Content = (window.CONTENT = {});

    $.each($("data#content>item"), (i, item) => {
      const ELEMENT = { original: {}, translated: {} };
      const vars = [];
      const id = $(item).attr("data-id");

      $.each($(item).find("prop"), (i, el) => {
        [
          (ELEMENT.original[`${$(el).attr("name")}`] = sanitize(
            gt ? $(el).find(".google-src-text") : $(el)
          ))
        ];

        gt && [
          (ELEMENT.translated[`${$(el).attr("name")}`] = sanitize(
            $(el).find(".notranslate")
          ))
        ];
      });
      $.each($(item).find("variable"), (i, el) => {
        vars.push($(el).text());
      });
      const bon = "🍬";

      gt //was translated
        ? Object.keys(ELEMENT.original).forEach(key => {
            const val = ELEMENT.translated[key];
            if (val.includes(bon)) {
              let changed = ELEMENT.translated[key];
              vars.forEach((_val, _key) => {
                changed = changed.replace(bon, _val);
              });

              ELEMENT.original[key] = changed;
              ELEMENT.translated[key] = changed;
            }
          })
        : //without google translate
          Object.keys(ELEMENT.original).forEach(key => {
            const val = ELEMENT.original[key];
            if (val.includes(bon)) {
              let changed = ELEMENT.original[key];
              vars.forEach((_val, _key) => {
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
