//💜//i love you monad
//console.log(location.href);
/*const linkTemplate = $("#templateLink").attr("href");
const nav = t => {
  event.preventDefault();
  const host = "https://analate.glitch.me";
  const toLink = $(t)
    .attr("nav-href")
    .replace("~", host);
  const toLinkFramed = linkTemplate.replace($.params.u, toLink);
  //location.replace(toLinkFramed);
  //window.top
  //location.href = toLinkMasted;
  //history.replaceState(null, null, toLink);

};*/

var $ = window.$, fixLink = window.fixLink, tippy = window.tippy;

document.addEventListener("DOMContentLoaded", function(event) {
  setTimeout(console.clear, 499);

  setTimeout(function()  {
    $(".notranslate[onmouseover]").each(function(v, el)  {
      for (var element in el) {
        if (element.nodeType == Node.TEXT_NODE) {
          console.log(1);
        }
      }

      console.log($(el).text());
    });

    $("nav-link>.notranslate").each(function(v, el)  {
      //fixLink(el);
    });
  }, 999);
});
