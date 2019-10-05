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
    
        /*this.anims.create(config);
    
        for (var i=0; i<5; i++) {
            var x = Phaser.Math.Between(10,790);
            var y = Phaser.Math.Between(10,590);
    
            allSlimes = this.add.sprite(x,y, 'mass', 1);
    
            allSlimes.anims.delayedPlay(Math.random() * 3, 'wiggle');
        }
    */

        classySlime.setSpriteAndColor(this,'mass');
    
        classySlime2.setSpriteAndColor(this,'mass');

        // classySlime3.setSprite(this.add.sprite(200,500,'mass'));
        // classySlime3.setColor();

        // classySlime4.setSprite(this.add.sprite(300,500,'mass'));
        // classySlime4.setColor();

        // classySlime5.setSprite(this.add.sprite(400,500,'mass'));
        // classySlime5.setColor();

        // classySlime6.setSprite(this.add.sprite(500,500,'mass'));
        // classySlime6.setColor();

        // classySlime7.setSprite(this.add.sprite(600,500,'mass'));
        // classySlime7.setColor();

        //workers = this.add.sprite(400,300,'mass');
        this.anims.create({
            key: 'eye',
            frames: this.anims.generateFrameNumbers('mass', {start: 8, end: 9}),
            frameRate: 5,
            repeat: -1
        })

        for (var i=0;i < eyeKeys.length;i++) {
            var startIdx = 2 + 6*i;
            var endIdx = startIdx + 1;

            this.anims.create({
                key: eyeKeys[i],
                frames: this.anims.generateFrameNumbers('mass', {start: startIdx, end: endIdx}),
                frameRate: 5,
                repeat: -1
            })
        }

        this.anims.create({
            key: 'bounce',
            frames: this.anims.generateFrameNumbers('mass', {start: 0, end: 1}),
            frameRate: 5,
            repeat: -1
        })

        // this.anims.create({
        //     key: 'eye',
        //     frame: this.anims.generateFrameNumbers('mass', {start: 8, end: 39}),
        //     frameRate: 5,
        //     repeat: -1
        // })
    }
    update () {
       // workers.anims.play('bounce',true);
        //allSlimes.anims.play('bounce',true);
        classySlime.animate();
        classySlime2.bod.play('bounce',true);
        classySlime2.eyes.play(classySlime2.eyesKey,true);
        // classySlime3.bod.play('bounce',true);
        // classySlime4.bod.play('bounce',true);
        // classySlime5.bod.play('bounce',true);
        // classySlime6.bod.play('bounce',true);
        // classySlime7.bod.play('bounce',true);
    }
}
var rnd = Phaser.Math.RND;
rnd.between(0,1);
rnd.between(0,1);
rnd.between(0,1);
rnd.between(0,1);
var workers;
var allSlimes;

var colors = [0xffffff,0xc0c0c0,0x808080,0x000000,0xff0000,0x800000,0xffff00,0x808000,0x00ff00,0x008000,0x00ffff,0x008080,0x0000ff,0x000080,0xff00ff,0x800080];
var eyeKeys = ['eye0','eye1','eye2','eye3','eye4','eye5','eye6'];


class Slime {
    constructor(ID,RoomID,traitor) {
        this.ID = ID;
        this.RoomID = RoomID;
        this.xPos = Math.random()*280+10;
        this.yPos = Math.random()*180+10;
        this.eyesKey = rnd.pick(eyeKeys);
        //this.mouthIdx = 1;
        //this.hairIdx = 1;
        this.tint = rnd.pick(colors);
        this.traitor = traitor;
        this.bod;
        this.eyes;
        this.mouth;
        this.hair;
    }

    setBody(scene,key) {
        this.bod = scene.add.sprite(this.xPos,this.yPos,key);
    }

    setEyes(scene,key) {
        this.eyes = scene.add.sprite(this.xPos,this.yPos,key);
    }

    setMouth(scene,key) {
        this.mouth = scene.add.sprite(this.xPos,this.yPos,key);
    }

    setHair(scene,key) {
        this.hair = scene.add.sprite(this.xPos,this.yPos,key);
    }

    setColor() {
        this.bod.setTint(this.tint);
    }


    setSprite(scene,key) {
        this.setBody(scene,key);
        this.setEyes(scene,key);
     //   this.setMouth(scene,key);
     //   this.setHair(scene,key);
    }

    setSpriteAndColor(scene,key) {
        this.setSprite(scene,key);
        this.setColor();
    }

    animate() {
        this.bod.play('bounce',true);
        classySlime.eyes.play(classySlime.eyesKey,true);
    }
}

var classySlime = new Slime(0,0,false);
var classySlime2 = new Slime(0,0,false);
var classySlime3 = new Slime(0,0,false);
var classySlime4 = new Slime(0,0,false);
var classySlime5 = new Slime(0,0,false);
var classySlime6 = new Slime(0,0,false);
var classySlime7 = new Slime(0,0,false);

export default DebugScene;