/** @type {import("../typings/phaser")} */

import {screenHeight, screenWidth} from './global-config.js';
import SystemState from './state-machine.js';

class Blobby {
    constructor(xPos,yPos,scene) {
        this.xPos = xPos;
        this.yPos = yPos;
        this.scene = scene;
        this.sprites = [];
        for (var i=0; i<4; i++) {
            if (i<2) {
                var x = xPos + i*32;
                var y = yPos;
            } else {
                var x = xPos + (i-2)*32;
                var y = yPos+32;
            }

            this.sprites.push(scene.add.sprite(x,y,'sysTile'));
        }
    }

    animate() {
        this.sprites[0].play('helperTL',true);
        this.sprites[1].play('helperTR',true);
        this.sprites[2].play('helperBL',true);
        this.sprites[3].play('helperBR',true);
    }
}

class RepairTracker {
    constructor(funct,xPos,yPos,powerLevel,barChunk,scene) {
        this.funct = funct;
        this.xPos = xPos;
        this.yPos = yPos;
        var xPB = xPos + 64;
        var yPB = yPos + 64;
        this.PowerBar = new PowerBar((funct + 'Bar'),powerLevel,xPB,yPB,barChunk,scene)
        scene.add.text(xPos+16, yPos,funct);
        scene.add.text(xPos-24, (yPos+26),'Current');
        this.scene = scene;
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
        this.scene = scene;
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

class RepairTotal {
    constructor(ID,powerLevel,xPos,yPos,scene) {
        this.ID = ID;
        this.powerLevel = powerLevel;
        this.xPos = xPos;
        this.yPos = yPos;
        this.scene = scene;
        this.chunks = [];
        for (var i=0;i<25;i++) {
            var xBar = xPos + 24*i;
            this.chunks.push(scene.add.sprite(xBar,yPos,'border').setScale(0.75));
        }
        scene.add.text(xPos+170, (yPos+20),'Status of Full System Repair');
    }

    animate() {
        var powerTracker = this.powerLevel;
        for (var i=0;i<this.chunks.length; i++) {
            var currentChunk = this.chunks[i];
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
        this.moreButton = new PowerButton((ID + 'Plus'),xPos-64,yPos,true,scene,this);
        this.lessButton = new PowerButton((ID + 'Minus'),xPos-32,yPos,false,scene,this);
        this.scene = scene;
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
        var scene = this.scene
        scene.repairSound.play();
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

var blobbyHelper;

var repairBar;

class SystemScene extends Phaser.Scene {
    init() {
        console.log("System Scene Init");
    }

    create() {
        console.log("System Create");
        this.add.text(0, 0, 'System');

        this.repairSound = this.sound.add('click2');

        blobbyHelper = new Blobby(118,440,this);

        camera1 = new RepairTracker('Camera 1',136,128,0,2,this);
        camera2 = new RepairTracker('Camera 2',308,128,0,2,this);
        camera3 = new RepairTracker('Camera 3',136,228,0,2,this);
        camera4 = new RepairTracker('Camera 4',308,228,0,2,this);
        doors = new RepairTracker('Door Security',480,128,0,4,this);
        database = new RepairTracker('  Database',480,228,0,4,this);
        repair = new RepairTracker('System Repair',180,327,0,5,this);
        panel = new RepairTracker('Panel Access',448,327,0,4,this);

        repairBar = new RepairTotal('Total',45,112,500,this);

         //constructor(ID,powerLevel,xPos,yPos,scene) {;

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
        doors.animate();
        database.animate();
        repair.animate();
        panel.animate();
        repairBar.animate();
        blobbyHelper.animate();
    }
}



export default SystemScene;