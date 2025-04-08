var makeLevelData = function (window) {
  window.opspark = window.opspark || {};

  window.opspark.makeDataInGame = function (game) {
    // some useful constants
    var groundY = game.groundY;

    // this data will allow us to define all of the
    // behavior of our game

    // TODO 12: change the below data
    var levelData = [
      {
        name: "Robot Romp",
        number: 1,
        speed: -3,
        gameItems: [
          { type: "sawblade", x: 400, y: groundY + 10, hitSize: 100, damage: 25},
          { type: "sawblade", x: 650, y: groundY + 10, hitSize: 100, damage: 25  },
          { type: "sawblade", x: 900, y: groundY + 10, hitSize: 100, damage: 25 },
         
          { type: "enemy", x: 400, y: groundY - 50, speed: 4, health: -30 },
          { type: "enemy", x: 900, y: groundY - 50, speed: 2, health: -30 },
          { type: "enemy", x: 1200, y: groundY - 50, speed: 4, health: -30 },
         
          { type: "reward", x: 1200, y: groundY - 80, speed: 2, health: 50 },
         
          { type: "level", x: 1500, y: groundY - 80, speed: 2,  },
        ],
      },
      {
        name: "Robot Rampage",
        number: 2,
        speed: -3,
        gameItems: [
          { type: "sawblade", x: 400, y: groundY, damage: 35},
          { type: "sawblade", x: 700, y: groundY, damage: 35 },
          { type: "sawblade", x: 900, y: groundY, damage: 35 },
          { type: "sawblade", x: 1200, y: groundY, damage: 35},
          { type: "sawblade", x: 1600, y: groundY, damage: 35 },
          { type: "sawblade", x: 2000, y: groundY, damage: 35},
        ],
      },
    ];
    window.opspark.levelData = levelData;
  };
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if (
  typeof process !== "undefined" &&
  typeof process.versions.node !== "undefined"
) {
  // here, export any references you need for tests //
  module.exports = makeLevelData;
}
