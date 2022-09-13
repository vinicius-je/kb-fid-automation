const fs = require('fs');

const createTask = async (page) => {
    const title = `[Pacotes] - Automação ${process.env.APPLICATION}`; 
    //html elements
    const idDropdownInput = '.select-dropdown-input-container';
    const idDropdownOption = '.select-dropdown-menu-item';
    // const idProgressColumn = '.board-column-header-3';
    const idAddTaskBtn = '.board-add-icon';
    const idFormTitle = '#form-title';
    const idTextArea = 'textarea[name=description]';
    const idTaskColor = '#form-color_id'
    const idTaskColumn = '#form-column_id';
    const idTaskAssign = '.assign-me';
    const idTaskCategory = '#form-category_id';
    const idTaskTags = '#form-tags'
    const idSaveBtn = '.btn-blue';
   (async () => {
      await page.waitForSelector(idDropdownInput).then(() => page.click(idDropdownInput));
      await page.waitForSelector(idDropdownOption).then(() => page.click(idDropdownOption));
      await page.waitForSelector(idAddTaskBtn).then(() => page.click(idAddTaskBtn));
      await page.waitForSelector(idFormTitle).then(() => page.type(idFormTitle, title));
      await page.waitForSelector(idTaskColumn).then(() => page.select(idTaskColumn, '3'));
      await page.waitForSelector(idTaskColor).then(() => page.select(idTaskColor, 'green'));
      await page.waitForSelector(idTaskAssign).then(() => page.click(idTaskAssign));
      await page.waitForSelector(idTaskCategory).then(() => page.select(idTaskCategory, '1'));
      await page.waitForSelector(idTaskTags).then(() => page.select(idTaskTags, 'Access Management', 'Automatizado', process.env.APPLICATION));
      await page.waitForSelector(idTextArea).then(() => 
        // Realiza a leitura do arquivo kb.txt e adiciona o conteúdo no KB
        fs.readFile('kb.txt', 'utf-8', async (error, data) => {
            if(error) console.log(error);
            await page.type(idTextArea, data);
            await page.waitForSelector(idSaveBtn).then(() => page.click(idSaveBtn));
        })  
      );
    })();

    return;
}

module.exports = createTask;