/** @type {import("../typings/phaser")} */

import globalConfig from './global-config.js';
import SystemState from './state-machine.js';
import {c2px, c2py} from './inner-screen-positions.js';
import TabStrip from './tab-strip.js';

class DirectoryScene extends Phaser.Scene {
    init() {
        this.events.on('wake', function() {

        })
    }
    create() {
        this.tabStrip = new TabStrip(this, 'Database');
    }
    update(time, delta) {
        
    }


}

class SlimeEntry {
    constructor(slimeData, scene) {
        this.dbLevel = 0;

        
    }

    setDBLevel(level) {
        this.dbLevel = level;
    }

    makeClear() {
        
    }

    setVisibility(visibility) {

    }
}



export default DirectoryScene;