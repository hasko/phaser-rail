
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
  this.cursor = this.add.sprite(this.sys.game.config.width / 2, this.sys.game.config.height / 2, 'cursor');
}

// executed on every frame (60 times per second)
gameScene.update = function() {
  // check for active input
  if (this.input.activePointer.isDown) {
    // player walks
  }
};