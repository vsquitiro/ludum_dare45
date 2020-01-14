/** @type {import("../typings/phaser")} */

import SystemState from "./state-machine.js";
import config from './global-config.js';
import Loader from './loader-scene.js';
import Menu from './menu-scene.js';

const gameConfig = {
    type: Phaser.AUTO,
    parent: "game-container",
    width: config.screenWidth,
    height: config.screenHeight,
};

const game = new Phaser.Game(gameConfig);

game.scene.add('loader', Loader, true);
game.scene.add('menu', Menu, false);

SystemState.setGame(game);
