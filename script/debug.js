import {screenHeight, screenWidth} from './global-config.js';
import SystemState from './state-machine.js';

class DebugScene extends Phaser.Scene {
    init() {
        console.log("Debug Init");
    }
    create() {
        console.log("Debug Create");
        this.add.text(0, 0, 'Debug');

        
    }
}

export default DebugScene;