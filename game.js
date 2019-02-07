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
canvasWidth = canvas.width; 
canvasHeight = canvas.height;
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
 var planeShape = new p2.Plane();
 var plane = new p2.Body({ position:[0, -1],});
 plane.addShape(planeShape);
 world.addBody(plane);
 
 // Static Objects for scenery
 // addStaticBox(x, y, angle, width, height)
staticBuildingBlockForScenery(2, 3, 0, 2, 1);
staticBuildingBlockForScenery(6, 6, 0, 3, 1);
staticBuildingBlockForScenery(10, 9, 0, 2, 1);
staticBuildingBlockForScenery(14, 12, 0, 7, 1);
staticBuildingBlockForScenery(18, 15, 0, 7, 3);

// Creating Static Box Object
function staticBuildingBlockForScenery(x, y, angle, width, height) {
    var shape = new p2.Box({
        collisionGroup: SCENERY_GROUP,
        width: width,
        height: height
    });
    var body = new p2.Body({
        position:[x, y],
        angle: angle
    });
    body.addShape(shape);
    world.addBody(body);
};

// Creating Static Circle Object
function staticBuildingCircleForScenery(x, y, angle, radius) {
    var shape = new p2.Circle({
        collisionGroup: SCENERY_GROUP,
        radius: radius
    });
    var body = new p2.Body({
        position:[x, y],
        angle: angle
    });
    body.addShape(shape);
    world.addBody(body);
};

// Drawing the Boxes and Circles
function drawBody(body){
    var x = body.interpolatedPosition[0],
        y = body.interpolatedPosition[1],
        s = body.shapes[0];
    c.save();
    c.translate(x, y);
    c.rotate(body.interpolatedAngel);

    if (s instanceof p2.Box) {
       c.fillRect(-s.width/2, -s.height, s.width,s.height);
    }
    else if (s instanceof p2.Circle) {
        c.beginPath();
        c.arc(0, 0, s.radius, 0, 2 * Math.PI);
        c.fill();
        c.closePath();
    }
     c.restore();
};

 //Characters

 /// Player


// Creating the plane

// Render

function render(){
    c.fillStyle = "#3D998A";
    c.fillRect(0, 0, canvasWidth, canvasHeight);
    c.save();
    c.translate(canvasWidth/2, canvasHeight/2);
    c.scale(zoom, -zoom);
}

// Game Loop


init();
requestAnimationFrame(animate)

// Implementation
// function() {
//     // the inners
// };

