function normalizeURL(url) {
        const urlObj = new URL(url);
        if (urlObj.pathname === '/') {
                return (urlObj.hostname + urlObj.pathname);
        }
        return (urlObj.hostname + urlObj.pathname.replace(/\/+$/, ''));
}

export default normalizeURL;

