/** @type {import("../typings/phaser")} */

import {screenHeight, screenWidth} from './global-config.js';
import SystemState from './state-machine.js';

class FrameScene extends Phaser.Scene {
    create() {
        this.frameImage = this.add.image(0, 0, 'frame');
        this.frameImage.setOrigin(0, 0);
        this.frameImage.setVisible(false);
    }
    update(time, delta) {
        
    }
}

export default FrameScene;