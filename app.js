"use strict";

// 요소 selecting
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const score0El = document.querySelector("#score--0");
const score1El = document.getElementById("score--1");
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");

const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

let scores, currentScore, activePlayer, playing;

// Starting conditions 새로운 게임이 시작되는 화면 함수 구현
const init = function () {
  scores = [0, 0]; //배열로 선언 플레이어1=[0]. 플레이어2=[1]
  currentScore = 0; //1턴 현재의 값
  activePlayer = 0; //게임 진행중인 플레이어
  playing = true; //게임 종료 시 false

  score0El.textContent = 0; //전체 합산 스코어
  score1El.textContent = 0;
  current0El.textContent = 0; //현재 합산 스코어
  current1El.textContent = 0;

  diceEl.classList.add("hidden"); //display:none
  player0El.classList.remove("player--winner"); //우승 시 보여지는 css
  player1El.classList.remove("player--winner");
  player0El.classList.add("player--active"); //게임진행중인 플레이어 css
  player1El.classList.remove("player--active");
};
init();

//플레이어 전환하는 기능
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0; //현재 스코어
  currentScore = 0; //1턴 주사위 값
  activePlayer = activePlayer === 0 ? 1 : 0; //진행 플레이어 전환
  player0El.classList.toggle("player--active"); //진행 플레이어 css 전환
  player1El.classList.toggle("player--active");
};

// 주사위 기능
btnRoll.addEventListener("click", function () {
  if (playing) {
    // 1. 랜덤 주사위
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2. 주사위 이미지 display
    diceEl.classList.remove("hidden");
    diceEl.src = `./assets/dice-${dice}.png`;

    // 3. 주사위 1, 2 따로 처리
    if (dice !== 1 && dice !== 2) {
      // 현재 스코어 점수 합산 기능
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // 1, 2 나올 경우 플레이어 전환
      switchPlayer();
    }
  }
});

btnHold.addEventListener("click", function () {
  if (playing) {
    // 1. 현재 합산 스코어를 전체 합산 스코어에 더해주는 기능
    scores[activePlayer] += currentScore;
    // scores[1] = scores[1] + currentScore

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2. 전체 합산 스코어 >= 50
    if (scores[activePlayer] >= 50) {
      // 게임 종료
      playing = false;
      diceEl.classList.add("hidden");

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");

      document.querySelector(`#current--${activePlayer}`).textContent =
        "우승!🎉";
    } else {
      // 50보다 작은 경우 플레이어 전환
      switchPlayer();
    }
  }
});

btnNew.addEventListener("click", init);
