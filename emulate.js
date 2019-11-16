const puppeteer = require('puppeteer');
const devices = require('puppeteer/DeviceDescriptors');

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  // Emulates an iPhone X
  await page.emulate(devices['iPhone X']);

  // ALT
  /*
    await page.setUserAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1');
    await page.setViewport({ width: 375, height: 812 });
  */

  await page.goto('https://imgur.com');

  await browser.close();
})();