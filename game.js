// Game Javascript


/* Constants
 * Grab the canvas HTML element and put it into a constant named "canvas"
 */
const canvas = document.querySelector('canvas');

/* Constants 
 * Grab the 2d magic and store it in a "c" constant. This will give me access to 
 * to methods to draw shapes and such
 */
const c = canvas.getContext('2d');

/* Variables
 *
 *
 */
// Not sure if I want to use this technique or not
// canvas.width = innerWidth;
// canvas.height = innerHeight;
// Not sure if I want to use this technique or not
// canvasWidth = canvas.width; 
// canvasHeight = canvas.height;
var cameraPos = [0,0];
var zoom = 30; 
var maxSubSteps = 10;
var canvasWidth;
var canvasHeight;
var world;
var characterBody;
var player;
var SCENERY_GROUP = 0x01; // Collosion Group variable may need to go into a constant variable
var PLAYER_GROUP = 0x02; // Collision Group variable may need to go into a constant variable
//var ENEMY_GROUP = 0x03;// I plan implementing this later with other shapes being the enemy

/* Objects
 *
 */
// Creating the world
 world = new p2.World();

 // Creating the plane

 // Static Objects for scenery
 // addStaticBox(x, y, angle, width, height)
 addStaticBox(2, 3, 0, 7, 1);
 addStaticBox(6, 6, 0, 3, 1);
 addStaticBox(10, 9, 0, 2, 1);
 addStaticBox(14, 12, 0, 7, 1);
 addStaticBox(18, 15, 0, 7, 3);

 //Characters

 /// Player

 /// Draw Circle 

// Creating the plane

// Render

// Game Loop


init();
requestAnimationFrame(animate)

// Implementation
function() {
    // the inners
};

