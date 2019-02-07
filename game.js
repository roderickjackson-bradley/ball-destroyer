// Game Javascript


/* Constants
 * Grab the canvas HTML element and put it into a constant named "canvas"
 */
const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

/* Constants 
 * Grab the 2d magic and store it in a "c" constant. This will give me access to 
 * to methods to draw shapes and such
 */
//const c = canvas.getContext('2d');

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
init();
requestAnimationFrame(animate);

/* init function
 *
 */
 function init(){

    world = new p2.World();

    // Creating the plane
    var planeShape = new p2.Plane();
    var plane = new p2.Body({ position:[0, -1],});
    plane.addShape(planeShape);
    world.addBody(plane)

      // Add a character body
      var characterShape = new p2.Circle({
        radius: .5,
        collisionGroup: PLAYER_GROUP
      });
      characterBody = new p2.Body({
        mass: 3,
        position:[0,3],
        fixedRotation: false,
        damping: 0,
        type: p2.Body.KINEMATIC
      });
      characterBody.addShape(characterShape);
      world.addBody(characterBody);

      // Create the character controller
      player = new p2.KinematicCharacterController({
        world: world,
        body: characterBody,
        collisionMask: SCENERY_GROUP,
        velocityXSmoothing: 0.1,
        timeToJumpApex: 0.7,
        skinWidth: 0.1
      });

      // Update the character controller after each physics tick.
      world.on('postStep', function(){
        player.update(world.lastTimeStep);
      });


      // Set up key listeners
      var left = 0, right = 0;
      window.addEventListener('keydown', function(evt){
        switch(evt.keyCode){
          case 38: // up key
          case 32: player.setJumpKeyState(true); break; // space key
          case 39: right = 1; break; // right key
          case 37: left = 1; break; // left key
        }
        player.input[0] = right - left;
      });
      window.addEventListener('keyup', function(evt){
        switch(evt.keyCode){
          case 38: // up
          case 32: player.setJumpKeyState(false); break;
          case 39: right = 0; break;
          case 37: left = 0; break;
        }
        player.input[0] = right - left;
      });
 };

 // Static Objects for scenery
 // addStaticBox(x, y, angle, width, height)
staticBuildingBlockForScenery(2, 3, 0, 2, 1);
staticBuildingBlockForScenery(6, 6, 0, 3, 1);
staticBuildingBlockForScenery(10, 9, 0, 2, 1);
staticBuildingBlockForScenery(14, 12, 0, 7, 1);
staticBuildingBlockForScenery(18, 15, 0, 7, 3);

/* Objects
 *
 */

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

// Render

function render(){
    c.fillStyle = "#3D998A";
    c.fillRect(0, 0, canvasWidth, canvasHeight);
    c.save();
    c.translate(canvasWidth/2, canvasHeight/2);
    c.scale(zoom, -zoom);
}

// Game Loop

var lastTime;

// Animation loop
function animate(time){
  requestAnimationFrame(animate);

  // Compute elapsed time since last frame
  var deltaTime = lastTime ? (time - lastTime) / 1000 : 0;
  deltaTime = Math.min(1 / 10, deltaTime);

  // Move physics bodies forward in time
  world.step(fixedDeltaTime, deltaTime, maxSubSteps);

  // Render scene
  render();


  lastTime = time;
}



