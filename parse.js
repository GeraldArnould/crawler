import { JSDOM } from 'jsdom';

function getUrlsFromHtml(body, baseURL) {
        const dom = new JSDOM(body);
        const urls = new Set();
        dom.window.document.querySelectorAll('a').forEach(link => {
                try {
                        const protocols = ['http:', 'https:'];
                        const url = new URL(link.href, baseURL.href);
                        if (!protocols.includes(url.protocol)) {
                                console.error(`unknown protocol "${url.protocol}" for url ${url.href}`);
                        } else {
                                urls.add(url.href);
                        }
                } catch (err) {
                        // Ignore invalid URLs
                        console.error(`invalid url: ${link.href}`);
                }
        });
        return [...urls];
}

export default getUrlsFromHtml;
