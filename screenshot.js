//Get screenshot of blog page for featured image
const puppeteer = require('puppeteer');
const devices = require('puppeteer/DeviceDescriptors');

let url = process.argv[2];
let urlNoSlash = url.replace(/\\/g, '');
let screenWidth = process.argv[3];

if (url == null ){
  console.log("Please enter a url as the first parameter. e.g. https://imgur.com");
  return;
} else if (url.indexOf('http') === -1){
  url = "http://" + url;
}

if ( isNaN( screenWidth ) ){
  console.log("Please enter a number to indicate screen width. e.g. 500");
  return;
} else screenWidth = Number( screenWidth );

if ( screenWidth > 980 ) {
  console.log("Maximum screen width for testing screenshots is 980px");
  screenWidth = 980;
}

console.log( url );

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  //await page.emulate(devices['iPhone X']);
  await page.setViewport({ width: screenWidth, height: 1080 });
  await page.goto(url, {waitUntil: ['load', 'domcontentloaded', 'networkidle2', 'networkidle0']} );

  // Take full page screenshot
  await page.screenshot({
    path: './screenshots/' + urlNoSlash + '.jpg',
    type: 'jpeg',
    quality: 80,
    fullPage: true
    //: { x: 160, y: 120, width: 630, height: 400 }
  });

  await browser.close();
})();