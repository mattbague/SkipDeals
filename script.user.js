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
            const rawUrl = new URL(res.finalUrl);
            const domain = rawUrl.hostname.startsWith("www.") ? rawUrl.hostname.replace("www.", "") : rawUrl.hostname
            
            const qpIncludes = siteQpIncludes[domain] || [];
            const qpsToDelete = []
            
            let actualUrl;
            if (qpIncludes.length > 0) {
                rawUrl.searchParams.forEach((value, key) => {                    
                    if (qpIncludes.indexOf(key) < 0) {                    
                        qpsToDelete.push(key);
                    }
                });
              
              console.log(qpsToDelete);
              qpsToDelete.map(k => rawUrl.searchParams.delete(k));

              actualUrl = rawUrl.href
            } else {
                actualUrl = `${rawUrl.protocol}//${rawUrl.hostname}${rawUrl.pathname}`
            }        
            $(element).attr("href", actualUrl);
          }
    })
});

const siteQpIncludes = {
    "newegg.com": ["Item"]
}
