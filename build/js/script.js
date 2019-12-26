const { $, tippy } = window;

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
  window.fixLink = block => {
    const navBlock = $(block).parent();

    const _oldLink = $(block).find(".google-src-text>a");
    const _newLink = $(block)
      .find("a")
      .eq(1);
    //
    const Old = {
      href: _oldLink.attr("href"),
      //
      text: _oldLink.text(),
      //
      title: _oldLink.attr("x-title")
    };
    const New = {
      text: _newLink.text(),
      //
      title: _newLink.attr("title"),
      //
      html: _newLink.prop("outerHTML")
    };

    //
    navBlock.html(New.html);
    const id = `link_${+new Date()}`;
    //
    navBlock
      .find("a")
      .attr("id", id)
      .attr("title", "");

    tippy(`#${id}`, {
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

    console.log({
      Old,
      New
    });

    //console.log($(el).attr("href"))
  };
}
