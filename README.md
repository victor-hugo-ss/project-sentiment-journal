# Sentiment Journal

Aplicativo de terminal para registrar entradas diárias e visualizar o sentimento ao longo do tempo em um gráfico ASCII.

## Descrição

Sentiment Journal é um pequeno CLI escrito em Node.js que:

- recebe entradas de texto do usuário;
- corrige ortografia (spellchecker);
- calcula o sentimento da entrada (biblioteca `sentiment`);
- normaliza o score para o intervalo [-1, 1];
- armazena scores em um banco SQLite (via `sequelize`);
- exibe um gráfico ASCII com o histórico de sentimento (`asciichart`).

É ideal para uso pessoal como diário de humor/sentimento no terminal.

## Recursos

- Correção básica de palavras com `spellchecker`.
- Análise de sentimento com `sentiment`.
- Persistência local em `src/journal.sqlite` via Sequelize.
- Gráfico em ASCII com cores (verde para positivo, vermelho para negativo).

## Requisitos

- Node.js: recomendado v20.20.2 (testado) — usar essa versão se possível; Node v24 apresentou problemas de compatibilidade com o pacote `spellchecker`.
- npm
- SQLite: precisa estar instalado no sistema (ex.: sqlite3). O projeto usa o driver `sqlite3` via Sequelize e grava em `src/journal.sqlite`. Exemplos de instalação:
  - Windows (Chocolatey): `choco install sqlite`
  - macOS (Homebrew): `brew install sqlite`
  - Linux (Debian/Ubuntu): `sudo apt install sqlite3`
- Sistema com ferramentas de build caso a dependência `spellchecker` precise compilar binários nativos (Windows: Visual Studio Build Tools / Build Tools for Visual Studio).

## Instalação

1. Clone o repositório:

   git clone <https://github.com/victor-hugo-ss/project-sentiment-journal.git>
   cd project-sentiment-journal

2. Instale dependências:

   npm install

## Uso

- Iniciar:

  npm run start

- Modo desenvolvimento (recarregamento automático):

  npm run dev

Ao executar, o app carrega até 100 scores salvos (se houver), exibe o gráfico e pergunta "How do you feel" para inserir uma nova entrada. O score é calculado, normalizado e salvo em `src/journal.sqlite`. Se o arquivo `src/journal.sqlite` não existir, ele será criado automaticamente na primeira execução da aplicação.

## Estrutura principal

- package.json — metadados e scripts
- src/index.js — loop principal que exibe o gráfico, pede entrada e analisa sentimento
- src/sentimentJournal.js — implementação do diário (correção, análise, persistência, gráfico)
- src/db.js — configuração do Sequelize + definição do modelo `SentimentScore`
- src/journal.sqlite — armazenamento SQLite (arquivo do banco)

## Observações e solução de problemas

- Spellchecker: a linha em código aponta para:

  ./node_modules/spellchecker/vendor/hunspell_dictionaries

  Se ocorrerem erros na instalação de `spellchecker`, verifique se as ferramentas de build do sistema estão instaladas e se o pacote adicionou os dicionários. Em alguns ambientes pode ser necessário instalar manualmente os dicionários do hunspell.

- O projeto usa módulos ES ("type": "module" no package.json). Recomenda-se Node v20.20.2 (testado). O Node v24 pode causar erros com o pacote `spellchecker`; se optar por Node 24 será necessário investigar/ajustar compatibilidade do `spellchecker` ou usar uma versão do Node compatível.

## Dependências principais

- asciichart
- sentiment
- spellchecker
- sequelize
- sqlite3
- prompt
- stopword
- natural

(veja package.json para versões exatas)

## Licença

ISC

## Contribuições

Pull requests são bem-vindos. Para mudanças maiores, abra uma issue primeiro para discutir o que pretende fazer.

---

Se quiser, adiciono um arquivo .github/workflows/CI básico ou um template de issue/PR antes de subir para o GitHub.
