/** @type {import("../typings/phaser")} */

import globalConfig from './global-config.js';
import SystemState from './state-machine.js';
import {c2px, c2py} from './inner-screen-positions.js';
import TabStrip from './tab-strip.js';
import {StaticSlime, SlimeVisual, SlimeData} from './slime-creator.js';

class DirectoryScene extends Phaser.Scene {
    init() {
        this.events.on('wake', function() {
            if (SystemState.repairSystem) {
                let dbStatus = SystemState.repairSystem.database.getPower();
                
                
                if (dbStatus > this.dbStatus) {
                    this.dbStatus = dbStatus;
                }
            }
        }, this);
    }
    create() {
        this.tabStrip = new TabStrip(this, 'Database');
        this.dbStatus = 0;

        this.slimeEntries = [];

        var rect = this.add.graphics({x: 0, y: 0});
        rect.fillStyle(0xffffff, 0.2);
        rect.fillRoundedRect(0, 0, 5 * 32, 2 * 32, 5);
        rect.generateTexture('entryRoundedRect', 5*32, 2 * 32);

        this.moveToLevel1();
    }
    update(time, delta) {
        this.slimeEntries.forEach((entry) => entry.animate());
    }

    moveToLevel0() {
        
    }

    moveToLevel1() {
        this.slimeEntries = SystemState.allSlimes.map((slimeData, i) => {
            let row = Math.floor(i / 3);
            let col = i % 3;
            return new SlimeEntry(this, c2px(col * 6), c2py(row * 2.5 + .5), slimeData);
        });
    }

    moveToLevel2() {
        this.slimeEntries.forEach((slime) => slime.makeClear());
    }

    moveToLevel3() {

    }
}

class SlimeEntry {
    /**
     * 
     * @param {Phaser.Scene} scene 
     * @param {number} x 
     * @param {number} y 
     * @param {SlimeData} slimeData 
     */
    constructor(scene, x, y, slimeData) {
        this.scene = scene;
        this.isClear = false;
        this.slimeData = slimeData;
        this.randomNum = Math.ceil(Math.random() * 6);

        this.x = x;
        this.y = y;

        this.frame = this.scene.add.image(x + (0.5 * 32), y + (0.5 * 32), 'entryRoundedRect');
        this.frame.setOrigin(0, 0);
        this.slimeSprite = new StaticSlime(scene, x + (1 * 32), y + (1 * 32));
        this.name = this.scene.add.image(x + 2.3 * 32, y + (0.5 * 32), 'distorted' + this.randomNum);
        this.name.setOrigin(0, 0);

        // this.frame.setInteractive().on('pointerdown', function() {
        //     this.makeClear();
        // }, this);
    }

    makeClear() {
        this.slimeSprite.destroy();
        this.slimeSprite = new SlimeVisual(this.slimeData, this.scene);
        this.slimeSprite.adjustPosAbsolute(this.x + (1.5 * 32), this.y + (1.5 * 32));
        this.name.destroy();
        this.name = this.scene.add.text(this.x + 2.3 * 32, this.y + 1 * 32, this.slimeData.firstName + '\n' + this.slimeData.lastName);
        this.name.setFontSize(12);
        this.name.setOrigin(0, 0);
    }

    setVisible(visible) {
        this.slimeSprite.setVisible(visible);
    }

    animate() {
        this.slimeSprite.animate();
    }
}



export default DirectoryScene;