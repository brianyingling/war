$(function() {
  $('#startgame').click(start_game);
  $('#playhand').click(play_hand);
  $('#speedplay').click(speed_play);


});

var player_hand = [];
var computer_hand = [];
var game_started = false;
var timer;
var c = 0;

// plays until a winner
function speed_play() {
  start_game();
  timer = setInterval(play_hand,1);
}


function start_game() {
  deck = create_deck();
  player_hand = deck.slice(0,26);
  computer_hand = deck.slice(26,52);
  play_hand();
  show_cards();
  game_started = true;
  return false;
}

function show_cards() {
  $('.card').css('display','inline-block');
  $('.card').show();
}

function create_deck() {
  var deck = [];
  var suits = ['H','D','C','S'];

  for(var i=0; i<suits.length; i++) {
    for(var j=0; j<13; j++) {
      deck.push([j,suits[i]]);
    }
  }
  return deck = _.shuffle(deck);
}

function play_hand() {
  // reveal cards
  $('#player_hand').text(player_hand[0]);
  $('#computer_hand').text(computer_hand[0]);
  if(player_hand[0][0] > computer_hand[0][0]) {
    player_hand.push(computer_hand.shift());
    player_hand.push(player_hand.shift());
  }
  else {
    computer_hand.push(player_hand.shift());
    computer_hand.push(computer_hand.shift());

  }
  $('#players_cards').html(player_hand.length);
  $('#computers_cards').html(computer_hand.length);
  check_for_winner();
  c++;
}

function check_for_winner() {
  if(player_hand.length == 52) {
    alert('player wins!');
    clearInterval(timer);
  } else if(computer_hand.length == 52) {
    alert('computer wins!');
    clearInterval(timer);
  } else {
    return false;
  }
}




