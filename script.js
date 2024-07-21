window.addEventListener("DOMContentLoaded", () => {
  const squares = document.querySelectorAll(".square");
  const timeLeft = document.querySelector("#time-left");
  const score = document.querySelector("#score-left");
  const resetBtn = document.querySelector("#reset-btn");
  const resultDiv = document.querySelector(".win-box");
  const grid = document.querySelector(".grid");
  const infoDiv = document.querySelector(".info");
  const startGameDiv = document.querySelector(".start-game");
  const gameTimeInput = document.querySelector("#game-time");
  const gameScoreInput = document.querySelector("#game-score");
  const startGameBtn = document.querySelector("#start-game-btn");

  let result = 0;
  let hitPosition;
  let currentTime;
  let timerId = null;
  let countDownTimerId = null;
  let winningScore;

  resultDiv.style.display = "none";
  grid.style.display = "none";
  resetBtn.style.display = "none";
  infoDiv.style.display = "none";

  function randomSquare() {
    squares.forEach((square) => {
      square.innerHTML = "";
    });

    let randomSquare = squares[Math.floor(Math.random() * 9)];
    let marmotPngImg = document.createElement("img");
    marmotPngImg.src = "img/marmot.png";
    marmotPngImg.classList.add("marmot");
    randomSquare.appendChild(marmotPngImg);

    hitPosition = randomSquare.id;

    setTimeout(() => {
      marmotPngImg.classList.add("up");
    }, 0);

    marmotPngImg.addEventListener("mousedown", () => {
      if (randomSquare.id === hitPosition) {
        result++;
        score.textContent = result;
        hitPosition = null;
        marmotPngImg.style.display = "none";
        checkGameWin();
        checkGameLose();
      }
    });
  }

  function moveMole() {
    timerId = setInterval(randomSquare, 1000);
  }

  function countDown() {
    currentTime--;
    timeLeft.textContent = currentTime;
    checkGameWin();
    checkGameLose();
  }

  function checkGameWin() {
    if (result === winningScore) {
      clearInterval(countDownTimerId);
      clearInterval(timerId);
      squares.forEach((square) => {
        square.innerHTML = "";
      });
      resultDiv.style.display = "block";
      resultDiv.innerHTML = `You WIN !!! Your Score is: ${currentTime} sec.`;
    }
  }

  function checkGameLose() {
    if (currentTime === 0) {
      clearInterval(countDownTimerId);
      clearInterval(timerId);
      squares.forEach((square) => {
        square.innerHTML = "";
      });
      resultDiv.style.display = "block";
      resultDiv.innerHTML = `You LOSE !!! Try Again 💩`;
    }
  }

  startGameBtn.addEventListener("click", () => {
    currentTime = parseInt(gameTimeInput.value);
    winningScore = parseInt(gameScoreInput.value);
    if (
      !currentTime ||
      currentTime <= 0 ||
      !winningScore ||
      winningScore <= 0
    ) {
      alert("Please enter valid values for game time !🧐");
      return;
    }

    startGameDiv.style.display = "none";
    grid.style.display = "flex";
    resetBtn.style.display = "block";
    infoDiv.style.display = "flex";

    score.textContent = result;
    timeLeft.textContent = currentTime;
    clearInterval(timerId);
    clearInterval(countDownTimerId);
    moveMole();
    countDownTimerId = setInterval(countDown, 1000);
  });

  resetBtn.addEventListener("click", () => {
    window.location.reload();
  });
});
