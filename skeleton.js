const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  //console.info(browser);

  const page = await browser.newPage();
  await page.goto('https://www.redantsolutions.com/');

  const result = await page.evaluate(() => {
    return document.querySelectorAll('p').length
  })

  console.log(result)

  await browser.close();
})();