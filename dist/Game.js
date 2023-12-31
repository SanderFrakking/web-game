// Game.js
class Example extends Phaser.Scene {
  preload() {
    this.load.image('sprBackground', 'assets/images/Background.jpg');
  }

  create() {
    this.add.text(20, 20, 'loading game...', { font: '25px Arial', fill: 'yellow' });
  }

  update() {}
}
const sharedData = {
  score: 0, // Initialize the score variable
};

const config = {
  type: Phaser.AUTO,
  scale: {
    parent: 'body',
    mode: Phaser.Scale.FIT,
    mode: Phaser.Scale.RESIZE,
    autoCenter: Phaser.Scale.CENTER_BOTH, // Center the game on the screen
  },

  backgroundColor: '#fffff',
  scene: [Scene3, Scene1, Scene2, UIScene],
  sharedData: sharedData, // Pass the shared data to scenes

  physics: {
    default: 'arcade',
    arcade: {
      gravity: { x: 0, y: 0 },
    },
  },
};

const game = new Phaser.Game(config);
game.input.mouse.capture = true;
