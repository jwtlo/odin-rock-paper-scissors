function getComputerChoice() {
  let choice = Math.floor(Math.random(3) * 3  );
  switch (choice) {
    case 0:
      return "ROCK";
    case 1:
      return "PAPER";
    case 2:
      return "SCISSORS";
  }
}

function singleRound(playerSelection, computerSelection) {
  let pS = playerSelection.toUpperCase();
  let cS = computerSelection;

  if (pS === "ROCK" && cS === "SCISSORS" || pS === "PAPER" && cS === "ROCK" || pS === "SCISSORS" && cS === "ROCK") {
    return [1, "You win this round! " + pS + " beats " + cS + "."];
  } else if (pS === cS) {
    return [0, "You both selected " + pS + " ! It's a tie!"];
  } else {
    return [-1, "You lose this round... " + cS + " beats " + pS + "."];
  }

}

function playGame() {
  let playerInput = prompt("Enter rock, paper, or scissors to play the game, or q to quit.")
  while (playerInput !== 'q') {
    let [i, result] = singleRound(playerInput, (getComputerChoice()));
    console.log(result)

    playerInput = prompt("Enter rock, paper, or scissors to play again, or q to quit.")
  }
  return;
}

const btns = document.querySelectorAll(".btns-container .btn");
btns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const playerSelection = btn.textContent;
    const [i, result] = singleRound(playerSelection, getComputerChoice());
    const results = document.getElementsByClassName("result");
    results[0].textContent = result;

    const playerPtsElement = document.getElementById("player-pts");
    const computerPtsElement = document.getElementById("computer-pts");

    switch (i) {
      case 1: 
        const playerPts = +playerPtsElement.textContent;
        playerPtsElement.textContent = playerPts + 1;
        if (playerPts === 4 && results[1].textContent==="") {
          results[1].textContent = "You have won the match! Click the reset game button to play again.";
        }
        break;

      case -1:
        const computerPts = +computerPtsElement.textContent;
        computerPtsElement.textContent = computerPts + 1;
        if (computerPts === 4 && results[1].textContent==="") { 
          results[1].textContent = "You have lost the match... click the reset game button to play again.";
        }
        break;
    }
  });
})

const resetBtn = document.querySelectorAll(".btn.reset")[0];
resetBtn.addEventListener("click", () => {
  document.getElementById("player-pts").textContent = 0;
  document.getElementById("computer-pts").textContent = 0;
  const results = document.getElementsByClassName("result");
  results[0].textContent = "";
  results[1].textContent = "";
})