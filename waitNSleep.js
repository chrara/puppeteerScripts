//Wait and sleep for Puppeteer
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: true });

    // Option 1 - resolving a promise when `setTimeout` finishes
    const sleep = duration => new Promise(resolve => setTimeout(resolve, duration));
    await sleep(3000);
  
    const page = await browser.newPage();
    await page.goto('https://imgur.com');

    // Waits until the `title` meta element is rendered
    await page.waitForSelector('title');

    // Waits for 3000 milliseconds
    await page.waitFor(3000);
  
    const title = await page.title();
    console.info(`The title is: ${title}`);
  
  await browser.close();
})();