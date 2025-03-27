var runLevels = function (window) {
  window.opspark = window.opspark || {};

  var draw = window.opspark.draw;
  var createjs = window.createjs;
  let currentLevel = 0;

  window.opspark.runLevelInGame = function (game) {
    // some useful constants
    var groundY = game.groundY;

    // this data will allow us to define all of the
    // behavior of our game
    var levelData = window.opspark.levelData;

    // set this to true or false depending on if you want to see hitzones
    game.setDebugMode(true);

    // TODOs 5 through 11 go here
    // BEGIN EDITING YOUR CODE HERE
    
    function createObstacles(x,y, hitSize, damage) {
    var hitZoneSize = 25; //Defines size of hitzone
    var damageFromObstacle = 10; //How much damage Hall-E takes from the saw
    var obstacleHitZone = game.createObstacle(hitZoneSize, damageFromObstacle); //Creates obstacle with size parameters
    obstacleHitZone.x = x; // X coordinate
    obstacleHitZone.y = y; //Y Coordinate
    game.addGameItem(obstacleHitZone); //Adds obstacle hitzone
    var obstacleImage = draw.bitmap("img/sawblade.png"); //Makes the image of the saw
    obstacleHitZone.addChild(obstacleImage); //Attaches image
    obstacleImage.x = -25; //Positions images on hitzone by moving left
    obstacleImage.y = -25; //Positions images on hitzone by moving down
    obstacleHitZone.rotationalVelocity = 10;
    } 

    createObstacles(400, groundY - 50, 25, 10);
    createObstacles(500, groundY - 50, 100, 25);
    
    var enemy = game.createGameItem("enemy", 25); //Creates enemy and adds to game
    var redSquare = draw.rect(50, 50, "red"); //Creates a red square in the red square variable
    redSquare.x = -25; // offsets the image from the hitzone by -25 pixels
    redSquare.y = -25; // offsets the image from the hitzone by -25 pixels
    enemy.addChild(redSquare); //adds red square as child
    enemy.x = 400; //X of enemy
    enemy.y = groundY - 50; //Y of enemy
    game.addGameItem(enemy); //Adds item to game
    enemy.velocityX -= 3; //How fast the box spins
    enemy.rotationalVelocity = 10; //Sets rotational velocity of enemy
    enemy.onPlayerCollision = function () {
      game.changeIntegrity(-10) //Subtracts 10 health from Halle 
    };
    enemy.onProjecti  leCollision


    function startLevel() {
      // TODO 13 goes below here



      //////////////////////////////////////////////
      // DO NOT EDIT CODE BELOW HERE
      //////////////////////////////////////////////
      if (++currentLevel === levelData.length) {
        startLevel = () => {
          console.log("Congratulations!");
        };
      }
    }
    startLevel();
  };
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if (
  typeof process !== "undefined" &&
  typeof process.versions.node !== "undefined"
) {
  // here, export any references you need for tests //
  module.exports = runLevels;
}
