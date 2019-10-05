/** @type {import("../typings/phaser")} */

import {screenHeight, screenWidth} from './global-config.js';
import SystemState from './state-machine.js';

class FrameScene extends Phaser.Scene {
    frameImage = null;

    create() {
        this.frameImage = this.add.image(0, 0, 'frame');
    }
    update(time, delta) {
        
    }
}

export default FrameScene;