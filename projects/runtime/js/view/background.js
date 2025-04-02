var background = function (window) {
    'use strict';
    
    window.opspark = window.opspark || {};
    var draw = window.opspark.draw;
    var createjs = window.createjs;
    
    /*
     * Create a background view for our game application
     */
    window.opspark.makeBackground = function(app,ground) {
        /* Error Checking - DO NOT DELETE */
        if(!app) {
            throw new Error("Invalid app argument");
        }
        if(!ground || typeof(ground.y) == 'undefined') {
            throw new Error("Invalid ground argument");
        }
        
        // useful variables
        var canvasWidth = app.canvas.width;
        var canvasHeight = app.canvas.height;
        var groundY = ground.y;
        
        // container which will be returned
        var background;
        
        //////////////////////////////////////////////////////////////////
        // ANIMATION VARIABLES HERE //////////////////////////////////////
        //////////////////////////////////////////////////////////////////
        // TODO (several):
        var tree; 
        var buildings = [];
      
        // called at the start of game and whenever the page is resized
        // add objects for display in background. draws each image added to the background once
        function render() {
            background.removeAllChildren();

            // TODO 1:
            // this currently fills the background with an obnoxious yellow;
            // you should modify both the height and color to suit your game
            var backgroundFill = draw.rect(canvasWidth,groundY,'blue');
            background.addChild(backgroundFill);
            
            // TODO 2: - Add a moon and starfield
            var moon = draw.bitmap("img/moon.png"); //Creates bitMap object using the moon image
            moon.x = canvas.width-700; //Sets the moon to the current X position
            moon.y = groundY - 700; // Sets the moon to the Y position
            moon.scaleX = 1.0; //Scales the moons width
            moon.scaleY = 1.0; //Scales the moon's height
            background.addChild(moon); //Adds the moon to the background container
            
            for (var i=0 ; i < 20 ; i++){  //This loop will draw about 20 "stars in the sky that are yellow and white"
                var circle = draw.circle(10, "yellow", "yellow", 2); //Dras a yellow and white circle
                circle.x = canvasWidth * Math.random(); //Places star on X randomly
                circle.y = groundY * Math.random(); //Places star on Y randomly
                background.addChild(circle);
            }



            // TODO 4: Part 1 - Add buildings!     Q: This is before TODO 4 for a reason! Why?
            for (var i = 0; i < 5; ++i) {
                var buildingColors = ["grey", "black", "white", "grey", "black"] //The building's choice of colors
                var buildingHeight = 300 * Math.random(); // Will decide how tall the buildings are, from a scale of 0 to 300
                var building = draw.rect(75, buildingHeight, buildingColors[i], "Black", 1); //Draws the building using the previous variables and random equations
                building.x = 200 * i; // The building's x will be 200 * whatever i currently is
                building.y = groundY - buildingHeight;
                background.addChild(building);
                buildings.push(building);
              }
            
            // TODO 3: Part 1 - Add a tree
            tree = draw.bitmap("img/tree.png"); //Looks through our image file to plave a tree on the canvas
            tree.x = canvasWidth - 300; //Tree is 300 below the canvasWidth
            tree.y = groundY -225; // Tree is 225 below the GroundY
            background.addChild(tree);
            
        } // end of render function - DO NOT DELETE
        
        
        // Perform background animation
        // called on each timer "tick" - 60 times per second
        function update() {
            // useful variables
            var canvasWidth = app.canvas.width;
            var canvasHeight = app.canvas.height;
            var groundY = ground.y;
            
            // TODO 3: Part 2 - Move the tree!
            tree.x = tree.x - 1;

            if (tree.x < -200) {
             tree.x = canvasWidth;
            }
            
            // TODO 4: Part 2 - Parallax
            for (var i=0; i < buildings.length; i++ ){ //This function will loop the buildings made above, putting the x's at random locations
                var building = buildings[i];
                building.x -= Math.random();
               if (building.x < -100){
                building.x = canvasWidth;
               }
            
            }

        } // end of update function - DO NOT DELETE
        
        
        
        /* Make a createjs Container for the background and let it know about the render and upate functions*/
        background = new createjs.Container();
        background.resize = render;
        background.update = update;
        
        /* make the background able to respond to resizing and timer updates*/
        app.addResizeable(background);
        app.addUpdateable(background);
        
        /* render and return the background */
        render();
        return background;
    };
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = background;
}
