// UIScene.js
class UIScene extends Phaser.Scene {
  constructor() {
    super({ key: 'UIScene', active: true });
    this.score = 0;
  }

  create() {
    const info = this.add.text(10, 10, 'Score: 0', { font: '48px Arial', fill: '#000000' });
    const ourGame = this.scene.get('playGame');
    ourGame.events.on(
      'addScore',
      function () {
        this.score += 1;
        info.setText(`Score: ${this.score}`);
      },
      this
    );
  }
}
