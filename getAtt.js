const puppeteer = require('puppeteer');
const fs = require('fs');

function run () {
    /*
    I want to get a list of urls every hour
    I want to add these to a file
    Urls may be duplicates and if so I dont want to add them

    WordPress
    I want to display the json contents as a list on a page
    When the user reaches the bottom of the list they should be able to view more
    I need to paginate the Json file

    */
    return new Promise(async (resolve, reject) => {
        try {
            const browser = await puppeteer.launch({ headless: true });
            const page = await browser.newPage();
            await page.setRequestInterception(true);
            page.on('request', (request) => {
                if (request.resourceType() === 'document') {
                    request.continue();
                } else {
                    request.abort();
                }
            });
            await page.goto("url");
            let urls = await page.evaluate(() => {
                let results = [];
                let items = document.querySelectorAll('#item a');
                items.forEach((item) => {
                    if (! item.getAttribute('href').includes("")){
                    results.push({
                        url:  item.getAttribute('href'),
                        title: item.previousSibling.innerHTML,
                        text: item.innerText,
                    });
                }
                });
                return results;
            })
            browser.close();
            return resolve(urls);
        } catch (e) {
            return reject(e);
        }
    })
}
run().then(
    function(val) {
        fs.writeFile(
            './json/urls.json',
            JSON.stringify(val, null, 2),
            (err) => err ? console.error('Data not written!', err) : console.log('Data written!')
        )
    }
).catch(console.error);