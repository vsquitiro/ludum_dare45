/** @type {import("../typings/phaser")} */

import globalConfig from './global-config.js';
import SystemState from './state-machine.js';
import {c2px, c2py} from './inner-screen-positions.js';
import TabStrip from './tab-strip.js';

class DirectoryScene extends Phaser.Scene {
    create() {
        this.tabStrip = new TabStrip(this, 'Database');
    }
    update(time, delta) {
        
    }
}

export default DirectoryScene;