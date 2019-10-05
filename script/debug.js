import {screenHeight, screenWidth} from './global-config.js';
import SystemState from './state-machine.js';

class DebugScene extends Phaser.Scene {
    init() {
        console.log("Debug Init");
    }
    create() {
        console.log("Debug Create");
        this.add.text(0, 0, 'Debug');

        var config = {
            key: 'wiggle',
            frames: this.anims.generateFrameNumbers('mass', {start: 0, end: 1, first:0}),
            frameRate: 5,
            repeat: -1,
            repeatDelay: 2
        };
    
        this.anims.create(config);
    
        for (var i=0; i<5; i++) {
            var x = Phaser.Math.Between(10,790);
            var y = Phaser.Math.Between(10,590);
    
            allSlimes = this.add.sprite(x,y, 'mass', 1);
    
            allSlimes.anims.delayedPlay(Math.random() * 3, 'wiggle');
        }
    
        classySlime.setSprite(this.add.sprite(300,300,'mass'));
        classySlime.sprite.setTint(classySlime.tint);
    
        workers = this.add.sprite(400,300,'mass');
        this.anims.create({
            key: 'bounce',
            frames: this.anims.generateFrameNumbers('mass', {start: 0, end: 1}),
            frameRate: 5,
            repeat: -1
        })
    }
    update () {
        workers.anims.play('bounce',true);
        allSlimes.anims.play('bounce',true);
        classySlime.sprite.play('bounce',true);
    }
}

var workers;
var allSlimes;

var colors = [0xffffff,0xc0c0c0,0x808080,0x000000,0xff0000,0x800000,0xffff00,0x808000,0x00ff00,0x008000,0x00ffff,0x008080,0x0000ff,0x000080,0xff00ff,0x800080];

class Slime {
    constructor(ID,RoomID,traitor) {
        this.ID = ID;
        this.RoomID = RoomID;
        this.xPos = Math.random()*280+10;
        this.yPos = Math.random()*180+10;
        //this.eyes = 1;
        //this.mouth = 1;
        //this.hair = 1;
        this.tint = colors[2];
        this.traitor = traitor;
        this.test = "Test";
        this.sprite;
    }

    setSprite(sprite) {
        this.sprite = sprite;
    }
}

var classySlime = new Slime(0,0,false);

export default DebugScene;