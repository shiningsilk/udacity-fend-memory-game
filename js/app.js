/*
 * Create a list that holds all of your cards
 */
 // List containing all cards
 let card = document.getElementsByClassName('card');
 let cards = [...card];
 const deck = document.querySelector('.deck');
 const restart = document.querySelector('.restart');

 // Array of open cards
 let openCards = [];

 // counter
 const moves = document.querySelector('.moves');
 let counter = 0;
 let matchCounter;

 let star = document.querySelectorAll(".fa fa-star");
 let stars = [...star];


// timer
let second = 0;
let minute = 0;
let timer = document.querySelector('.timer');
let time;
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function match() {
  openCards[0].classList.add('match');
  openCards[1].classList.add('match');
  openCards = [];
  matchCounter++;
  if (matchCounter === 8) {
    stopTimer();
  }
}

function noMatch() {
  openCards[0].classList.remove('open', 'show');
  openCards[1].classList.remove('open', 'show');
  openCards = [];
}

function countMoves() {
  counter++;
  moves.innerText = counter;
}

function flip () {
  openCards.push(this);
  if (openCards.length <= 2) {
  this.classList.add('open', 'show');
  }
  if (openCards.length === 2) {
    countMoves();
    if (openCards[0].innerHTML === openCards[1].innerHTML) {
      match();
    }
    else {
      setTimeout(noMatch, 500);
    }
  }
}


// Timer functions
// timer functions
function startTimer() {
  time = setInterval(timePlayed, 1000);
}

function timePlayed() {
   second++;
   if (second == 60) {
      minute++;
      second = 0;
    }
  timer.innerHTML = `${minute} mins ${second} secs`;
}

function stopTimer() {
  clearInterval(time);
  second = 0;
  minute = 0;
}


// Restart game
function newGame() {
  moves.innerText = 0;
  counter = 0;
  matchCounter = 0;
  timer.innerHTML = "0 mins 0 secs";
  stopTimer();
  shuffle(cards);
  cards.forEach(function(card) {
    card.classList.remove('match', 'show', 'open');
    deck.appendChild(card);
  });
  deck.addEventListener('click', startTimer, {once:true});
}

// Play Game
newGame();

cards.forEach(function(card) {
  card.addEventListener('click', flip);
});

restart.addEventListener('click', newGame);

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
