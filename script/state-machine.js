/** @type {import("../typings/phaser")} */
/** @type {import("../typings/stateMachine")} */

import DebugScene from './debug.js';
import BlankScreenScene from './blank-screen-scene.js';
import FrameScene from './frame-scene.js';


//States
const menu = "menu",
      debug = "debug",
      blankScreen = "blankScreen",
      login = "login",
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
        { name: 'viewComms', from: [directory, system, camera], to: comms },
        //win
        //lose
    ],
    data: {
        game: null,
        timeEnteredBlank: null,
        timeCursorStart: null,
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
        onBoot: function() { console.log('I froze') },
        onLogin: function() { console.log('I vaporized') },
        onViewCameras: function() { console.log('I condensed') },
        onViewDirectory: function() { console.log('I condensed') },
        onViewSystem: function() { console.log('I condensed') },
        onViewComms: function() { console.log('I condensed') },
    }
});

export default SystemState;