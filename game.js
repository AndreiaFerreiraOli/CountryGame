import { Country } from "./country.js";




export class Game {
  #score;

 constructor(allCountriesData) {
    this.#score = 0;
    this.allCountriesData = allCountriesData;
    this.currentCountryIndex = 0;
    this.currentCountry = new Country(
    this.allCountriesData[this.currentCountryIndex]
    );
    this.currentCountry.displayFlag();
  }

  getScore() {
    return this.#score;
  }

  //methode pour ajouter des points
  addPoint() {
    this.#score++;
    this.updateScoreDisplay();
  }

  //savoir si la partie est terminée
  isGameFinished() {
    return this.currentCountryIndex >= this.allCountriesData.length;
  }

  checkAnswer(submittedAnswer) {
    const isCorrect = this.currentCountry.checkAnswer(submittedAnswer);
    if (isCorrect) {
      this.addPoint() || this.nextCountry();
    }else {
        this.nextCountry();
    }
}

    nextCountry() {
        if(this.isGameFinished()) {
            return;
        }
        this.currentCountryIndex++;
        this.currentCountry = new Country(
            this.allCountriesData[this.currentCountryIndex]
        );
        this.currentCountry.displayFlag();
    }
    updateScoreDisplay() {
        const scoreElement = document.getElementById("score");
        if (scoreElement) {
            scoreElement.textContent = this.#score;
        }
    }

}
