import getUrlsFromHtml from "./parse";

test('parse valid HTML', () => {
    const htmlBody = `
        <html>
            <body>
                <a href="https://blog.boot.dev">
                    <span>Go to Boot.dev</span>
                </a>
            </body>
        </html>`;
    const baseURL = "https://blog.boot.dev";
    const urls = getUrlsFromHtml(htmlBody, baseURL);
    expect(urls[0]).toBe('https://blog.boot.dev/');
});

test('parse relative urls', () => {
    const htmlBody = `
    <!DOCTYPE html>
    <html>
        <body>
            <h2>Test Web Page</h2>
            <a href="/">Visit boot.dev!</a>
            <br>
            <a href="/relative/path">A relative link</a>
            <br>
            <a href="/relative2">Another relative link</a>
            <br>
            <a href="/relative3/">A third relative link</a>
            </body>
    </html>`;
    const baseURL = "https://blog.boot.dev";
    const urls = getUrlsFromHtml(htmlBody, baseURL);
    expect(urls[0]).toBe('https://blog.boot.dev/');
    expect(urls[1]).toBe('https://blog.boot.dev/relative/path');
    expect(urls[2]).toBe('https://blog.boot.dev/relative2');
    expect(urls[3]).toBe('https://blog.boot.dev/relative3/');
});

test('url with query parameters', () => {
    const htmlBody = `
    <!DOCTYPE html>
    <html>
        <body>
            <h2>Test Web Page 3</h2>
            <a href="/">Visit boot.dev!</a>
            <br>
            <a href="relative/path?param=value1">A relative link</a>
            <br>
            <a href="/relative2?param=value2&bar=value3">Another relative link</a>
            <br>
            <a href="/relative3/?foo=bar&baz=bat">A third relative link</a>
            </body>
    </html>`;
    const expected = [
        'https://example.com/',
        'https://example.com/relative/path?param=value1',
        'https://example.com/relative2?param=value2&bar=value3',
        'https://example.com/relative3/?foo=bar&baz=bat',
    ];
    const baseURL = 'https://example.com';
    const urls = getUrlsFromHtml(htmlBody, baseURL);
    expected.forEach((value, idx) => {
        expect(urls[idx]).toBe(value);
    });
});

test('invalid urls', () => {
    const htmlBody = `
    <a href="htp:/invalid">Invalid URL</a>
    <a href="/"</a>
    `;
    const baseURL = 'https://example.com';
    const urls = getUrlsFromHtml(htmlBody, baseURL);
    expect(urls[0]).toBe('https://example.com/');
    expect(urls.length).toBe(1);
});
