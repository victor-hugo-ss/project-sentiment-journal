import Sentiment from "sentiment";
import Spellcheck from "spellchecker";
import { sentimentScore } from "./db.js";
import prompt from "prompt";
import asciichart from "asciichart";

const charConfig = {
  min: -1,
  max: 1,
  height: 10,
};

prompt.start({});
prompt.message = "";

Spellcheck.setDictionary(
  "en-US",
  "./node_modules/spellchecker/vendor/hunspell_dictionaries",
);

class SentimentJournal {
  constructor() {
    this.sentiment = new Sentiment();
    this.scores = [0];
    this.entry = "";
  }

  correctSpelling(inputString) {
    const words = inputString.split(" ");
    const corrections = [];
    for (let word of words) {
      if (Spellcheck.isMisspelled(word)) {
        const options = Spellcheck.getCorrectionsForMisspelling(word);
        corrections.push(options[0]);
      } else {
        corrections.push(word);
      }
    }
    return corrections.join(" ");
  }

  async saveScore(score) {
    await sentimentScore.create({ score });
  }

  async fetchEntries() {
    const results = await sentimentScore.findAll({ limit: 100 });
    if (results.length) {
      this.scores = results.map(({ score }) => score);
    }
  }

  async analyzeSentiment() {
    if (!this.entry || this.entry === "") return;
    const { score } = this.sentiment.analyze(this.entry);
    const normalizedScore = Math.min(Math.max(score / 10, -1), 1);
    await this.saveScore(normalizedScore);
    this.scores.push(normalizedScore);
  }

  async promptEntry() {
    const { response } = await prompt.get([
      {
        name: "response",
        description: "\nHow do you feel",
      },
    ]);
    this.entry = this.correctSpelling(response);
  }

  setChartColor() {
    if (!this.scores.length) return;
    const recentScore = this.scores[this.scores.length - 1];
    if (recentScore < 0) {
      charConfig.colors = [asciichart.red];
    } else {
      charConfig.colors = [asciichart.green];
    }
  }

  printChart() {
    console.clear();
    this.setChartColor();
    console.log(asciichart.plot([this.scores], charConfig));
  }
}

export default SentimentJournal;
