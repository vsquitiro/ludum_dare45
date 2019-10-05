/** @type {import("../typings/phaser")} */

import {screenHeight, screenWidth} from './global-config.js';
import SystemState from './state-machine.js';

var camera;
class PowerButton {
    constructor(ID,xPos,yPos,raise,scene,powerBar) {
        this.ID = ID;
        this.xPos = xPos;
        this.yPos = yPos;
        this.raise = raise;
        this.sprite = scene.add.sprite(xPos,yPos,'mass');
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

}
class PowerBar {
    constructor(ID,powerLevel,xPos,yPos,barChunk,scene) {
        this.ID = ID;
        this.powerLevel = powerLevel;
        this.powerMax = barChunk*4;
        this.xPos = xPos;
        this.yPos = yPos;
        this.barChunk = [];
        for (var i=0;i<barChunk;i++) {
            var xBar = xPos + 32*i;
            this.barChunk.push(scene.add.sprite(xBar,yPos,'border'));
        }
        this.moreButton = new PowerButton((ID*2),xPos-32,yPos,true,scene,this);
        this.lessButton = new PowerButton((ID*2+1),xPos-64,yPos,false,scene,this);
    }

    animate() {
        var powerTracker = this.powerLevel;
        for (var i=0;i<this.barChunk.length; i++) {
            var currentBar = this.barChunk[i];
            if (powerTracker >= 4) {
                currentBar.play('bar4',true);
                powerTracker -= 4;
            } else if (powerTracker==3) {
                currentBar.play('bar3',true);
                powerTracker = 0;
            } else if (powerTracker==2) {
                currentBar.play('bar2',true);
                powerTracker = 0;
            } else if (powerTracker==1) {
                currentBar.play('bar1',true);
                powerTracker = 0;
            } else {
                currentBar.play('bar0',true);
            }
        }
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

var classyBar;

class SystemScene extends Phaser.Scene {
    init() {
        console.log("System Scene Init");
    }

    create() {
        console.log("System Create");
        this.add.text(0, 0, 'System');

        classyBar = new PowerBar(0,3,300,300,3,this);

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
    }

    update () {
        classyBar.animate();
    }
}



export default SystemScene;