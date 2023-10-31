class Scene1 extends Phaser.Scene {
  constructor() {
    super('bootGame');
  }

  create() {
    this.add.text(20, 20, 'loading game...', { font: '25px Arial', fill: 'yellow' });
    this.scene.start('playGame');
  }
}
