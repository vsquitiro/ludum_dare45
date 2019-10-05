/** @type {import("../typings/phaser")} */

import {screenHeight, screenWidth} from './global-config.js';
import SystemState from './state-machine.js';

class MenuScene extends Phaser.Scene {
    init() {
        console.log("Menu Init");
    }
    create() {
        console.log("Menu Create");
        var text = this.add.text(screenWidth/2, screenHeight/2, 'Click Anywhere to Start');
        text.setOrigin(0.5, 0.5);

        this.input.once('pointerdown', function() {
            console.log("Clicked, starting game");
<<<<<<< HEAD
            //SystemState.gameStart();
            //SystemState.debugTest();
            SystemState.viewSystem();
||||||| merged common ancestors
            // SystemState.gameStart();
            SystemState.debugTest();
=======
            SystemState.gameStart();
            // SystemState.debugTest();
>>>>>>> 470a3ffa66ac5050ea3a7427436d12a6f6f145bb
        }, this);
    }
}

export default MenuScene;

