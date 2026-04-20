# Task CLI

CLI simples para gerenciamento de tarefas, desenvolvida em TypeScript com `commander` para parsing de comandos e `chalk` para saída colorida no terminal.

O projeto permite:

- adicionar tarefas
- listar tarefas cadastradas
- marcar tarefas como concluídas
- remover tarefas

As tarefas são persistidas localmente no arquivo `data/tasks.json`.

## Visão geral

Esta aplicação foi estruturada como uma ferramenta de linha de comando para estudos de TypeScript, organização de código em camadas simples e manipulação de arquivos JSON com Node.js.

Cada tarefa possui:

- `id`
- `title`
- `status`
- `createdAt`

Os status aceitos atualmente são:

- `pending`
- `done`

## Tecnologias utilizadas

- TypeScript
- Node.js
- Commander
- Chalk

## Pré-requisitos

Antes de executar o projeto, tenha instalado:

- Node.js
- npm

É recomendado usar uma versão LTS recente do Node.js.

## Instalação

Clone o repositório e instale as dependências:

```bash
npm install
```

## Como executar

### 1. Compilar o projeto

O código-fonte fica em `src/` e a saída compilada é gerada em `dist/`.

Para compilar manualmente:

```bash
npx tsc
```

Para acompanhar alterações em modo watch:

```bash
npm run dev
```

### 2. Executar a CLI

Após compilar, execute os comandos com:

```bash
node dist/index.js <comando>
```

Exemplo:

```bash
node dist/index.js list
```

## Comandos disponíveis

### Adicionar uma tarefa

```bash
node dist/index.js add "Estudar TypeScript"
```

Comportamento:

- cria uma nova tarefa com ID incremental
- define o status inicial como `pending`
- salva a data de criação automaticamente

### Listar tarefas

```bash
node dist/index.js list
```

Saída esperada:

```text
=-=-=-=-=-=-=-=-=-=TASKS CADASTRADAS=-=-=-=-=-=-=-=-=-=
[1] Estudar TypeScript - done
Data: 19/04/2026
```

### Marcar uma tarefa como concluída

```bash
node dist/index.js done 1
```

Comportamento:

- localiza a tarefa pelo `id`
- altera o status para `done`
- regrava o arquivo `data/tasks.json`

### Remover uma tarefa

```bash
node dist/index.js remove 1
```

Comportamento:

- remove a tarefa correspondente ao `id` informado
- atualiza a lista persistida no arquivo JSON

### Ajuda da CLI

```bash
node dist/index.js --help
```

Saída atual:

```text
Usage: task-cli [options] [command]

Simple CLI for task management

Options:
  -V, --version   output the version number
  -h, --help      display help for command

Commands:
  add <title>     Add a new task.
  list            List all tasks.
  done <id>       Change task status to 'done'.
  remove <id>     Remove a task.
  help [command]  display help for command
```

## Executando como comando global

O `package.json` expõe o binário:

```json
"bin": {
  "task": "./dist/index.js"
}
```

Isso permite vincular o projeto localmente e usar o comando `task`:

```bash
npm link
task list
```

Observação importante:
o projeto lê e grava `./data/tasks.json` usando caminho relativo. Na prática, isso significa que o comando funciona melhor quando executado a partir da raiz do projeto.

## Estrutura do projeto

```text
.
├── data/
│   └── tasks.json
├── dist/
├── src/
│   ├── models/
│   │   ├── Task.ts
│   │   └── TaskStatus.ts
│   ├── services/
│   │   └── TaskManager.ts
│   ├── utils/
│   │   └── helper.ts
│   └── index.ts
├── package.json
└── tsconfig.json
```

## Organização do código

### `src/index.ts`

Ponto de entrada da aplicação. Configura a CLI com `commander` e registra os comandos disponíveis.

### `src/services/TaskManager.ts`

Centraliza a lógica de negócio da aplicação:

- criação de tarefas
- listagem
- atualização de status
- remoção
- leitura e escrita do arquivo JSON

### `src/models/Task.ts`

Define o tipo `Task`, que representa a estrutura de cada tarefa.

### `src/models/TaskStatus.ts`

Define o tipo de status aceito pela aplicação.

### `src/helpers/helper.ts`

Contém funções auxiliares, como:

- recuperação do último ID salvo
- formatação de data

## Persistência de dados

As tarefas ficam salvas em:

```text
data/tasks.json
```

Exemplo de estrutura:

```json
[
  {
    "id": "1",
    "title": "Estudar TypeScript",
    "status": "done",
    "createdAt": "2026-04-20T02:33:57.936Z"
  }
]
```

## Scripts disponíveis

No momento, o projeto possui o seguinte script no `package.json`:

```json
"scripts": {
  "dev": "npx tsc --watch"
}
```

Resumo:

- `npm run dev`: recompila o projeto automaticamente em modo watch

## Configuração TypeScript

O `tsconfig.json` utiliza:

- `rootDir` apontando para `src`
- `outDir` apontando para `dist`
- `strict: true`
- geração de `sourceMap`, `.d.ts` e `.d.ts.map`

Isso torna o projeto uma boa base para estudo e evolução com foco em tipagem estática.

## Limitações atuais

Alguns pontos importantes do estado atual do projeto:

- não existe script `build` no `package.json`, então a compilação precisa ser feita com `npx tsc`
- não existem testes automatizados implementados
- o caminho de persistência usa `./data/tasks.json`, o que acopla a execução à raiz do projeto
- a persistência depende da existência prévia do arquivo `data/tasks.json`

## Exemplo de fluxo de uso

```bash
npx tsc
node dist/index.js add "Estudar TypeScript"
node dist/index.js add "Estudar Node.js"
node dist/index.js list
node dist/index.js done 1
node dist/index.js remove 2
```

## Status do projeto

Projeto funcional para fins de estudo e prática com:

- TypeScript
- CLI com Node.js
- manipulação de arquivos
- organização básica por responsabilidades

## Licença

O `package.json` define a licença atual como `ISC`.
