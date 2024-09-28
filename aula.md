## Linguagem de Programação

Maneira de dar instrução ao computador.
Como um lego, você irá realizar peças para criar algoritmos, ou seja, para resolver problemas.

- Algoritmo: Sequencia de passos lógica e finita para resolução de um problema

## Peças de uma linguagem

- Comentários
- Declaração de variáveis (const, let)
- Operadores (Atribuição, Concatenação, Matemáticos & Lógicos)
- Tipos de dados (string, number boolean)
- Estrutura de dados (functions, object, array)
- Controle de fluxo (if/else)
- Estrutura de repetição (for, while)

## Fases da Resolução de um problema

Coletar os dados
Processar os dados (manipular, alterar ...)
Apresentar os dados

## Array, Objetos

```js
let metas = ["Mayk", "alo"];
console.log(metas[0])

// Objetos
let meta = {
    value: "ler um livro por mes",
    checked: false,
    isChecked: (info) => {
        console.log(info)
    }
}

meta.isChecked(meta.value)

const criarMetas = () => {}

// Function
function criarMeta() {
    
} 
```

## Dependencias e gitignore

- inquirer
- node_modules/ (diz pro git ignorar a pasta em questão)

## Inquirer e Modulos NODEJS
-Importação de módulos (require, CommonJS)

- Biblioteca 'inquirer' para criar prompts interativos

```js
//de dentro do prompts, me devolva apenas o objeto select, para criar uma caixinha de seleção MENU
const { select } = require ('@inquirer/prompts')
```
