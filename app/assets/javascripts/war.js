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
var rounds = 0;

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
  game_started = true;
  return false;
  rounds = 0;
}

function show_cards(player_card,computer_card) {
  $('.card').css('display','inline-block');
  $('#player_hand').css('background-image','url("/assets/cards/'+player_card+'.svg")');
  $('#computer_hand').css('background-image','url("/assets/cards/'+computer_card+'.svg")');
  $('.card').show();
}

function create_deck() {
  var deck = [];
  var suits = ['H','D','C','S'];

  for(var i=0; i<suits.length; i++) {
    for(var j=2; j<15; j++) {
      deck.push([j,suits[i]]);
    }
  }
  return deck = _.shuffle(deck);
}

function play_hand() {
  // multidimensional array
  // [value, suit], e.g. [2, 'H']
  show_cards(player_hand[0].join(''), computer_hand[0].join('') );
  $('#result').hide();
  if(player_hand[0][0] > computer_hand[0][0]) {
    player_hand.push(computer_hand.shift());
    player_hand.push(player_hand.shift());
    highlight_winning_hand('#player_hand','#computer_hand');
  }
  else if(player_hand[0][0] < computer_hand[0][0]) {
    computer_hand.push(player_hand.shift());
    computer_hand.push(computer_hand.shift());
    highlight_winning_hand('#computer_hand','#player_hand');
  }
  else {
    tie_breaker(2);
  }

  $('#players_cards').html(player_hand.length);
  $('#computers_cards').html(computer_hand.length);
  $('#total_cards').html(player_hand.length + computer_hand.length);
  check_for_winner();
  $('#rounds').html(rounds += 1);
}

function highlight_winning_hand(winner, loser) {
  $(winner).css('border','10px solid yellow').css('border-radius','15px');
  $(winner).css('-webkit-transform','scale(1.25)');
  $(loser).css('border','0px solid black');
  $(loser).css('-webkit-transform','scale(1)');
}

function tie_breaker(counter) {
  var war_player_hand = [];
  var war_comp_hand = [];
  for(var i = 0; i < counter; i++) {
    war_player_hand.push(player_hand.shift() );
    war_comp_hand.push(computer_hand.shift() );
  }
  var tie_breaker_cards = war_player_hand.concat(war_comp_hand);
  if(_.last(war_player_hand)[0] > _.last(war_comp_hand)[0]) {
    _.each(tie_breaker_cards, function(hand){player_hand.push(hand)});
  }
  else {
    _.each(tie_breaker_cards, function(hand){computer_hand.push(hand)});
  }
}

function check_for_winner() {
  var winner;
  if((player_hand.length + computer_hand.length) != 52) {
    alert('error');
  }
  if(player_hand.length == 52 || computer_hand.length == 52) {
    if(player_hand.length == 52) {
      $('#result').html('You win!').toggle();
      clearInterval(timer);
      winner = true;
    }
    else if(computer_hand.length == 52) {
      $('#result').html('The computer wins!').toggle();
      clearInterval(timer);
      winner = false;
    }
    else {
      return false;
    }
    var token = $('input[name=authenticity_token]').val();

    // send winner data via AJAX
    $.ajax({
      dataType:'json',
      type:'POST',
      url:'/games',
      data:{authenticity_token:token,result:winner}
    }).done(display_leaderboard)
  }

  function display_leaderboard(msg) {

  }



}




