//💜//i love you monad
var $ = window.$;

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

  setTimeout(console.clear, 599);
}

{
  $.updateGt = function(args ) {};
}

//https://skipperkongen.dk/2011/02/05/how-translate-google-com-works/
//tn_.dom.safe.replaceLocation(tn_b, "https://analate.glitch.me/u")
//location.assign("https://analate.glitch.me/?")

setTimeout(function()  {
  //$("iframe")[0].src = $("iframe")[0].src.replace(
  //  $.params.u,
  //  "https://gelsenkirchen.de"
  //);
  // $("iframe")[0].src.contents =""

  var anchorElem = document.createElement("a");
  anchorElem.setAttribute("href", "https://example.com");
  anchorElem.innerHTML = "keksample";

  document.body.appendChild(anchorElem);

  //location.replace($("a#dyn").attr("href").replace("%3Ftest", "%3Fmonad"));

  //fetch($("a#dyn").attr("href")).then(res => res.text()).then(t => {console.log(t)})
  //fetch(location.href.replace($.params.u), `${$.params.u}/tet`).then(res => res.text()).then(t => {console.log(t)})

  //fetch(`${location.href}`.replace($.params.u, `${$.params.u}/tet`)).then(res => res.text()).then(t => {console.log(t)})
}, 999);

{
  window.fixLink = function(block ) {
    var oLink = $(block)
      .find(".google-src-text>a")
      .attr("href");
    var oText = $(block)
      .find(".google-src-text>a")
      .text();
    var newText = $(block)
      .find("a")
      .eq(0)
      .text();

    console.log(
      $(block)
        .find("a")
        .eq(0)
        .prop("outerHTML")
    );

    $(block)
      .parent()
      .html(
        $(block)
          .find("a")
          .eq(0)
          .prop("outerHTML")
      );

    //$(block).find("a").attr("title", "")

    $('[data-toggle="tooltip"]').tooltip({ html: "KEKS" });

    console.log({
      "old Link": oLink,
      "old Text": oText,
      "new Text": newText
    });

    //console.log($(el).attr("href"))
  };
}
