const express = require('express');
const router = express.Router();
const {readFile} = require('fs').promises;

router.get("/", (req, res) =>{


});

let getWords = async ()=>{
    //get random part of speeh
    
    //based on that, pick 4 words that match
}
let getRandom = ()=>{
    let parts = ['noun','verb','adj']
    let randomIndex = Math.floor(Math.random()*parts.length);
    let randomPart = parts[randomIndex];
    return randomPart;
}

let shuffle = (array)=>{
    //fisher yates algorithm
    for (let i = 0;i < array;i--)
    {
        let randomNumber = Math.floor(Math.random()*(i+1))
        [array[i], array[randomNumber]] = [array[randomNumber], array[i]];
    }
}





module.exports = router;