/** @type {import("../typings/phaser")} */

import {screenHeight, screenWidth} from './global-config.js';
import SystemState from './state-machine.js';

class repairTracker {
    constructor(funct,xPos,yPos,powerLevel,barChunk,scene) {
        this.funct = funct;
        this.xPos = xPos;
        this.yPos = yPos;
        var xPB = xPos + 64;
        var yPB = yPos + 64;
        this.PowerBar = new PowerBar(funct,powerLevel,xPB,yPB,barChunk,scene)
        scene.add.text(xPos+16, yPos,funct);
        scene.add.text(xPos-24, (yPos+26),'Current');
    }

    animate() {
        this.PowerBar.animate();
    }
}

class PowerButton {
    constructor(ID,xPos,yPos,raise,scene,powerBar) {
        this.ID = ID;
        this.xPos = xPos;
        this.yPos = yPos;
        this.raise = raise;
        this.sprite = scene.add.sprite(xPos,yPos,'sysTile');
        this.powerBar = powerBar;
        this.sprite.setInteractive().on('pointerdown', () => this.changePower());
    }

    changePower() {
        if (this.raise) {
            this.powerBar.incrementPower();
        } else {
            this.powerBar.decrementPower();
        }
    }

    animate() {
        if (this.raise) {
            this.sprite.play('plus',true);
        } else {
            this.sprite.play('minus',true);
        }
    }

}
class PowerBar {
    constructor(ID,powerLevel,xPos,yPos,barChunk,scene) {
        this.ID = ID;
        this.powerLevel = powerLevel;
        this.oldLevel = powerLevel;
        this.powerMax = barChunk*4;
        this.xPos = xPos;
        this.yPos = yPos;
        this.barChunk = [];
        this.oldChunk = [];
        for (var i=0;i<barChunk;i++) {
            var xBar = xPos + 32*i;
            this.barChunk.push(scene.add.sprite(xBar,yPos,'border'));
        }
        for (var i=0;i<barChunk;i++) {
            var xBar = xPos + 32*i;
            var yBar = yPos - 32;
            this.oldChunk.push(scene.add.sprite(xBar,yBar,'border'));
        }
        this.moreButton = new PowerButton((ID*2),xPos-64,yPos,true,scene,this);
        this.lessButton = new PowerButton((ID*2+1),xPos-32,yPos,false,scene,this);
    }

    buildBar(power,bar) {
        var powerTracker = power;
        for (var i=0;i<bar.length; i++) {
            var currentChunk = bar[i];
            if (powerTracker >= 4) {
                currentChunk.play('bar4',true);
                powerTracker -= 4;
            } else if (powerTracker==3) {
                currentChunk.play('bar3',true);
                powerTracker = 0;
            } else if (powerTracker==2) {
                currentChunk.play('bar2',true);
                powerTracker = 0;
            } else if (powerTracker==1) {
                currentChunk.play('bar1',true);
                powerTracker = 0;
            } else {
                currentChunk.play('bar0',true);
            }
        }
    }    

    animate() {
        this.buildBar(this.powerLevel,this.barChunk);
        this.buildBar(this.oldLevel,this.oldChunk);

        this.moreButton.animate();
        this.lessButton.animate();
    }

    updatePower(powerLevel) {
        if (powerLevel < this.powerMax) {
            this.powerLevel = powerLevel;
        } else if (powerLevel < 0){
            this.powerLevel = 0;
        } else {
            this.powerLevel = this.powerMax;
        }
    }

    incrementPower() {
        this.updatePower(this.powerLevel+1);
    }

    decrementPower() {
        this.updatePower(this.powerLevel-1);
    }
}

var camera1;
var camera2;
var camera3;
var camera4;
var doors;
var database;
var repair;
var panel;

var blobbyTL;
var blobbyTR;
var blobbyBL;
var blobbyBR;

class SystemScene extends Phaser.Scene {
    init() {
        console.log("System Scene Init");
    }

    create() {
        console.log("System Create");
        this.add.text(0, 0, 'System');

        blobbyTL = this.add.sprite(200,500,'sysTile');
        blobbyTR = this.add.sprite(232,500,'sysTile');
        blobbyBL = this.add.sprite(200,532,'sysTile');
        blobbyBR = this.add.sprite(232,532,'sysTile');

        camera1 = new repairTracker('Camera 1',128,128,0,2,this);
        camera2 = new repairTracker('Camera 2',304,128,0,2,this);
        camera3 = new repairTracker('Camera 3',128,228,0,2,this);
        camera4 = new repairTracker('Camera 4',304,228,0,2,this);
        doors = new repairTracker('Doors',480,128,0,4,this);
        //funct,xPos,yPos,powerLevel,barChunk,scene

        // classyBar = new PowerBar(0,3,300,300,3,this);

        var barKeys = ['bar0','bar1','bar2','bar3','bar4'];

        for (var i=0;i<barKeys.length;i++) {
            var spriteIdx = 54 + i;

            this.anims.create({
                key: barKeys[i],
                frames: this.anims.generateFrameNumbers('border',{start:spriteIdx,end:spriteIdx}),
                frameRate: 5,
                repeat: -1
            })
        }

        this.anims.create({
            key: 'plus',
            frames: this.anims.generateFrameNumbers('sysTile',{start:185,end:185}),
            frameRate: 5,
            repeat: -1
        })

        this.anims.create({
            key: 'minus',
            frames: this.anims.generateFrameNumbers('sysTile',{start:186,end:186}),
            frameRate: 5,
            repeat: -1
        })

        this.anims.create({
            key: 'helperTL',
            frames: this.anims.generateFrameNumbers('sysTile',{start:114,end:114}),
            frameRate: 5,
            repeat: -1
        })

                this.anims.create({
            key: 'helperTR',
            frames: this.anims.generateFrameNumbers('sysTile',{start:115,end:115}),
            frameRate: 5,
            repeat: -1
        })

        this.anims.create({
            key: 'helperBL',
            frames: this.anims.generateFrameNumbers('sysTile',{start:131,end:131}),
            frameRate: 5,
            repeat: -1
        })

        this.anims.create({
            key: 'helperBR',
            frames: this.anims.generateFrameNumbers('sysTile',{start:132,end:132}),
            frameRate: 5,
            repeat: -1
        })
    }

    update () {
        camera1.animate();
        camera2.animate();
        camera3.animate();
        camera4.animate();
        blobbyTL.play('helperTL',true);
        blobbyTR.play('helperTR',true);
        blobbyBL.play('helperBL',true);
        blobbyBR.play('helperBR',true);
    }
}



export default SystemScene;