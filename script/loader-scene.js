/** @type {import("../typings/phaser")} */

import {screenHeight, screenWidth} from './global-config.js';

const LoaderConfig = {
    key: 'loader',
    pack: {
        files: [
            {
                type: 'image',
                key: 'loading',
                url: 'assets/loading.png',
            }
        ]
    },
    init: init,
    preload: preload,
    create: create,
};

function init() {
    console.log("Loader Init");
    var image = this.add.image(0, 0, 'loading');
    image.setOrigin(0.5, 0.5);
    image.setPosition(screenWidth / 2, screenHeight / 2);
}

function preload() {
    console.log("Loader Preload");
    // Add all assets to be loaded here.
    this.load.spritesheet('mass','assets/slimeTiles.png', {frameWidth: 32, frameHeight: 32});
    this.load.spritesheet('border','assets/bordertileset.png', {frameWidth: 32, frameHeight: 32});

    this.load.tilemapTiledJSON('systemTilemap', 'assets/system.json');
    this.load.spritesheet('sysTile','assets/systemtiles.png', {frameWidth: 32, frameHeight: 32});
}

function create() {
    console.log("Loader Create");
    this.scene.start('menu');
    this.scene.switch('loader', 'menu');
}

export default LoaderConfig;