/** @type {import("../typings/phaser")} */

import globalConfig from './global-config.js';
import SystemState from './state-machine.js';

class FrameScene extends Phaser.Scene {
    create() {
        this.frameMap = this.make.tilemap({key: "systemTilemap"});
        const tileset = this.frameMap.addTilesetImage('System', 'system');
        this.frameLayer = this.frameMap.createStaticLayer('Frame', tileset, 0, -4);
        this.folderLayer = this.frameMap.createStaticLayer('Folder', tileset, 32 * 10, 0);
        
        this.frameLayer.setVisible(false);
        this.folderLayer.setVisible(false);
    }
    update(time, delta) {
        if (SystemState.timeLoginStart && !SystemState.lightsOn) {
            if (time - SystemState.timeLoginStart > globalConfig.lightOffTime) {
                SystemState.lightsOn = true;
                this.frameLayer.setVisible(true);
                this.folderLayer.setVisible(true);
            }
        }
    }
}

export default FrameScene;