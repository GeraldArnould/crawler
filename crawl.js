function normalizeURL(url) {
        const urlObj = new URL(url);
        if (urlObj.pathname === '/') {
                return (urlObj.hostname + urlObj.pathname);
        }
        return (urlObj.hostname + urlObj.pathname.replace(/\/+$/, ''));
}

async function crawlPage(url) {
        try {
                const resp = await fetch(url, {
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
                console.log(textBody);
        } catch (err) {
                console.log(`Couldn't fetch ${url}: ${err.message}`);
                return;
        }

}

export {
        normalizeURL,
        crawlPage,
};

