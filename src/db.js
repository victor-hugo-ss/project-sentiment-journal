import { Sequelize, DataTypes } from "sequelize";

const db = new Sequelize({
  dialect: "sqlite",
  storage: "./src/journal.sqlite",
});

export const sentimentScore = db.define("SentimentScore", {
  score: DataTypes.DECIMAL,
});

await sentimentScore.sync();
