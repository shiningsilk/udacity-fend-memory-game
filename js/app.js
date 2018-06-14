const deck = document.querySelector('.deck');
let card = document.getElementsByClassName('card');
let cards = [...card];
let openCards = [];

const moves = document.querySelector('.moves');
let counter = 0;
let matchCounter = 0;

let second = 0;
let minute = 0;
let timer = document.querySelector('.timer');
let time;

let star = document.getElementsByClassName('fas fa-star');
let stars = [...star];
let starsTotal = 3

const message = document.querySelector('.modal');


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
  openCards.forEach(function(card) {
    card.classList.add('match');
  });
  openCards = [];
  matchCounter++;
  if (matchCounter === 8) {
    stopTimer();
    setTimeout(modal, 500);
  }
}

// cards don't match
function noMatch() {
  openCards.forEach(function(card) {
    card.classList.remove('open', 'show', 'disabled');
  });
  openCards = [];
}

// count moves
function countMoves() {
  counter++;
  moves.innerText = counter;
}

// remove stars
function removeStars() {
  if (counter > 8) {
    stars[0].classList.replace('fas', 'far');
    starsTotal = 2;
   }
  if (counter > 16) {
    stars[1].classList.replace('fas', 'far');
    starsTotal = 1;
  }
  if (counter > 24) {
    stars[2].classList.replace('fas', 'far');
    starsTotal = 0;
  }
}

// flip and check for matches
function flip () {
  openCards.push(this);
  if (openCards.length <= 2) {
  this.classList.add('open', 'show', 'disabled');
  }
  if (openCards.length === 2) {
    if (openCards[0].innerHTML === openCards[1].innerHTML) {
      match();
    }
    else {
      setTimeout(noMatch, 500);
    }
    countMoves();
    removeStars();
  }
}

// timer functions
function startTimer() {
  time = setInterval(timePlayed, 1000);
}

function timePlayed() {
   second++;
   if (second < 10) {
     second = `0${second}`;
   }
   if (second == 60) {
      minute++;
      second = '00';
    }
  timer.innerHTML = `${minute}:${second}`;
}

function stopTimer() {
  clearInterval(time);
  second = 0;
  minute = 0;
}

// Reset game
function newGame() {
  // reset score
  moves.innerText = 0;
  counter = 0;
  matchCounter = 0;
  starsTotal = 3;
  stars.forEach(function(star) {
    star.classList.replace('far', 'fas');
  });
  // reset timer
  stopTimer();
  timer.innerHTML = "0:00";
  // shuffle cards and add to deck
  shuffle(cards);
  cards.forEach(function(card) {
    card.classList.remove('match', 'show', 'open', 'disabled');
    deck.appendChild(card);
  });
  // start timer
  deck.addEventListener('click', startTimer, {once:true});
}

// Modal
function modal() {
  message.classList.toggle('hide');
  document.querySelector('.final-moves').innerText = counter;
  document.querySelector('.final-time').innerHTML = timer.innerHTML;
  document.querySelector('.final-stars').innerHTML = starsTotal;
}

document.querySelector('.play-again').addEventListener('click', function() {
  message.classList.toggle('hide');
  newGame();
});

document.querySelector('.close').addEventListener('click', function() {
  message.classList.toggle('hide');
});

// Play Game
newGame();

cards.forEach(function(card) {
  card.addEventListener('click', flip);
});

document.querySelector('.restart').addEventListener('click', newGame);

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
