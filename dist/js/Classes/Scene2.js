var player;
var text;
var MouseText;
var playerText;
var targetX;
var targetY;
class Scene2 extends Phaser.Scene {
  constructor() {
    super('playGame');
  }

  preload() {
    this.load.image('background', './assets/images/Background.jpg');
  }

  create() {
    this.physics.world.setBounds(0, 0, 1200, 500);
    this.background = this.add.tileSprite(0, 0, 1200, 500, 'background');
    this.background.setOrigin(0, 0);
    text = this.add.text(20, 20, 'Playing game!', { font: '25px Arial', fill: 'yellow' });
    MouseText = this.add.text(20, 50, 'Playing game!', { font: '25px Arial', fill: 'yellow' });
    playerText = this.add.text(20, 70, 'Playing game!', { font: '25px Arial', fill: 'yellow' });
    this.player = this.physics.add.sprite(400, 300, './assets/images/circle.png');
    this.player.setCollideWorldBounds(true);
    this.cameras.main.startFollow(this.player);
    this.cameras.main.setBounds(0, 0, 1200, 500);
  }

  update() {
    game.input.mousePointer.x;
    game.input.mousePointer.y;
    MouseText.setText('x:' + game.input.mousePointer.x + ' Y: ' + game.input.mousePointer.y);
    targetX = game.input.mousePointer.x;
    targetY = game.input.mousePointer.y;

    if (targetX !== undefined && targetY !== undefined) {
      var angle = Math.atan2(targetY - this.player.y, targetX - this.player.x);
      var speed = 200;
      this.player.setVelocityX(Math.cos(angle) * speed);
      this.player.setVelocityY(Math.sin(angle) * speed);
    }
  }
}
