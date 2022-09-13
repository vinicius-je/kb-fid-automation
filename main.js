const puppeteer = require('puppeteer');
const loginKD = require('./loginKD');
const createTask = require('./createTask');
require('dotenv').config();

(async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto(process.env.URL);
    await loginKD(page);
    await createTask(page);
})();