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

    
    function createEnemy(x, y, speed, health) {
      var enemy = game.createGameItem("enemy", 25); //Creates enemy and adds to game
      var redSquare = draw.bitmap("img/newbomb.png"); //Creates a red square in the red square variable
      redSquare.x = -35; // offsets the image from the hitzone by -25 pixels
      redSquare.y = -35; // offsets the image from the hitzone by -25 pixels
      enemy.addChild(redSquare); //adds red square as child
      enemy.x = x; //X of enemy
      enemy.y = y; //Y of enemy
      redSquare.scaleX = 0.2;
      redSquare.scaleY = 0.2;
      game.addGameItem(enemy); //Adds item to game
      enemy.velocityX -= speed; //How fast the box spins
      enemy.rotationalVelocity = 5; //Sets rotational velocity of enemy
      enemy.onPlayerCollision = function () {
        game.changeIntegrity(health) //Subtracts 10 health from Halle 
      };
      
      
      enemy.onProjectileCollision = function () {
        game.increaseScore(100);  //Player gains 100 pts if enemy is defeated
        enemy.flyTo(0,0); //Flies off screen
      };
    }
    
    
   
    function createReward(x, y, speed, health) {
      var reward = game.createGameItem("reward", 25); //Creates reward and adds to game
      var blueSquare = draw.bitmap("img/heart-png-15.png"); //Creates a blue square in the blue square variable
      blueSquare.x = -32; // offsets the image from the hitzone by -25 pixels
      blueSquare.y = -25; // offsets the image from the hitzone by -25 pixels
      reward.addChild(blueSquare); //adds blue square as child
      reward.x = x; //X of reward
      reward.y = y; //Y of reward
      blueSquare.scaleX = 0.2;
      blueSquare.scaleY = 0.2;
      game.addGameItem(reward); //Adds item to game
      reward.velocityX -= speed; //How fast the box spins
      reward.rotationalVelocity = 0; //Sets rotational velocity of reward
      reward.onPlayerCollision = function () {
        game.increaseScore(50);
        game.changeIntegrity(health) //Subtracts 10 health from Halle 
      reward.shrink(); //Shrinks when collected
      };
    }  
      


      function createLevel(x, y, speed) {
        var level = game.createGameItem("level", 25); //Creates level and adds to game
        var yellowSquare = draw.bitmap("img/flag.png"); //Creates a yellow square in the yellow square variable
        yellowSquare.x = -35; // offsets the image from the hitzone by -25 pixels
        yellowSquare.y = -25; // offsets the image from the hitzone by -25 pixels
        level.addChild(yellowSquare); //adds yellow square as child
        level.x = x; //X of level
        level.y = y; //Y of level
        yellowSquare.scaleX = 0.1;
        yellowSquare.scaleY = 0.1;
        game.addGameItem(level); //Adds item to game
        level.velocityX -= speed; //How fast the box spins
        level.rotationalVelocity = 1; //Sets rotational velocity of level
        level.onPlayerCollision = function () {
        level.shrink();
        startLevel();
        };
      }  
       
  


    function startLevel() {
      // TODO 13 goes below here

      var level = levelData[currentLevel]; //Can store which level we're on
      var levelObjects = level.gameItems //retrives the number of games items and stores it in level objects

      for(i=0; i < levelObjects.length; i++){
        var element = levelObjects[i];
     
        if(element.type === "sawblade"){ //Checks the type key value to detirmine which object to make
          createObstacles(element.x, element.y, element.hitSize, element.damage); //If condition is true, calls the relevant function
        }
        
        if(element.type === "enemy"){ //Checks the type key value to detirmine which object to make
          createEnemy(element.x, element.y, element.speed, element.health); //If condition is true, calls the relevant function
        }

        if(element.type === "reward"){ //Checks the type key value to detirmine which object to make
          createReward(element.x, element.y, element.speed, element.health); //If condition is true, calls the relevant function
        }

        if(element.type === "level"){ //Checks the type key value to detirmine which object to make
          createLevel(element.x, element.y, element.speed); //If condition is true, calls the relevant function
        }
        
      }


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
