//💜//i love you monad
var $ = window.$, tippy = window.tippy;

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
  window.fixLink = function(block ) {
    var navBlock = $(block).parent();

    var _oldLink = $(block).find(".google-src-text>a");
    var _newLink = $(block)
      .find("a")
      .eq(1);
    //
    var Old = {
      href: _oldLink.attr("href"),
      //
      text: _oldLink.text(),
      //
      title: _oldLink.attr("x-title")
    };
    var New = {
      text: _newLink.text(),
      //
      title: _newLink.attr("title"),
      //
      html: _newLink.prop("outerHTML")
    };

    //
    navBlock.html(New.html);
    var id = ("link_" + (+new Date()));
    //
    navBlock
      .find("a")
      .attr("id", id)
      .attr("title", "");

    tippy(("#" + id), {
      interactive: 1,
      content: (("\
\n          <span class=\"color-goog-blue\">" + (New.title)) + ("</span><br/>\
\n          " + ("&ndash;".repeat(New.title.length))) + ("<br/>\
\n            <i class=\"color-goog-orange\">original:</i><br/>\
\n            " + (Old.text)) + ("&ndash;„<i><span class=\"color-goog-gray\">" + (Old.title)) + "</i>“\
\n      "),
      theme: "test"
      //hideOnClick: false,
      //trigger: "click"
    });

    console.log({
      Old: Old,
      New: New
    });

    //console.log($(el).attr("href"))
  };
}
