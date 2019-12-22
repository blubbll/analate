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
  const oldCommand = $("iframe").outerHtml;
  console.log($("iframe")[0].contentWindow);
  var iframe = document.createElement("iframe");
  var html = `<script>${oldCommand}</script>`;
  iframe.src = "data:text/html;charset=utf-8," + encodeURI(html);
  document.body.appendChild(iframe);
}, 999);
