/** @type {import("../typings/phaser")} */
/** @type {import("../typings/stateMachine")} */

import DebugScene from './debug.js';
import BlankScreenScene from './blank-screen-scene.js';
import FrameScene from './frame-scene.js';
import SystemScene from './system-scene.js';
import LoginScene from './login-scene.js';
import CameraScene from './camera-scene.js';


//States
const menu = "menu",
      debug = "debug",
      blankScreen = "blankScreen",
      login = "loginScreen",
      camera = "camera",
      directory = "directory",
      system = "system",
      comms = "comms";

const SystemState = new StateMachine({
    init: menu,
    transitions: [
        { name: 'gameStart', from: menu, to: blankScreen },
        { name: 'debugTest', from: menu, to: debug },
        { name: 'boot', from: blankScreen, to: login },
        { name: 'login', from: login, to: camera },
        { name: 'viewCameras', from: [directory, system, comms], to: camera },
        { name: 'viewDirectory', from: [camera, system, comms], to: directory },
        { name: 'viewSystem', from: [directory, camera, comms], to: system },
        // { name: 'viewSystem', from: menu, to: system},
        { name: 'viewComms', from: [directory, system, camera], to: comms },
        //win
        //lose
    ],
    data: {
        game: null,
        timeEnteredBlank: null,
        timeCursorStart: null,
        timeLoginStart: null,
        lightsOn: false,
    },
    methods: {
        // Game state management
        setGame: function(game) { this.game = game; },
        startCursor: function() { this.timeCursorStart = performance.now(); },

        // Transition handlers
        onLeaveMenu: function() {
            this.game.scene.remove('menu');
        },
        onDebugTest: function() {
            this.game.scene.add('debugScene', DebugScene, true);
        },
        onGameStart: function() {
            this.game.scene.add('blankScreenScene', BlankScreenScene, true);
            this.game.scene.add('frameScene', FrameScene, true);

            this.timeEnteredBlank = performance.now();
        },
        onLeaveBlankScreen: function() {
            this.game.scene.remove('blankScreenScene');
        },
        onBoot: function() {
            this.game.scene.add('loginScene', LoginScene, true);
            this.game.scene.bringToTop('frameScene');

            this.timeLoginStart = performance.now();
        },
        onLeaveLoginScreen: function() {
            this.game.scene.remove('loginScene');
        },
        onLogin: function() {
            this.currentScreen = camera;
            this.game.scene.add('cameraScene', CameraScene, true);
            this.game.scene.add('systemScene', SystemScene, false);

            this.game.scene.bringToTop('frameScene');
        },
        onViewCameras: function() {

        },
        onViewDirectory: function() {

        },
        onViewSystem: function() {
            this.game.scene.switch(this.currentScreen + "Scene", 'systemScene');
            this.currentScreen = system;
        },
        onViewComms: function() {

        },
    }
});

export default SystemState;