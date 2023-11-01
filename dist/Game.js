class Example extends Phaser.Scene {
  preload() {
    this.load.image('sprBackground', 'assets/images/Background.jpg');
  }

  create() {
    this.add.text(20, 20, 'loading game...', { font: '25px Arial', fill: 'yellow' });
  }

  update() {}
}

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  backgroundColor: 'fffff',
  scene: [Scene3, Scene1, Scene2],
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { x: 0, y: 0 },
    },
  },
};

const game = new Phaser.Game(config);
game.input.mouse.capture = true;
