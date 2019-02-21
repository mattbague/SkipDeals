// ==UserScript==
// @name SkipDeals
// @namespace https://mattbague.com/
// @match https://slickdeals.net/*
// @grant GM_xmlhttpRequest
// @require http://code.jquery.com/jquery-latest.js 
// ==/UserScript==

$("a[href*='u2=']").each((ndx, element) => {
  const wrappedUrl = element.href;
  const actualUrl = (new URL(wrappedUrl)).searchParams.get("u2");
  $(element).attr("href", actualUrl);
});

$("a[href*='1=frontpage']").each((ndx, element) => {
  const wrappedUrl = element.href
  console.log(wrappedUrl)
  GM_xmlhttpRequest({
    url: wrappedUrl,
    method: "GET",
    anonymous: true,
    onload: (res) => {
      const actualUrl = new URL(res.finalUrl);
      (qpExcludesByDomain[actualUrl.hostname] || []).map(qp => rawUrl.searchParams.delete(qp))
      $(element).attr("href", actualUrl);
    }
  })
});

const qpExcludesByDomain = {
  "newegg.com": ["sdtid", "SID", "AID", "PID", "nm_mc", "cm_mmc", "cm_sp"]
}
