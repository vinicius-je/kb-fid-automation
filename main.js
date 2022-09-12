const puppeteer = require('puppeteer');
const loginKD = require('./loginKD');
const createTask = require('./createTask');

(async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto('');
    await loginKD(page);
    await createTask(page);
})();