const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: false, slowMo:500 });
  const page = await browser.newPage();

  await page.goto('https://google.com');
  
  // Waits until the toolbar is rendered
  await page.waitForSelector('.gLFyf');

  // Focuses the search input
  await page.focus('[type="text"]');

  // Types the text into the focused element
  await page.keyboard.type('puppy');
  // Choosing the third result
  await page.keyboard.press('ArrowDown', { delay: 0 });
  await page.keyboard.press('ArrowDown', { delay: 0 });
  await page.keyboard.press('Enter');

  await page.waitForSelector('title');

  const result = await page.evaluate(() => {
    return document.querySelectorAll('#search a').length;
  })

  console.log(`${result} search links found.`);

  await browser.close();
})();