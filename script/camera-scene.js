/** @type {import("../typings/phaser")} */

import globalConfig from './global-config.js';
import SystemState from './state-machine.js';
import {c2px, c2py} from './inner-screen-positions.js';
import TabStrip from './tab-strip.js';

class CameraScene extends Phaser.Scene {
    create() {
        this.tabStrip = new TabStrip(this, 'Cameras');
        var cam1 = this.add.rectangle(c2px(0), c2py(0), 9*32, 5*32);
        cam1.setStrokeStyle(2, 0xffffff);
        cam1.setOrigin(0, 0);
        var cam2 = this.add.rectangle(c2px(9), c2py(0), 9*32, 5*32);
        cam2.setStrokeStyle(2, 0xffffff);
        cam2.setOrigin(0, 0);
        var cam3 = this.add.rectangle(c2px(0), c2py(5), 9*32, 5*32);
        cam3.setStrokeStyle(2, 0xffffff);
        cam3.setOrigin(0, 0);
        var cam4 = this.add.rectangle(c2px(9), c2py(5), 9*32, 5*32);
        cam4.setStrokeStyle(2, 0xffffff);
        cam4.setOrigin(0, 0);
    }
    update(time, delta) {
        
    }
}

export default CameraScene;