const { select, input, checkbox } = require("@inquirer/prompts")
const fs = require("fs").promises

let mensagem = "Bem Vindo ao App de Metas";

let metas

const carregarMetas = async () => {
    try{
        const dados = await fs.readFile("metas.json", "utf-8")
        metas = JSON.parse(dados)
    }
    catch(erro) {
        metas =  []
    };
};

const salvarMetas = async() => {
    await fs.writeFile("metas.json", JSON.stringify(metas, null, 2))
}

const cadastrarMeta = async() => {
    const meta = await input({message: "Cadastre sua meta:"})

    if(meta.length == 0){
        mensagem = "Sua meta é inválida, cadastre outra meta."
        return
    }

    metas.push({
        value: meta, checked: false
    })

    mensagem = "Meta cadastrada com sucesso!"
}

const listarMetas = async() => {
    if(metas.length == 0){
        mensagem = "Não existem Metas!"
        return
    }
    const respostas = await checkbox ({
    message:
    `
    use <Espaço> para confirmar
    use as <Setas> para mover
    use <Enter> para confirmar
    `,
    choices: [...metas],
    instructions: false,
    })

    metas.forEach((m) =>{
        m.checked = false
    })

    if(respostas.length == 0){
        mensagem = "Nenhuma meta foi selecionada, tente novamente."
        return
    }

    respostas.forEach ((resposta) => {
        const meta = metas.find((m) => {
            return m.value == resposta
        }) 
        
        meta.checked = true
    })

    mensagem = 'Meta(s) marcadas como concluída(s)'
}

const metasRealizadas = async () => {
    if(metas.length == 0){
        mensagem = "Não existem Metas!"
        return
    }
    const realizadas = metas.filter((meta) => {
        return meta.checked 
    })

    if(realizadas.length == 0) {
        mensagem = "Suas metas não foram realizadas"
        return
    }

    await select ({
        message: realizadas.length + " metas realizadas",
        choices: [...realizadas]
    })

}

const metasAbertas = async () => {
    if(metas.length == 0){
        mensagem = "Não existem Metas!"
        return
    }
    const abertas = metas.filter(()=> {
        return meta.checked != true
    })

    if(abertas.length == 0) {
        mensagem = "Não há nenhuma meta em aberto, Parabéns!!"
        return
    }

    await select ({
        message: abertas.length + " metas em aberto",
        choices: [...abertas]
    })

}

const deletarMetas = async () => {
    if(metas.length == 0){
        mensagem = "Não existem Metas!"
        return
    }
    const metasDesmarcadas = metas.map((meta) => {
        return {value: meta.value, checked:false}
    })
    const itensADeletar = await checkbox ({
        message:
        `Selecione a meta que deseja excluir:`,
        choices: [...metasDesmarcadas],
        instructions: false,
        }) 

        if(itensADeletar.lenght == 0) {
            return
        }

        itensADeletar.forEach((item)=> {
            metas = metas.filter((meta) => {
                return meta.value != item
            })
        })

        mensagem = "Meta(s) Deletada(s) com sucesso"
}

const mostrarMensagem = () => {
    console.clear()

    if(mensagem != ""){
        console.log(mensagem)
        console.log("")
        mensagem = ""
    }
}

const start = async() => {
    await carregarMetas()
    while(true) {
        mostrarMensagem()
        await salvarMetas()

        const option = await select ({
            message: "Menu >",
            choices: [
                {
                    name: "Cadastrar Meta",
                    value: "cadastrar"
                },
                {
                    name:"Listar Meta",
                    value:"listar"
                },
                {
                    name:"Metas Realizadas",
                    value:"realizadas"
                },
                {
                    name:"Metas Abertas",
                    value:"abertas"
                },
                {
                    name:"Apagar Metas",
                    value:"deletar"
                },
                {
                    name: "Sair",
                    value: "sair"
                },
            ]
        })
        switch(option) {
            case "cadastrar":
                await cadastrarMeta()
                break
            case "listar":
                console.log("Aqui estão suas metas:")
                await listarMetas()
                break
            case "realizadas":
                await metasRealizadas()
                break
            case "abertas":
                await metasAbertas()
                break
            case "deletar":
                await deletarMetas()
                break
            case "sair":
                console.log("Saída concluida com sucesso, volte sempre!!")
                return
        }
    }
}

start()