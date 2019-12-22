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

  setTimeout(console.clear, 599);
}

{
  $.updateGt = args => {};
}

//https://skipperkongen.dk/2011/02/05/how-translate-google-com-works/
//tn_.dom.safe.replaceLocation(tn_b, "https://analate.glitch.me/u")
//location.assign("https://analate.glitch.me/?")

setTimeout(() => {
  console.log($("iframe")[0].src)
  const cmd =
    "window.top.gtcomm._updaten('en','English','af','en','https://analate.glitch.me/h');";
  var html = `<script>${cmd}</script>`;
  console.log($.params.u)
  $("iframe")[0].src = $("iframe")[0].src.replace($.params.u, "https://gelsenkirchen.de")
  //$("iframe").src = "data:text/html;charset=utf-8," + encodeURI(html);
}, 999);
