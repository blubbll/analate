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
      const ELEMENT = { original: {}, translated: {} };
      const id = $(item).attr("data-id");

      $.each($(item).find("prop"), (i, prop) => {
        //stitch original START
        let stitchO = "";
        $.each($(prop).find(".google-src-text"), (i, tex) => {
          stitchO += ` ${$(tex).text()}`;
        });
        $(prop)
          .find(".google-src-text")
          .text(stitchO.slice(1));
        //stitch original END

        //init
        ELEMENT.original[`${$(prop).attr("name")}`] = { c: "", vars: [] };
        ELEMENT.translated[`${$(prop).attr("name")}`] = { c: "", vars: [] };

        //set original
        [
          (ELEMENT.original[`${$(prop).attr("name")}`].c = sanitize(
            gt ? $(prop).find(".google-src-text") : $(prop).find("c")
          ))
        ];

        //push vars
        $.each($(prop).find("v"), (i, v) => {
          ELEMENT.original[`${$(prop).attr("name")}`].vars.push($(v).text());
          ELEMENT.translated[`${$(prop).attr("name")}`].vars.push($(v).text());
        });

        //stitch translated START
        let stitchT = "";
        $.each($(prop).find(".notranslate"), (i, tex) => {
          //skip actual vars
          !$(tex).hasClass("v") && [(stitchT += ` ${$(tex).text()}`)];
        });
        $(prop)
          .find(".notranslate")
          .text(stitchT.slice(1));
        //stitch translated END

        //set translated
        gt && [
          (ELEMENT.translated[`${$(prop).attr("name")}`].c = sanitize(
            $(prop).find(".notranslate")
          ))
        ];

        //vars original
        const bon = `♦`;
        Object.keys(ELEMENT.original).forEach(key => {
          ELEMENT.original[`${$(prop).attr("name")}`].vars.forEach(_var => {
            //content
            const c = ELEMENT.original[key].c;

            //if text includes variable
            if (c.includes(bon)) {
              //replace in original
              ELEMENT.original[key].c = c.replace(bon, _var);
            }
          });
        });

        //vars translated

        gt &&
          Object.keys(ELEMENT.translated).forEach(key => {
            ELEMENT.translated[`${$(prop).attr("name")}`].vars.forEach(_var => {
              //content
              const c = ELEMENT.translated[key].c;

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
    DEBUG && console.debug(Content);
  };
}
