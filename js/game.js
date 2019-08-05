const maxHits = 10;

let hits = 0,
    misses = 0,
    firstHitTime = 0;

function round() {
  // FIXME: надо бы убрать "target" прежде чем искать новый
  $(".game-field").removeClass("target");
  $(".game-field").removeClass("miss");
  // FIXME: убирать текст со старых таргетов. Кажется есть .text?
  $(".game-field").text("");
  let divSelector = randomDivId();
  $(divSelector).addClass("target");
  // TODO: помечать target текущим номером
  $(divSelector).text(hits + 1);
  // FIXME: тут надо определять при первом клике firstHitTime
  if(firstHitTime == 0)
    firstHitTime = getTimestamp();
  if (hits === maxHits) {
    endGame();
  }
}

function endGame() {
  // FIXME: спрятать игровое поле сначала
  $(".game-field").css("display", "none");
  let totalPlayedMillis = getTimestamp() - firstHitTime;
  let totalPlayedSeconds = Number(totalPlayedMillis / 1000).toPrecision(3);
  $("#total-time-played").text(totalPlayedSeconds);
  $("#total-hits").text(hits - misses);

  $("#win-message").removeClass("d-none");
}

function handleClick(event) {
  if ($(event.target).hasClass("target")) {
    hits = hits + 1;
    round();
  }else{
    $(event.target).addClass("miss");
    misses += 1;
    $(event.target).text("-" + misses); // TODO: как-то отмечать если мы промахнулись? См CSS класс .miss
  }
}

function init() {
  // TODO: заказчик просил отдельную кнопку, запускающую игру а не просто по загрузке
  if(firstHitTime != 0){
    $("#button-reload").text("Играть заново");
    round();
    $(".game-field").click(handleClick);
    $("#button-reload").click(function() {
      location.reload();
    });
  }else{
    $("#button-reload").text("Начать игру!");
    $("#button-reload").click(function() {
      round();
      init();
    }); 
  } 
}

$(document).ready(init);
