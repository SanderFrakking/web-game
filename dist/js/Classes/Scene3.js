class Scene3 extends Phaser.Scene {
    constructor() {
        super('menuGame')
    }

    preload() {
        this.load.image('background', './assets/images/Background.jpg')
        this.load.image('play_button', './assets/images/Startbutton.png')
    }

    create() {
        this.add.image(0,0, "background").setOrigin(0).setDepth(0);

        const playButton = this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2, "play_button").setDepth(1);
        playButton.setInteractive();

        playButton.on('pointerdown', ()=>{
            console.log("clicked")
            this.scene.start('bootGame');
        });

        playButton.on('pointerover', ()=>{
            console.log("hover")
        })
    }
}