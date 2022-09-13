const fs = require('fs');

const formatTasks = async () => {
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
}

module.exports = formatTasks;