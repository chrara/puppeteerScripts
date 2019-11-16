//Start a browser,page, navigate to url in slo mo
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: false, slowMo: 1000 });
  
    //Open a new page
    const page = await browser.newPage();
    //console.info(page);

    // Instructs the blank page to navigate a URL
    await page.goto('https://imgur.com');

    // Waits until the `title` meta element is rendered
    await page.waitForSelector('title');
  
    // Fetches page's title
    const title = await page.title();
    console.info(`The title is: ${title}`);
  
  await browser.close();
})();