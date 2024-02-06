import { shuffle } from "lodash";
import { Game } from "./game.js";

const form = document.querySelector("form");
const input = document.querySelector("input");
const scoreElement = document.getElementById("score");
const highscoreElement = document.getElementById("highscore");
const flagElement = document.getElementById("flag");

const getCountries = async () => {
  try {
    const response = await fetch(`https://restcountries.com/v3.1/all`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

const startGame = async () => {
  const countriesData = await getCountries();
  const shuffleCountries = shuffle(countriesData);

  const game = new Game(shuffleCountries);

  updateScore(game.getScore());

  const highscore = localStorage.getItem("highscore");
  updateHighscore(highscore);

  const form = document.getElementById("guess-form");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const submittedAnswer = form.answer.value.toLowerCase();

    game.checkAnswer(submittedAnswer);

    if (game.isGameFinished()) {
      alert("Partie terminée ! Votre score final est : " + game.getScore());

      const currentHighscore = parseInt(localStorage.getItem("highscore")) || 0;
      if (game.getScore() > currentHighscore) {
        localStorage.setItem("highscore", game.getScore());
        updateHighscore(game.getScore());
      }

      form.reset();
    } else {
      game.nextCountry();
    }

    updateScore(game.getScore());
  });
};

const updateScore = (score) => {
  scoreElement.innerHTML = `<h1>Score: ${score}</h1>`;
};

const updateHighscore = (highscore) => {
  highscoreElement.innerHTML = `<h1>Highscore: ${highscore}</h1>`;
};

startGame();
