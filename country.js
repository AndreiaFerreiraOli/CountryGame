export class Country {
    constructor(infoCountry){
    
        this.infoCountry = infoCountry;
        this.allAnswers = [];
        this.generateAllResponses();
    }
    generateAllResponses(){
        const translation = this.infoCountry.translations;
        const responsesArray = Object.values(translation).map(translation => translation.common.toLowerCase());
        this.allAnswers = new Set(responsesArray);
        
    }
    checkAnswer(submittedAnswer){
        const normalizedResponse = submittedAnswer.toLowerCase();
        return this.allAnswers.has(normalizedResponse);
    
    }

    displayFlag(){
        const flagElement = document.getElementById(`flag`);
        if(flagElement){
            flagElement.textContent = this.drapeau;
        }else {
            console.log(`Element not found`);
        }
        console.log(this.drapeau)
    }
    getFlag(){
        return this.infoCountry.flags.emoji;
    }
}