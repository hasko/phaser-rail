
/* global Phaser */

// create a new scene named "Game"
let gameScene = new Phaser.Scene('Game');
 
// our game's configuration
let config = {
  type: Phaser.AUTO,  //Phaser will decide how to render our game (WebGL or Canvas)
  width: 800, // game width
  height: 600, // game height
  scene: gameScene // our newly created scene
};
 
// create the game, and pass it the configuration
let game = new Phaser.Game(config);

const tileSize = 72;
const tilePhase = tileSize / 2;

var cPos = { q: 0, r: 0 };

// load asset files for our game
gameScene.preload = function() {
  // load images
  this.load.image('background', 'assets/background.png');
  this.load.image('gametiles', 'assets/track.png');
  this.load.image('cursor', 'assets/cursor.png');
};
 
// executed once, after assets were loaded
gameScene.create = function() {
  let bg = this.add.sprite(0, 0, 'background');
  bg.setOrigin(0,0);
  let cp = hex_to_pixel(cPos);
  this.cursor = this.add.sprite(cp.x, cp.y, 'cursor');
};

// executed on every frame (60 times per second)
gameScene.update = function() {
  // check for active input
  if (this.input.activePointer.isDown) {
    let hex = pixel_to_hex(this.input.activePointer.x, this.input.activePointer.y);
    cPos = hex;
    let cp = hex_to_pixel(cPos);
    this.cursor.x = cp.x;
    this.cursor.y = cp.y;
  }
};

/* Hex grid utility functions */

function pixel_to_hex(x, y) {
  let q = (x * Math.sqrt(3)/3 - y / 3) / tileSize;
  let r = y * 2/3 / tileSize;
  return hex_round({ q: q, r: r });
}

function cube_round(cube) {
  let rx = Math.round(cube.x)
  let ry = Math.round(cube.y)
  let rz = Math.round(cube.z)

  let x_diff = Math.abs(rx - cube.x)
  let y_diff = Math.abs(ry - cube.y)
  let z_diff = Math.abs(rz - cube.z)

  if (x_diff > y_diff && x_diff > z_diff) {
      rx = -ry-rz;
  } else if (y_diff > z_diff) {
      ry = -rx-rz;
  } else {
      rz = -rx-ry;
  }

  return { x: rx, y: ry, z: rz };
}

function hex_round(hex) {
  return cube_to_axial(cube_round(axial_to_cube(hex)));
}

function cube_to_axial(cube) {
  let q = cube.x;
  let r = cube.z;
  return { q: q, r: r };
}

function axial_to_cube(hex) {
  let x = hex.q;
  let z = hex.r;
  let y = -x-z;
  return { x: x, y: y, z: z };
}

function hex_to_pixel(hex) {
  let x = tileSize * Math.sqrt(3) * (hex.q + hex.r/2);
  let y = tileSize * 3/2 * hex.r;
  return { x: x, y: y };
}