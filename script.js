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
  },
  tee: {
    top: true,
    right: true,
    bottom: true,
    left: false
  },
  cross: {
    top: true,
    right: true,
    bottom: true,
    left: true
  }
};

// Game Variables
let level = 1;
let moves = 0;
let score = 0;

// === INITIALIZE GAME ===
gameScreen.style.display = "none";
updateDisplay();


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

// get pipes connections
function getConnections(tile) {
  const type = tile.dataset.type;
  let connections = {
    ...pipeConnections[type]
  };
  let rotation = Number(tile.dataset.rotation);

  for(let i = 0; i < rotation / 90; i++){
    connections = rotateConnections(connections);
  }
  return connections;
}

function findTile(row, column)  {
  return document.querySelector(`[data-row="${row}"][data-column="${column}"]`);
}

// flow button
function startFlow() {
  console.log("Starting water flow... ");
  let currentRow = 0;
  let currentColumn = 0;
  let currentTile = findTile(currentRow, currentColumn);

  if(!currentTile){
    console.log("No starting pipe found");
    return;
  }
  console.log("Starting pipe:", getConnections(currentTile));
}

