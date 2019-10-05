import {screenHeight, screenWidth} from './global-config.js';
import SystemState from './state-machine.js';

class MenuScene extends Phaser.Scene {
    init() {
        console.log("Menu Init");
    }
    create() {
        console.log("Menu Create");
        this.add.text(screenWidth/2, screenHeight/2, 'Click Anywhere to Start');

        this.input.once('pointerdown', function() {
            console.log("Clicked, starting game");
            //SystemState.gameStart();
            SystemState.debugTest();
        }, this);
    }
}

export default MenuScene;