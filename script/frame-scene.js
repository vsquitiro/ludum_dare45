/** @type {import("../typings/phaser")} */

import {screenHeight, screenWidth} from './global-config.js';
import SystemState from './state-machine.js';

class FrameScene extends Phaser.Scene {
    create() {
        this.frameMap = this.make.tilemap({key: "computerFrameJson"});
        const tileset = this.frameMap.addTilesetImage('Frame', 'computerFrameTiles');
        this.frameLayer = this.frameMap.createStaticLayer('Frame', tileset, 0, -4);
        this.folderLayer = this.frameMap.createStaticLayer('Folder', tileset, undefined, 0);
        
        this.frameLayer.setVisible(false);
        this.folderLayer.setVisible(false);
    }
    update(time, delta) {
        
    }
}

export default FrameScene;