let numAnimals = 6;
let maxImageWidth = 256/2;
let maxImageHeight = 320/2;
let offsetX = 10;
let gameHeight = maxImageHeight * 3;

window.onload = function() {
  let w = maxImageWidth * numAnimals;

  w += (offsetX * 2);

  var config = {
    type: Phaser.AUTO,
    width: w,
    height: gameHeight,
    parent: 'gameDiv',
    scene : [BootScene, PlayGameScene]
  }
  
  game = new Phaser.Game(config);

  window.focus();
}

class BootScene extends Phaser.Scene{
  constructor() {
    super("BootScene")
  }

  preload() {
    this.load.image('cat', "images/Cat.png");
    this.load.image('chicken', "images/Chicken.png");
    this.load.image('fox',"images/Fox.png");
    this.load.image('mouse',"images/Mouse.png");
    this.load.image('pig',"images/Pig.png");
    this.load.image('rabbit',"images/Rabbit.png");
  }

	create() {
		this.scene.start("PlayGameScene");
	}
}

class PlayGameScene extends Phaser.Scene {
  constructor()
  {
    super("PlayGameScene");
  }

  create() {
    this.numMatches = 0;
    this.canMove = true;
    this.choseCards = [];

    let x = game.config.width / 2;
    let y = 32;
    this.add.image(x, y, 'header')

    let animalArray = ['cat', 'chicken', 'fox', 'mouse', 'pig', 'rabbit'];

    let shuffleArray = [];
    for(let row = 0; row < 2; row++) {
      shuffleArray[row] = [];

      for(let col = 0; col < numAnimals; col++) {
        let animalValue = animalArray[col];

        shuffleArray[row][col] = animalValue;
      }
    }

    for (let n = 0; n < 100; n++) {
      let rowA = Phaser.Math.Between(0, 1);
      let colA = Phaser.Math.Between(0, numAnimals-1)

      let rowB = Phaser.Math.Between(0, 1);
      let colB = Phaser.Math.Between(0, numAnimals-1);

      let temp = shuffleArray[rowA][colA];
      shuffleArray[rowA][colA] = shuffleArray[rowB][colB];
      shuffleArray [rowB][colB] = temp;
    }

    this.boardArray = [];

    x = game.config.width / 2;
    y = (game.config.height / 2) - (maxImageHeight / 2);

    for (let row = 0; row < 2; row++) {
      this.boardArray[row] = [];

      for (let col = 0; col < numAnimals; col++) {
        let theAnimalValue = shuffleArray[row][col];

        x = offsetX + (maxImageHeight * col) + (maxImageHeight / 2);

        let cardBack = this.add.image(x, y, 'cardBack');
        cardBack.setScale(0.5);
        cardBack.alpha = 1;
        cardBack.depth = 20;

        let animal = this.add.image(x, y, theAnimalValue);
        animal.setScale(0.5);
        animal.depth = 10;

        this.boardArray[row][col] = {
          animalSelected: false,
          animalValue: shuffleArray[row][col],
          cardBackSprite: cardBack,
        }
      }

      y += maxImageHeight;
    }

    this.input.on('pointerdown', this.handleMouseDown, this);
  }
  
  handleMouseDown(mousePointer) {
    if(!this.canMove) {
      return
    }

    let w = maxImageWidth;

    let row =  Math.floor(mousePointer.y / (gameHeight / 2));
    let col = Math.floor((mousePointer.x - offsetX) / w);

    row = row < 0 ? row = 0 : row;
    row = row > 1 ? row = 1 : row;

    col = col < 0 ? col = 0 : col;
    col = col > 5 ? col = 5 : col;

    let obj = this.boardArray[row][col];

    if(obj.animalSelected == true) {
      return;
    }

    this.choseCards.push(obj);

    if(this.choseCards.length > 1) {
      this.canMove = false;

      let g1 = this.choseCards[0].animalValue;
      let g2 = this.choseCards[1].animalValue;

      if (g1 == g2) { 
        this.choseCards.length = 0;
        this.numMatches++;
        this.canMove = true;
      } else {
        this.time.addEvent({
          delay: 2000,
          callbackScope: this, 
          callback: function() {
            for (let n = 0; n < this.choseCards.length; n++) {
              this.choseCards[n].cardBackSprite.alpha = 1;

              this.choseCards[n].animalSelected = false;
            }

            this.choseCards.length = 0;
            this.canMove = true;
          },
        });
      }
    }

    if(this.numMatches == numAnimals) {
      this.time.addEvent ({
        delay: 2000,
        callbackScope: this,
        callback: function() {
          this.scene.start('PlayGameScene');
        },
      });
    }
  }
}