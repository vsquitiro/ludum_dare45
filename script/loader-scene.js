/** @type {import("../typings/phaser")} */

import {screenHeight, screenWidth} from './global-config.js';

class Loader extends Phaser.Scene {
    key = 'loader';
    constructor(config) {
        config = config || {};
        config.pack = {
            files: [
                {
                    type: 'image',
                    key: 'loading',
                    url: 'assets/loading.png',
                }
            ]
        };

        super(config);
    }
    init() {
        console.log("Loader Init");
        var image = this.add.image(0, 0, 'loading');
        image.setOrigin(0.5, 0.5);
        image.setPosition(screenWidth / 2, screenHeight / 2);
    }

    preload() {
        console.log("Loader Preload");
        // Add all assets to be loaded here.
        this.load.spritesheet('mass','assets/SlimeTiles.png', {frameWidth: 32, frameHeight: 32});
        this.load.spritesheet('border','assets/bordertileset.png', {frameWidth: 32, frameHeight: 32});

        this.load.tilemapTiledJSON('systemTilemap', 'assets/system.json');
        this.load.spritesheet('sysTile','assets/systemtiles.png', {frameWidth: 32, frameHeight: 32});

        this.load.tilemapTiledJSON('cameraTilemap', 'assets/rooms.json');
        this.load.spritesheet('cameraTiles','assets/Cameratiles.png', {frameWidth: 32, frameHeight: 32});

        //Sounds
        this.load.audio('error1', 'assets/Error1.mp3');
        this.load.audio('error2', 'assets/Error2.mp3');
        this.load.audio('startup', 'assets/StartUp.mp3');
        this.load.audio('click2', 'assets/Click2.mp3');
        this.load.audio('lightClick', 'assets/LightClick.mp3');
    }

    create() {
        console.log("Loader Create");

        // Create Animations
        this.anims.create({
            key: 'staticSlime1',
            frames: this.anims.generateFrameNumbers('cameraTiles', {start: 9, end: 10}),
            frameRate: 5,
            retpeat: -1
        });
        this.anims.create({
            key: 'staticSlime2',
            frames: this.anims.generateFrameNumbers('cameraTiles', {start: 20, end: 21}),
            frameRate: 5,
            retpeat: -1
        });
        this.anims.create({
            key: 'staticSlime3',
            frames: this.anims.generateFrameNumbers('cameraTiles', {start: 31, end: 32}),
            frameRate: 5,
            retpeat: -1
        });

        // Transition to start scene
        this.scene.start('menu');
        this.scene.switch('loader', 'menu');
    }
}

export default Loader;