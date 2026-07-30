// Log a message to the console to ensure the script is linked correctly
console.log('JavaScript file is linked correctly.');

// === VARIABLES ===

// Screens
const startScreen = document.getElementById("startScreen");
const gameScreen = document.getElementById("gameScreen");

// Buttons
const startBtn = document.getElementById("startBtn");
const flowBtn = document.getElementById("flowBtn");

// Displays
const levelDisplay = document.getElementById("levelCount");
const moveDisplay = document.getElementById("moveCount");
const scoreDisplay = document.getElementById("scoreCount");

// Game Tiles
const tiles = document.querySelectorAll(".tile");
const pipes = document.querySelectorAll(".pipe");
const pipeConnections = {
  straight: {
    top: true,
    right: false,
    bottom: true,
    left: false
  },
  corner: {
    top: true,
    right: true,
    bottom: false,
    left: false
  }
};

// Game Variables
const levels = [
  {
    // Level 1
    layout: [
      "corner",
      "straight",
      "corner",
      "straight",
      "straight",
      "corner",
      "corner"
    ],
    solution: [180, 0, 0, 0, 0, 0, 0]
  },
  {
    // Level 2
    layout: [
      "straight",
      "corner",
      "straight",
      "corner",
      "straight",
      "straight",
      "corner"
    ],
    solution: [90, 180, 0, 0, 0, 0, 0]
  },
  {
    layout: [
      "straight",
      "corner",
      "corner",
      "straight",
      "corner",
      "corner",
      "straight"
    ],
    solution: [90, 180, 90, 90, 270, 0, 90]
  }
];
const facts = [
    "Charity: water fact 1",
    "Charity: water fact 2",
    "Charity: water fact 3"
];
let level = 1;
let moves = 0;
let score = 0;

// === INITIALIZE GAME ===
gameScreen.style.display = "none";
updateDisplay();
loadLevel();


// === Event Listeners ===
startBtn.addEventListener("click", startGame);
flowBtn.addEventListener("click", startFlow);


// === GAME FUNCTIONS ===

// switch from start to game screen
function startGame() {
  startScreen.style.display = "none";
  gameScreen.style.display = "block";
  console.log("Game Started")
}

// update level/move/score values
function updateDisplay() {
  levelDisplay.textContent = level;
  moveDisplay.textContent = moves;
  scoreDisplay.textContent = score;
}

// load the current level's pipe layout and reset moves
function loadLevel() {
  const currentLevel = levels[level - 1];
  for(let i = 0; i < pipes.length; i++) {
    // change pipe types
    pipes[i].className = "pipe";
    pipes[i].classList.add(currentLevel.layout[i]);
    // reset rotation value
    pipes[i].parentElement.dataset.rotation = 0;
    // reset rotation style
    pipes[i].style.transform = "rotate(0deg)";
  }
  moves = 0;
  updateDisplay();
}

// when tile is clicked, rotate 90, update moves
tiles.forEach(function(tile){ 
  tile.dataset.rotation = 0; 
  tile.addEventListener("click", function(){ 
    let rotation = Number(tile.dataset.rotation); 
    rotation += 90; 
    if(rotation >= 360){ 
      rotation = 0; 
    } 
    tile.dataset.rotation = rotation; 
    tile.querySelector(".pipe").style.transform = `rotate(${rotation}deg)`; 
    moves++; 
    updateDisplay(); 
    console.log("Tile Rotated!"); 
  }); 
});

function rotateConnections(pipe) {
  return {
    top: pipe.left,
    right: pipe.top,
    bottom: pipe.right,
    left: pipe.bottom
  };
}

// check if the current pipe configuration matches the solution
function startFlow() {
  console.log("Starting water flow... ");
  const pipeTiles = document.querySelectorAll(".pipe");
  const currentSolution = levels[level - 1].solution;
  let won = true;
  for (let i = 0; i < pipeTiles.length; i++) {
    const rotation = Number(pipeTiles[i].parentElement.dataset.rotation);
    console.log("Pipe", i,"Rotation:", rotation,"Expected:", currentSolution[i]);
    if (rotation != currentSolution[i]) {
      won = false;
    }
  };
  console.log(won ? "All pipes are correctly oriented!" : "Some pipes are incorrectly oriented.");
  endGame(won);
}

function endGame(won) {
  if (won) {
    score += 100; // TODO: update scoring logic
    moves = 0;    // Reset moves for the next level
    if(level < levels.length){
      level++;
      loadLevel();
    } else {
      alert("You've completed all levels!🏆");
      level = 1; // Reset to level 1 for replayability
    }
    alert("Congratulations! You've successfully connected the pipes!🎉\n\nFact: " + facts[Math.floor(Math.random() * facts.length)]);
  } else {
    alert("Game Over! Try again.❌");
  }
  updateDisplay();
}