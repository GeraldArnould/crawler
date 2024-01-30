import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { crawlPage, normalizeURL } from './crawl';

var argv = yargs(hideBin(process.argv))
        .command(
        '$0 <url>',
        'crawl <url> recursively',
        (yargs) => {
                yargs.positional('url', {
                        describe: 'base URL to start the crawler',
                        type: 'string',
                })
        },
        // (argv) => {
        //         console.log(`Parsing url: ${argv.url}`)
        // }
        )
        .demandCommand(1, 'a base URL is required')
        .help()
        // .usage('Usage: crawl <url> [Options]')
        // .option('d', { alias: 'depth', describe: 'crawling depth', type: 'number', demandOption: false })
        .parse();

const url = new URL(argv.url);
console.log(`Crawling started with base URL: ${url.href}`);
const pages = new Object();
pages[normalizeURL(url).href] = 0;
const parsed = crawlPage(url, url, pages);
