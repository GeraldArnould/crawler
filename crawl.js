import getUrlsFromHtml from "./parse";

function normalizeURL(url) {
        const urlObj = new URL(url);
        if (urlObj.pathname === '/') {
                return urlObj;
        }
        urlObj.pathname = urlObj.pathname.replace(/\/+$/, '');
        return (urlObj);
}

function isFromBaseDomain(url, baseURL) {
        return (url.hostname === baseURL.hostname);
}

async function crawlPage(baseURL, currentURL, pages) {
        // make sure we stay on the same domain
        if (!isFromBaseDomain(currentURL, baseURL)) {
                return pages;
        }

        // keep track of the number of times a page is visited
        const thisURL = normalizeURL(currentURL).href;
        if (thisURL in pages) {
                pages[thisURL] += 1;
        } else {
                pages[thisURL] = 1;
        }
        try {
                const resp = await fetch(thisURL, {
                        method: 'GET',
                        mode: 'cors',
                        // headers: {
                        //
                        // },
                });

                // Deal with return codes
                if (resp.status >= 300 && resp.status <= 399) {
                        console.error(`Redirection. Status: ${resp.status}`);
                        return;
                } else if (resp.status >= 400 && resp.status <= 499) {
                        console.error(`Client error. Status ${resp.status}`);
                        return;
                } else if (resp.status >= 500) {
                        console.error(`Server error. Status ${resp.status}`);
                }

                // Content Type
                // console.error(`Headers: )`);
                // for (const header of resp.headers.entries()) {
                //         console.log(`- ${header}`);
                // }
                if (!resp.headers.get('content-type').includes('text/html')) {
                        console.error(`Unable to parse ${resp.headers.get('content-type')}`);
                        return;
                }
                const textBody = await resp.text();
                const urls = getUrlsFromHtml(textBody, baseURL);
                for ( const url of urls) {
                        const urlObj = new URL(url);
                        if (isFromBaseDomain(urlObj, baseURL)) {
                                crawlPage(baseURL, urlObj, pages);
                        } else {
                                continue;
                        }
                }
                console.log(pages);
        } catch (err) {
                console.log(`Couldn't fetch ${thisURL}: ${err.message}`);
                return;
        }

}

export {
        normalizeURL,
        crawlPage,
};

