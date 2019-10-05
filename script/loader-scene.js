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
    this.load.image('slime', 'assets/slime.png');
    this.load.spritesheet('mass','assets/slimeTiles.png', {frameWidth: 32, frameHeight: 32});
    this.load.spritesheet('file','assets/filessprites.png', {frameWidth: 32, frameHeight: 32});
    this.load.image('border','assets/bordertileset.png', {frameWidth: 32, frameHeight: 32});
    this.load.image('frame', 'assets/frame-placeholder.png')
}

function create() {
    console.log("Loader Create");
    this.scene.start('menu');
    this.scene.switch('loader', 'menu');
}

export default LoaderConfig;