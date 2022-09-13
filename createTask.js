const fs = require('fs');

//Formata os chamados do IAM
const model = (rq, matricula, perfil1, perfil2, perfil3) => {
    return `[${process.env.APPLICATION}] | ${rq}   -   ${matricula}
    \nPerfil Nível 1\n• ${perfil1}
    \nPerfil Nível 2\n• ${perfil2}
    \nPerfil Nível 3\n• ${perfil3}
    \n######################################################################\n\n`;
}
//Ler os chamados
fs.readFile('json.txt', 'utf-8', (error, data) => {
    if(error) console.log(error);
    //Converte o conteúdo json para objeto
    const jsonData = JSON.parse(data);
    let dataString = "";
    jsonData.forEach(chamado => {
        //Seleciona os atributos de cada chamado do IAM
        const {rq, destinatario_id, perfil1_nome, perfil2_nome, perfil3_nome} = chamado;
        dataString += model(rq, destinatario_id, perfil1_nome, perfil2_nome, perfil3_nome) + "\n";
    });
    //Gera o arquivo kb.txt com os chamados do IAM formatados
    fs.writeFileSync('kb.txt', dataString, (error) => {
        if(error) {
            console.log(`Error na RQ ${rq}`);
            throw error;
        }
    })
})

async function createTask(page){
    const title = `[Pacotes] - Automação ${process.env.APPLICATION}`; 
    //html elements
    const idDropdownInput = '.select-dropdown-input-container';
    const idDropdownOption = '.select-dropdown-menu-item';
    const idProgressColumn = '.board-column-header-3';
    const idAddTaskBtn = '.board-add-icon';
    const idFormTitle = '#form-title';
    const idTextArea = 'textarea[name=description]';
    const idTaskColor = '#form-color_id'
    const idTaskColumn = '#form-column_id';
    const idTaskTags = '#form-tags'
    const idSaveBtn = '.btn-blue';
   (async () => {
      await page.waitForSelector(idDropdownInput).then(() => page.click(idDropdownInput));
      await page.waitForSelector(idDropdownOption).then(() => page.click(idDropdownOption));
      await page.waitForSelector(idProgressColumn).then(() => page.click(idAddTaskBtn));
      await page.waitForSelector(idFormTitle).then(() => page.type(idFormTitle, title));
      await page.waitForSelector(idTaskColumn).then(() => page.select(idTaskColumn, '3'));
      await page.waitForSelector(idTaskColor).then(() => page.select(idTaskColor, 'green'));
      await page.waitForSelector(idTaskColor).then(() => page.select(idTaskTags, 'Access Management', 'Automatizado', process.env.APPLICATION));
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