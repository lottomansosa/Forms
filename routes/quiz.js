const express = require('express');
const router = express.Router();
const {readFile} = require('fs').promises;
 
router.post("/", async (req, res)=>{
    let {userChoice, correctDef, totalQuestions, totalCorrect} = req.body;
 
    // Convert to numbers since form data comes in as strings
    totalQuestions = parseInt(totalQuestions) + 1;
    totalCorrect = parseInt(totalCorrect);
 
    // Check if the user got it right
    let isCorrect = userChoice === correctDef;
    if(isCorrect){
        totalCorrect++;
    }
 
    // Get a new set of words for the next question
    let chosenWords = await getWords();
 
    // Send everything back to the page
    res.render('quiz', {chosenWords, totalQuestions, totalCorrect, isCorrect, correctDef});
});
 
router.get("/", async (req, res) =>{
    let chosenWords = await getWords();
    console.log("Chosen Words: ", chosenWords);
    // No result to show on first load
    res.render('quiz', {chosenWords, totalQuestions: 0, totalCorrect: 0, isCorrect: null, correctDef: null});
});
 
let getWords = async ()=>{
    console.log("Getting random Part!")
    let randomPart = getRandomPart();
    console.log("Random part: ", randomPart);
    let allWords = await readFile('resources/allwords.txt', 'utf8');
    let wordArray = allWords.split('\n');
    shuffle(wordArray);
 
    let choices = [];
    while(choices.length < 5){
        let line = wordArray.pop();
        let tokens = line.split('\t');
        let word = tokens[0];
        let part = tokens[1];
        let def = tokens[2];
        if(part === randomPart){
            choices.push(line);
        }
    }
    return choices;
}
 
let getRandomPart = ()=>{
    let parts = ['noun', 'verb', 'adjective'];
    let randomIndex = Math.floor(Math.random()*parts.length);
    return parts[randomIndex];
}
 
let shuffle = (array)=>{
    for(let i = array.length-1; i > 0; i--){
        let randomNumber = Math.floor(Math.random()*(i+1));
        [array[i], array[randomNumber]] = [array[randomNumber], array[i]];
    }
    console.log("Array shuffled!");
}
 
module.exports = router;