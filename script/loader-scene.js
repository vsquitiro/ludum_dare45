import {screenHeight, screenWidth} from './global-config.js';

const loaderConfig = {
    key: 'loader',
    init: init,
    preload: preload,
    create: create,
    pack: {
        files: [
            {
                type: 'image',
                key: 'loading',
                url: 'assets/loading.png',
            }
        ]
    },
};

function init() {
    console.log("Loader Init");
    this.add.image(screenHeight / 2, screenWidth / 2, 'loading');
}

function preload() {
    console.log("Loader Preload");
    // Add all assets to be loaded here.
    this.load.image('slime', 'assets/slime.png');
}

function create() {
    console.log("Loader Create");
    this.scene.start('menu');
    this.scene.switch('loader', 'menu');
}

export default loaderConfig;