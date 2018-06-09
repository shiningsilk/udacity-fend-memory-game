// cards
const deck = document.querySelector('.deck');
let card = document.getElementsByClassName('card');
let cards = [...card];
let openCards = [];

// reset
const restart = document.querySelector('.restart');

// counter
const moves = document.querySelector('.moves');
let counter = 0;
let matchCounter;

// timer
let second = 0;
let minute = 0;
let timer = document.querySelector('.timer');
let time;

// ratings
let star = document.querySelectorAll(".fa fa-star");
let stars = [...star];


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

// cards match
function match() {
  openCards[0].classList.add('match');
  openCards[1].classList.add('match');
  openCards = [];
  matchCounter++;
  if (matchCounter === 8) {
    stopTimer();
  }
}

// cards don't match
function noMatch() {
  openCards[0].classList.remove('open', 'show');
  openCards[1].classList.remove('open', 'show');
  openCards = [];
}

// moves
function countMoves() {
  counter++;
  moves.innerText = counter;
}

// flip and check for matches
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

// Reset game
function newGame() {
  // reset moves
  moves.innerText = 0;
  counter = 0;
  matchCounter = 0;
  // reset timer
  stopTimer();
  timer.innerHTML = "0 mins 0 secs";
  // shuffle
  shuffle(cards);
  cards.forEach(function(card) {
    card.classList.remove('match', 'show', 'open');
    deck.appendChild(card);
  });
  // start timer 
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
