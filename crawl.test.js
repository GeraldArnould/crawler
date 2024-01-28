//const { test, expect } = require('jest/globals');

import normalizeURL from './crawl';

test('trailing slash is removed', () => {
        expect(normalizeURL('https://blog.boot.dev/path/')).toBe('blog.boot.dev/path');
        expect(normalizeURL('https://blog.boot.dev/path')).toBe('blog.boot.dev/path');
        expect(normalizeURL('http://blog.boot.dev/path/')).toBe('blog.boot.dev/path');
        expect(normalizeURL('http://blog.boot.dev/path')).toBe('blog.boot.dev/path');
        expect(normalizeURL('http://blog.boot.dev/path///')).toBe('blog.boot.dev/path');
});

test('url without path normalize to default path', () => {
        expect(normalizeURL('https://blog.boot.dev')).toBe('blog.boot.dev/');
        expect(normalizeURL('https://blog.boot.dev/')).toBe('blog.boot.dev/');
});

test('invalid urls throw TypeError', () => {
        expect(() => { normalizeURL('156/12') }).toThrow(TypeError);
        expect(() => { normalizeURL('') }).toThrow(TypeError);
});

