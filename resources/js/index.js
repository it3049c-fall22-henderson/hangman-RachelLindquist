// START + DIFFICULTY SELECTION
const startWrapper = document.getElementById(`startWrapper`);
const difficultySelectForm = document.getElementById(`difficultySelect`);
const difficultySelect = document.getElementById(`difficulty`);

// GAME
const gameWrapper = document.getElementById(`gameWrapper`);
const guessesText = document.getElementById(`guesses`);
const wordHolderText = document.getElementById(`wordHolder`);

// GUESSING FORM
const guessForm = document.getElementById(`guessForm`);
const guessInput = document.getElementById(`guessInput`);
const guessButton = document.getElementById('guessSubmitButton'); //added

// GAME RESET BUTTON
const resetGame = document.getElementById(`resetGame`);

// CANVAS
let canvas = document.getElementById(`hangmanCanvas`);


// The following Try-Catch Block will catch the errors thrown
try {
  // Instantiate a game Object using the Hangman class.
  resetGame.classList.add('hidden');
  game = new Hangman(canvas);
  // add a submit Event Listener for the to the difficultySelectionForm
  //    get the difficulty input
  //    call the game start() method, the callback function should do the following
  //       1. hide the startWrapper
  //       2. show the gameWrapper
  //       3. call the game getWordHolderText and set it to the wordHolderText
  //       4. call the game getGuessessText and set it to the guessesText
  difficultySelectForm.addEventListener(`submit`, function (event) {
    event.preventDefault();
    let difficulty = difficultySelect.value;
    game.start(difficulty, function(){
      event.preventDefault();
      startWrapper.classList.add('hidden');
      gameWrapper.classList.remove('hidden');
      wordHolderText.innerHTML +=game.getWordHolderText();
      guessesText.innerHTML += game.getGuessesText();
      guessInput.disabled = false;
      guessButton.disabled = false;
    })
  });

  // add a submit Event Listener to the guessForm
  //    get the guess input
  //    call the game guess() method
  //    set the wordHolderText to the game.getHolderText
  //    set the guessesText to the game.getGuessesText
  //    clear the guess input field
  // Given the Guess Function calls either the checkWin or the onWrongGuess methods
  // the value of the isOver and didWin would change after calling the guess() function.
  // Check if the game isOver:
  //      1. disable the guessInput
  //      2. disable the guessButton
  //      3. show the resetGame button
  // if the game is won or lost, show an alert.
  guessForm.addEventListener(`submit`, function (e) {
    e.preventDefault();
    let input = guessInput.value;
    game.guess(input);
    wordHolderText.innerHTML = game.getWordHolderText();
    guessesText.innerHTML = game.getGuessesText();
    guessInput.value = "";

    if (game.isOver){
      guessInput.disabled = true;
      guessButton.disabled = true;
      resetGame.classList.remove('hidden');
      if (game.didWin){
        alert("Congrats you won!");
      } else {
        alert ("Boo, you lost");
      }
    }

  });

  // add a click Event Listener to the resetGame button
  //    show the startWrapper
  //    hide the gameWrapper
  resetGame.addEventListener(`click`, function (e) {
    e.preventDefault();
    startWrapper.classList.remove('hidden');
    gameWrapper.classList.add('hidden');
  });
} catch (error) {
  console.error(error);
  alert(error);
}
