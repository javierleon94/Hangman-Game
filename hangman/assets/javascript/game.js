var gameWords = ['', 'avocado', 'waffles', 'weed', 'marijuana', 'blossoms', 'mitsubishi', 'tequila',
  'tomato', 'laptop', 'orange', 'kiwi', 'princess', 'lettuce', 'sandwich', 'rosaparks',
];
var blanksAndSuccess = []; 
var blanks = 0; 
var currentWord = "";
var currentLetters = [];

var winCounter = 0;
var lossCounter = 0;
var numGuesses = 12;

var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j',
  'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'
];

var guessedLetter = [];
var correctLetter = [];
var incorrectGuess = [];


var buttons = function() {

  var myButtons = document.getElementById('alphabet-btns');

  var letters = document.createElement('ul');



  for (var i = 0; i < alphabet.length; i++) {

    let listItem = document.createElement('li');

    listItem = document.createElement('BUTTON');
    listItem.classList.add('btn-primary');

    listItem.innerHTML = alphabet[i];

    myButtons.appendChild(listItem);
    listItem.dataset.alphabet = alphabet[i];


    listItem.onclick = function() {
      var userGuess = listItem.dataset.alphabet;     
      guessedLetter.push(userGuess);
      document.getElementById('guessed').innerHTML = "Letters Already Guessed: " + guessedLetter.join(" ");
      checkLetters(userGuess);  
      round();
    }

  }
}

document.getElementById("gameStart").onclick = function() {buttons()};



function startGame() {
  numGuesses = 12;
  blanksAndSuccess = [];
  guessedLetter = [];
  incorrectGuess = [];

  currentWord = gameWords[Math.floor(Math.random() * gameWords.length)];


  currentLetters = currentWord.split("");


  blanks = currentLetters.length;
  for (var i = 0; i < blanks; i++) {
    blanksAndSuccess.push("_")
  }
  console.log(currentWord);
  document.getElementById('currentWord').innerHTML = "Find the missing letters: " + blanksAndSuccess.join(" ");
  document.getElementById('guessesRemaining').innerHTML = "Guesses left: " + numGuesses;
  document.getElementById('guessed').innerHTML = "Letters already guessed: "
}

function checkLetters(letter) {
  var letterInWord = false;
  for (var i = 0; i < blanks; i++) {
    if (currentWord[i] == letter) {
      letterInWord = true;
    }
  }
  if (letterInWord) {
    for (var i = 0; i < blanks; i++) {

      if (currentWord[i] == letter) {
        blanksAndSuccess[i] = letter
      }
    }

  } else {
    incorrectGuess.push(letter);
    numGuesses--;
  }
}

function round() {

  console.log("WinCount: " + winCounter + " | LossCount: " + lossCounter + " | NumGuesses: " + numGuesses);

  document.getElementById("guessesRemaining").innerHTML = "Number Of Guesses Remaining: " + numGuesses;
  document.getElementById("currentWord").innerHTML = "Find the missing letters: " + blanksAndSuccess.join(" ");
  document.getElementById("guessed").innerHTML = "Letters already guessed: " + incorrectGuess.join(" ");

  if (currentLetters.toString() == blanksAndSuccess.toString()) {
    winCounter++; 
    alert("You're a Genius! The word was " + currentWord); 

    document.getElementById("winCounter").innerHTML = "Champ you won " + winCounter + " game(s)";
    startGame(); 
  }

  
  else if (numGuesses == 0) {
    lossCounter++; 

    alert("Loser. The word was " + currentWord); 

    document.getElementById("lossCounter").innerHTML = "You took L's " + lossCounter + " Time(s)";
    startGame(); 
  }
}

startGame();