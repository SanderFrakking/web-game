var player;
var text;
var MouseText;
var playerText;
let objectGroup; // Groep waar de ballen in komen
let spawnTimer;

const gameWidth = 4000; //X
const gameHeight = 4000; //Y

let targetPosition = { x: 0, y: 0 };
const playerSpeed = 3;

class Scene2 extends Phaser.Scene {
  constructor() {
    super('playGame');
  }

  preload() {
    this.load.image('circle', '../dist/assets/images/Player2.png');
    this.load.image('background', './assets/images/Background.jpg');
  }

  create() {
    /* wat UI test code
    text = this.add.text(20, 20, 'Playing game!', { font: '25px Arial', fill: 'yellow' });
    MouseText = this.add.text(50, 50, 'Playing game!', { font: '25px Arial', fill: 'yellow' });
    playerText = this.add.text(20, 70, 'Playing game!', { font: '25px Arial', fill: 'yellow' });
    */

    //stelt de wereld in
    this.physics.world.setBounds(0, 0, gameWidth, gameHeight);
    this.background = this.add.tileSprite(0, 0, gameWidth, gameHeight, 'background');
    this.background.setOrigin(0, 0);

    //maakt de player aan
    this.player = this.physics.add.sprite(gameWidth / 2, gameHeight / 2, 'circle');
    this.player.setTint(0xff0000);
    this.player.displayHeight = 50;
    this.player.displayWidth = 50;
    this.player.setCollideWorldBounds(true);

    //stelt de camera in
    this.cameras.main.startFollow(this.player);
    this.cameras.main.setBounds(0, 0, gameHeight, 4000);

    //a group to hold the round objects
    objectGroup = this.physics.add.group();

    //a timer to spawn objects at regular intervals
    spawnTimer = this.time.addEvent({
      delay: 1000, // Spawn an object every 1000 milliseconds (1 second)
      callback: spawnObject,
      callbackScope: this,
      loop: true,
    });

    function spawnObject() {
      const randomColor = Phaser.Display.Color.RandomRGB();
      // Create a round object with a random color
      const circle = objectGroup.create(Phaser.Math.Between(0, 4000), Phaser.Math.Between(0, 4000), 'circle');
      circle.setTint(randomColor.color);
      //circle.setScale(0.2); // Adjust the scale as needed
      circle.displayHeight = 5;
      circle.displayWidth = 5;
    }
  }

  update() {
    //UI test
    /* MouseText.setText('x:' + game.input.mousePointer.x + ' Y: ' + game.input.mousePointer.y); */

    // haalt de muis positie op
    const mouseX = game.input.mousePointer.x + this.cameras.main.scrollX;
    const mouseY = game.input.mousePointer.y + this.cameras.main.scrollY;
    // zet de positie waar de player naartoe moet gaat bewegen gebaseerd op de huidige muispositie
    targetPosition.x = mouseX;
    targetPosition.y = mouseY;

    // Calculate the direction vector towards the target position
    let dirX = targetPosition.x - this.player.x;
    let dirY = targetPosition.y - this.player.y;
    let distance = Math.sqrt(dirX * dirX + dirY * dirY);

    if (distance > playerSpeed) {
      // Normalize the vector and apply the speed
      let angle = Math.atan2(dirY, dirX);
      this.player.x += playerSpeed * Math.cos(angle);
      this.player.y += playerSpeed * Math.sin(angle);
    } else {
      // If the player is close enough to the target, snap to the target position
      this.player.x = targetPosition.x;
      this.player.y = targetPosition.y;
    }
  }
}
