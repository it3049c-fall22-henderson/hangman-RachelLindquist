class Hangman {
  constructor(_canvas) {
    if (!_canvas) {
      throw new Error(`invalid canvas provided`);
    }

    this.canvas = _canvas;
    this.ctx = this.canvas.getContext(`2d`);
  }

  /**
   * This function takes a difficulty string as a patameter
   * would use the Fetch API to get a random word from the Hangman
   * To get an easy word: https://hangman-micro-service-bpblrjerwh.now.sh?difficulty=easy
   * To get an medium word: https://hangman-micro-service-bpblrjerwh.now.sh?difficulty=medium
   * To get an hard word: https://hangman-micro-service-bpblrjerwh.now.sh?difficulty=hard
   * The results is a json object that looks like this:
   *    { word: "book" }
   * */
  //TODO FIX ME, return fetch isnt working correctly
  getRandomWord(difficulty) {
    //return fetch(
      // had to change link, couldn't pull from previous one
      //`https://hangman-micro-service.herokuapp.com/?difficulty=${difficulty}` 
      //'https://hangman-micro-service.herokuapp.com/?difficulty=easy'
    //)
    //return "moo";
      //.then((r) => r.json())
      //.then((r) => r.word);
  }

  /**
   *
   * @param {string} difficulty a difficulty string to be passed to the getRandomWord Function
   * @param {function} next callback function to be called after a word is reveived from the API.
   */
  start(difficulty, next) {
    // get word and set it to the class's this.word
    this.word = this.getRandomWord(difficulty);
    // clear canvas
    this.clearCanvas();
    // draw base
    this.drawBase();
    // reset this.guesses to empty array
    this.guesses = [];
    // reset this.isOver to false
    this.isOver = false;
    // reset this.didWin to false
    this.didWin = false;
    next();
  }

  /**
   *
   * @param {string} letter the guessed letter.
   */
  guess(letter) {
    // Check if nothing was provided and throw an error if so
    // Check for invalid cases (numbers, symbols, ...) throw an error if it is
    // Check if more than one letter was provided. throw an error if it is.
    // if it's a letter, convert it to lower case for consistency.
    if (letter.length === 1 && letter.match(/[a-z]/i)){
      letter = letter.toLowerCase();
      // check if this.guesses includes the letter. Throw an error if it has been guessed already.
      if (this.guesses.includes(letter)){
        throw 'letter already guessed';
      } else {
        // add the new letter to the guesses array.
        this.guesses.push(letter);
        // check if the word includes the guessed letter:
        if (this.word.includes(letter) === true){
          //    if it's is call checkWin()
          this.checkWin();
        } else {
          //    if it's not call onWrongGuess()
          this.onWrongGuess();
        }
      }
    }else if (!letter){
      throw 'nothing provided';
    } else if (letter.isNan()){
      throw 'cant guess a number';
    } else if (letter.length > 1){
      throw 'only 1 letter allowed';
    } else {
      throw 'cant guess a symbol';
    }
  }

  checkWin() {
    // using the word and the guesses array, figure out how many remaining unknowns.
    // if zero, set both didWin, and isOver to true
    let found = 0;
    for (let i = 0; i < this.guesses.length; i++){
      for (let j = 0; j < this.word.length; j++){
        if (this.word[j] === this.guesses[i]){
          found ++;
        }
      }
    }
    if (this.word.length - found === 0){
      this.didWin = true;
      this.isOver = true;
    }
  }

  /**
   * Based on the number of wrong guesses, this function would determine and call the appropriate drawing function
   * drawHead, drawBody, drawRightArm, drawLeftArm, drawRightLeg, or drawLeftLeg.
   * if the number wrong guesses is 6, then also set isOver to true and didWin to false.
   */
  onWrongGuess() {
    let wrongGuess = 0;
    for (let i = 0; i < this.guesses.length; i++){
      if (!this.word.includes(this.guesses[i])){
        wrongGuess ++;
      }
    }
    if (wrongGuess === 1){
      this.drawHead();
    } else if (wrongGuess === 2){
      this.drawBody();
    } else if (wrongGuess === 3){
      this.drawRightArm();
    } else if (wrongGuess === 4){
      this.drawLeftArm();
    } else if (wrongGuess == 5){
      this.drawRightLeg();
    } else if (wrongGuess == 6){
      this.drawLeftLeg();
      this.isOver = true;
      this.didWin = false;
    }
  }

  /**
   * This function will return a string of the word placeholder
   * It will have underscores in the correct number and places of the unguessed letters.
   * i.e.: if the word is BOOK, and the letter O has been guessed, this would return _ O O _
   */
  getWordHolderText() {
    let placeholder = "";
    for (let i =0; i < this.word.length; i++){
      if (!this.guesses.includes(this.word[i]) === true){
        placeholder+="_ ";
      } else {
        placeholder+=this.word[i] + " ";
      }
    }
    return placeholder;
  }

  /**
   * This function returns a string of all the previous guesses, seperated by a comma
   * This would return something that looks like
   * (Guesses: A, B, C)
   * Hint: use the Array.prototype.join method.
   */
  getGuessesText() {
    return "Guesses: " + this.guesses.join(", ");
  }

  /**
   * Clears the canvas
   */
  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  /**
   * Draws the hangman base
   */
  drawBase() {
    this.ctx.fillRect(95, 10, 150, 10); // Top
    this.ctx.fillRect(245, 10, 10, 50); // Noose
    this.ctx.fillRect(95, 10, 10, 400); // Main beam
    this.ctx.fillRect(10, 410, 175, 10); // Base
  }

  drawHead() {
    this.ctx.beginPath();
    this.ctx.arc(250,90,30,0, 2*Math.PI, true);
    this.ctx.stroke();
    this.ctx.closePath();
  }

  drawBody() {
    this.ctx.fillRect(245,120,5,80); //150
  }

  drawLeftArm() {
    this.ctx.fillRect(180,140,65,5);
  }

  drawRightArm() {
    this.ctx.fillRect(245,140,65,5);
  }

  drawLeftLeg() {
    this.ctx.fillRect(180,195,65,5);
  }

  drawRightLeg() {
    this.ctx.fillRect(245,195,65,5);
  }
}
