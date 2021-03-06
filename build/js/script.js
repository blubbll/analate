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
    const output = (input || "").trim().replace(/(\r\n|\n|\r)/gm, ""); //uwu linebreaks are bwad
    //console.log(output);
    return output;
  };

  window.wasTranslated = () => {
    return $("#google-infowindow").length > 0;
  };

  window.initRender = (original, cb) => {
    // console.log($("data#content>.notranslate").length);

    const gt = window.wasTranslated();

    let Content = (window.CONTENT = {});

    const ODATA = JSON.parse(original);
    $.each($("data#content>item"), (i, item) => {
      const id = $(item).attr("data-id");
      const ELEMENT = { original: ODATA[id], translated: {} };

      $.each($(item).find("div.notranslate"), (i, prop) => {
        //init
        ELEMENT.translated[`${$(prop).attr("name")}`] = { c: "", vars: [] };

        //push vars
        $.each($(prop).find("v"), (i, v) => {
          ELEMENT.translated[`${$(prop).attr("name")}`].vars.push($(v).text());
        });

        //set translated
        gt && [
          (ELEMENT.translated[`${$(prop).attr("name")}`].c = sanitize(
            $(prop).attr("title")
          ))
        ];

        const bon = `🍬`;
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
    cb && cb();
    DEBUG && console.debug(Content);
  };
}

//less tracking
{
  const t = window._setupIW;
  window._setupIW = () => {
    t();
    console.log("infowindow was triggered");
  };
}
window._csi = (from, to, u) => {
  console.log("nope", { from, to, u });
};
