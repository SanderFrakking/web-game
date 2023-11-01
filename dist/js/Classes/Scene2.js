var player;
var text;
var MouseText;
var playerText;
var targetX;
var targetY;

let objectGroup; // Group to hold the round objects
let spawnTimer; // Timer to control object spawning

class Scene2 extends Phaser.Scene {
  constructor() {
    super('playGame');
  }

  preload() {
    this.load.image('background', './assets/images/Background.jpg');
    this.load.image('playerImg', './assets/images/Player.png');
    this.load.image('circle', 'path_to_circle_texture.png');
  }

  create() {
    this.physics.world.setBounds(0, 0, 4000, 4000);
    this.background = this.add.tileSprite(0, 0, 4000, 4000, 'background');
    this.background.setOrigin(0, 0);
    text = this.add.text(20, 20, 'Playing game!', { font: '25px Arial', fill: 'yellow' });
    MouseText = this.add.text(50, 50, 'Playing game!', { font: '25px Arial', fill: 'yellow' });
    playerText = this.add.text(20, 70, 'Playing game!', { font: '25px Arial', fill: 'yellow' });
    this.player = this.physics.add.sprite(400, 300, './assets/images/circle.png');
    this.player.setCollideWorldBounds(true);
    this.cameras.main.startFollow(this.player);
    this.cameras.main.setBounds(0, 0, 4000, 4000);

    //a group to hold the round objects
    objectGroup = this.physics.add.group();

    //a timer to spawn objects at regular intervals
    spawnTimer = this.time.addEvent({
      delay: 10, // Spawn an object every 1000 milliseconds (1 second)
      callback: spawnObject,
      callbackScope: this,
      loop: true,
    });

    function spawnObject() {
      const randomX = Phaser.Math.Between(0, 4000);
      const randomY = Phaser.Math.Between(0, 4000);
      const randomColor = Phaser.Display.Color.RandomRGB();

      // Create a round object with a random color
      const circle = objectGroup.create(randomX, randomY, 'circle');
      circle.setTint(randomColor.color);
      circle.setScale(0.2); // Adjust the scale as needed
    }
  }

  update() {
    //UI
    MouseText.setText('x:' + game.input.mousePointer.x + ' Y: ' + game.input.mousePointer.y);
    targetX = game.input.mousePointer.worldX;
    targetY = game.input.mousePointer.worldY;
    //console.log('MouseX', targetX, 'MouseY', targetY);
    //console.log('playerX', this.player.x, 'playerY', this.player.y);
    //console.log('playerX', this.player.x, 'mouseX', targetX);

    if (targetX != 0 && targetY != 0) {
      var angle = Math.atan2(targetY - this.player.y, targetX - this.player.x);
      var speed = 200;
      this.player.setVelocityX(Math.cos(angle) * speed);
      this.player.setVelocityY(Math.sin(angle) * speed);
    } else {
      this.player.setVelocityX(0);
      this.player.setVelocityY(0);
    }
  }
}
