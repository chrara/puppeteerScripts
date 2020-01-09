process.env.UV_THREADPOOL_SIZE = 5000;
require('events').EventEmitter.defaultMaxListeners = 5000;

//Get screenshot of blog page for featured image
const puppeteer = require('puppeteer');
let screenWidth = process.argv[2];

if ( isNaN( screenWidth ) ){
  console.log("Please enter a number to indicate screen width. e.g. node screenshotPrompt.js 500");
  return;
} else screenWidth = Number( screenWidth );

if ( screenWidth > 980 ) {
  console.log("Maximum screen width for testing screenshots is 980px");
  screenWidth = 980;
}

const urls = [
  "3-eee.com",
  "aberdeenangus.co.uk",
  "abva.co.uk",
  "advancedcontrolsolutions.co.uk",
  "collins-contractors.co.uk",
  "currysauce.com",
  "dmdhub.org",
  "ecohausinternorm.com",
  "fiftyid.com",
  "godalmingfilmsoc.org.uk",
  "headwaysurrey.org",
  "homecroftwealth.co.uk",
  "iconicdb.com",
  "itw-envopak.co.uk",
  "j-e-m.com",
  "lemaitreltd.com",
  "mitchells.co.uk",
  "networksecurity.co.uk",
  "pdhfix.co.uk",
  "pickles.co.uk",
  "ramsterevents.co.uk",
  "redantsolutions.com",
  "solventis.net",
  "spppumps.com",
  "systemsinterface.com",
  "time-technology.co.uk",
  "torqueleader.com",
  "wcjeng.co.uk"
];

urls.forEach(getScreenshots);

function getScreenshots(url) {

let urlNoSlash = url.replace(/\\/g, '');

if (url == null ){
  console.log("Please enter a url as the first parameter. e.g. https://imgur.com");
  return;
} else if (url.indexOf('http') === -1){
  url = "http://" + url;
}

console.log( url );

try{
  (async () => {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    //await page.emulate(devices['iPhone X']);
    await page.setViewport({ width: screenWidth, height: 1080 });
    await page.goto(url, {waitUntil: 'load', timeout: 0} );

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
} catch(err){console.log("error");}

}