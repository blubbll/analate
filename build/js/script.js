const { DEBUG, $, tippy, alert } = window;

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
  window.DEBUG = 1;
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
    !cut && input.remove();
    //console.log(output);
    return output;
  };

  window.wasTranslated = () => {
    return $("#google-infowindow").length > 0;
  };

  window.initRender = original => {
    // console.log($("data#content>.notranslate").length);

    const gt = window.wasTranslated();

    let Content = (window.CONTENT = {});

    $.each($("data#content>item"), (i, item) => {
      const ELEMENT = { original: {}, translated: {}, vars: [] };
      const id = $(item).attr("data-id");

      $.each($(item).find("prop"), (i, el) => {
        $.each($(el).find("var"), (i, Var) => {
          ELEMENT.vars.push($(Var).text());
        });

        [
          (ELEMENT.original[`${$(el).attr("name")}`] = sanitize(
            gt ? $(el).find(".google-src-text") : $(el).find("t")
          ))
        ];

        gt && [
          (ELEMENT.translated[`${$(el).attr("name")}`] = sanitize(
            $(el).find(".notranslate")
          ))
        ];

        //vars
        const bon = `🌿💮`;
        Object.keys(ELEMENT.original).forEach(key => {
          ELEMENT.vars.forEach(_var => {
            //content
            const c = ELEMENT.original[key];

            //if text includes variable
            if (c.includes(bon)) {
              //replace in original
              ELEMENT.original[key] = c.replace(bon, _var);
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

  };
}
