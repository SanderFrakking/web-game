class Scene3 extends Phaser.Scene {
    constructor() {
        super('menuGame')
    }

    preload() {
        this.load.image('play_button', './assets/images/Startbutton.png')
    }

    create() {

        const playButton = this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2, "play_button")
        playButton.setInteractive();

        playButton.on('pointerdown', ()=>{
            this.scene.start('bootGame');
        })
    }
}