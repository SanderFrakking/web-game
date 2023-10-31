class Example extends Phaser.Scene {
  preload() {
    this.load.image('sprBackground', 'assets/img/Background.jpg');
  }

  create() {
    this.add.text(20, 20, 'loading game...', { font: '25px Arial', fill: 'yellow' });
  }

  update() {}
}

const config = {
  type: Phaser.AUTO,
  width: 1200,
  height: 500,
  backgroundColor: 'fffff',
  scene: [Scene1, Scene2],
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { x: 0, y: 0 },
    },
  },
};

const game = new Phaser.Game(config);
