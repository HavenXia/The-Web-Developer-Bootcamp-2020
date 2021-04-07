let jokes = require("give-me-a-joke")
let colors = require("colors")
//这是一个call back function
jokes.getRandomDadJoke(function (joke) {
    console.log(joke.rainbow);
})


