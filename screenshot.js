//Get screenshot of blog page for featured image
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.setViewport({ width: 1420, height: 1080 });
  await page.goto('https://www.linklaters.com/en/insights/blogs/fintechlinks/2019/october/uk-regulators-to-support-the-safe-and-robust-use-of-machine-learning-in-uk-financial-services');
  await page.waitForSelector('body > div.notification-wrapper.cookieWrapper > div > div > div > span');
  await page.click('body > div.notification-wrapper.cookieWrapper > div > div > div > span')
  await page.waitFor(1000);


  // Takes a screenshot of an area within the page
  await page.screenshot({
    path: 'screenshot.jpg',
    type: 'jpeg',
    quality: 80,
    clip: { x: 160, y: 120, width: 630, height: 400 }
  });

  await browser.close();
})();