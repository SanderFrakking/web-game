class MainScene extends Phaser.Scene {
        constructor() {
            super('MainScene')
        }

        preload() {
          this.load.image('sprBackground', 'images/Background.jpg');
        }

        create() {
          g.circle = this.add.circle(config.width/2, config.height/2, 20, 0xffffff)
          this.physics.add.existing(g.circle)
          g.circle.body.setVelocity(200)
          g.circle.body.setColliderWorldBounds(true, 1, 1)

          this.cameras.main.startFollow(this.player);
        }

        update() {
          // Calculate the angle toward the mouse (world coordinates) from the player
          var dx = this.input.activePointer.worldX - this.player.x;
          var dy = this.input.activePointer.worldY - this.player.y;

          var angle = Math.atan2(dy, dx);

          this.player.body.setVelocity(
            Math.cos(angle) * 400,
            Math.sin(angle) * 400
          );
        }
      }
      
      window.addEventListener('resize', () => {window.location.reload()})

      const g = {}
      const config = {
        type: Phaser.AUTO,
        width: 800,
        height: 600,
        backgroundColor: '#123456',
        physics: {
          default: 'arcade',
          arcade: {
            gravity: { x: 0, y: 0 },
            debug: false
          },
        },
        scene: [MainScene, Player]
      };

      const game = new Phaser.Game(config);