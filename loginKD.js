require('dotenv').config();

const loginKD = async (page) => {
    //User loggin
    let user = '81032534';
    let password = '123456';
    //html elements
    const idUserLabel = '#form-username';
    const idPasswordLabel = '#form-password';
    const idLoginButton = '.btn-blue';
  
   (async () => {
      await page.waitForSelector(idUserLabel).then(() => page.type(idUserLabel, user));
      await page.waitForSelector(idPasswordLabel).then(() => page.type(idPasswordLabel, password));
      await page.waitForSelector(idLoginButton).then(() => page.click(idLoginButton));    
    })();

    return;
}

module.exports = loginKD;