# 📔 Sentiment Journal

> Diário de humor no terminal — registre como você se sente e visualize seu histórico em um gráfico ASCII colorido.

---

## O que é?

Sentiment Journal é um CLI escrito em Node.js que:

- Recebe entradas de texto do usuário
- Corrige ortografia via `spellchecker`
- Analisa o sentimento da entrada com a biblioteca `sentiment`
- Normaliza o score para o intervalo **[-1, 1]**
- Persiste os dados em um banco SQLite local via `sequelize`
- Exibe um gráfico ASCII com o histórico de sentimento (verde = positivo, vermelho = negativo)

---

## Requisitos

| Requisito       | Detalhes                                                                          |
| --------------- | --------------------------------------------------------------------------------- |
| **Node.js**     | v20.20.2 recomendado (testado). Node v24 pode causar problemas com `spellchecker` |
| **npm**         | Qualquer versão recente                                                           |
| **SQLite**      | Precisa estar instalado no sistema                                                |
| **Build tools** | Necessário se `spellchecker` precisar compilar binários nativos                   |

### Instalando o SQLite

```bash
# Windows (Chocolatey)
choco install sqlite

# macOS (Homebrew)
brew install sqlite

# Linux (Debian/Ubuntu)
sudo apt install sqlite3
```

### Build tools (Windows)

Instale o **Visual Studio Build Tools** caso a instalação do `spellchecker` falhe por falta de ferramentas de compilação nativa.

---

## Instalação

```bash
# 1. Clone o repositório
git clone https://github.com/victor-hugo-ss/project-sentiment-journal.git
cd project-sentiment-journal

# 2. Instale as dependências
npm install
```

---

## Uso

```bash
# Iniciar
npm start

# Modo desenvolvimento (recarregamento automático)
npm run dev
```

Ao executar, o app:

1. Carrega até **100 scores** salvos anteriormente
2. Exibe o gráfico ASCII com o histórico
3. Pergunta `"How do you feel?"` para uma nova entrada
4. Calcula, normaliza e salva o score em `src/journal.sqlite`

> O arquivo `src/journal.sqlite` é criado automaticamente na primeira execução, caso não exista.

---

## Estrutura do projeto

```
sentiment_journal/
├── package.json              # Metadados e scripts npm
└── src/
    ├── index.js              # Loop principal (gráfico → entrada → análise)
    ├── sentimentJournal.js   # Correção, análise, persistência e gráfico
    ├── db.js                 # Configuração do Sequelize e modelo SentimentScore
    └── journal.sqlite        # Banco de dados local (gerado automaticamente)
```

---

## Dependências principais

| Pacote         | Função                             |
| -------------- | ---------------------------------- |
| `sentiment`    | Análise de sentimento do texto     |
| `spellchecker` | Correção ortográfica básica        |
| `sequelize`    | ORM para persistência no SQLite    |
| `sqlite3`      | Driver SQLite                      |
| `asciichart`   | Renderização do gráfico ASCII      |
| `prompt`       | Leitura de input no terminal       |
| `stopword`     | Remoção de stopwords               |
| `natural`      | Processamento de linguagem natural |

> Veja o `package.json` para as versões exatas.

---

## Solução de problemas

**Erro com `spellchecker`**

O pacote aponta para dicionários em:

```
./node_modules/spellchecker/vendor/hunspell_dictionaries
```

Se a instalação falhar, verifique se as ferramentas de build estão instaladas. Em alguns ambientes pode ser necessário instalar os dicionários do hunspell manualmente.

**Erro de importação (ESM vs CommonJS)**

O projeto usa `"type": "module"` no `package.json`. Para importar o `spellchecker` corretamente:

```js
// ❌ Errado
import { Spellcheck } from "spellchecker";

// ✅ Correto
import Spellcheck from "spellchecker";
```

**Incompatibilidade com Node v24**

Use o Node.js **v20.20.2** (versão testada). O Node v24 pode causar erros de compatibilidade com o `spellchecker`. Se precisar usar o Node v24, será necessário investigar alternativas para esse pacote.

---

## Licença

**ISC** — veja o arquivo `LICENSE` para detalhes.

---

## Contribuições

Pull requests são bem-vindos!
Para mudanças maiores, abra uma **issue** primeiro para discutir o que pretende alterar.
