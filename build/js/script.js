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
  const sanitize = input => {
    const output = (input || "").trim().replace(/ · /gi, ".").replace(/·/gi, ".");
    return output;
  };

  window.initRender = cb => {
    let Content;
    if ($("data#content>.notranslate").length) {
      Content = window.CONTENT = {
        original: JSON.parse(
          sanitize($("data#content>.notranslate>.google-src-text").text())
        ),
        translated: JSON.parse(
          sanitize(
            $("data#content>.notranslate")
              .contents()
              .filter(function() {
                return this.nodeType == 3;
              })[0].nodeValue
          )
        )
      };
    } else {
      Content = window.CONTENT = {
        original: JSON.parse(sanitize($("data#content").text())),
        translated: false
      };
    }

    //const rc = (window.RENDER_CONTENT = JSON.parse($("data#content").text()));

    //console.log(rc);

    /* tippy(`#${id}`, {
      interactive: 1,
      content: `
          <span class="color-goog-blue">${New.title}</span><br/>
          ${"&ndash;".repeat(New.title.length)}<br/>
            <i class="color-goog-orange">original:</i><br/>
            ${Old.text}&ndash;„<i><span class="color-goog-gray">${
        Old.title
      }</i>“
      `,
      theme: "test"
      //hideOnClick: false,
      //trigger: "click"
    });
    */

    //console.log($(el).attr("href"))
  };
}
