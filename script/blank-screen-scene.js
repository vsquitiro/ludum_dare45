/** @type {import("../typings/phaser")} */

import globalConfig from './global-config.js';
import SystemState from './state-machine.js';

class BlankScreenScene extends Phaser.Scene {
    constructor(config) {
        super(config);
        this.bootingText = "Booting";
        this.currentTextDisplayed = "";
        this.characterWidth = 20;
        this.timePerCharacter = 250;
        this.cursorBlinkTime = 500;
        this.startPos = globalConfig.frameWidth + 10;
        this.cursor;
        this.bootTextDisplay;
    }
    init() {
        console.log("Blank Screen Init");
    }
    create() {
        this.cursor = this.add.rectangle(this.startPos, this.startPos, this.characterWidth, this.characterWidth * 1.5, 0xffffff);
        this.bootTextDisplay = this.add.text(this.startPos, this.startPos, this.currentTextDisplayed);
    }
    update(time, delta) {
        const blankStart = SystemState.timeEnteredBlank;
        const cursorStart = SystemState.timeCursorStart;

        if (SystemState.state == "boot") {
            // this.blinkCursor(time);
            // this.renderText(time);
        } else if (SystemState.cursorStart) {
            if (time - cursorStart > globalConfig.cursorTime) {
                SystemState.boot();
            }

            // this.blinkCursor(time);
            // this.renderText(time);
        } else if (blankStart) {
            if (time - blankStart > globalConfig.blankScreenTime) {
                SystemState.startCursor();
            }
        }
    }

    // blinkCursor(time) {
    //     const cursorStart = SystemState.timeCursorStart;
    //     const delta = time - cursorStart;

    //     const blinks = Math.floor(delta / this.cursorBlinkTime);
    //     const visible = blinks % 2 == 0;

    //     const characters = Math.min(Math.floor(delta / this.timePerCharacter), this.bootingText.length);

    //     this.cursor.setX(characters * this.characterWidth);

    //     if (visible) {
    //         this.cursor.visible = true;
    //     } else {
    //         this.cursor.visible = false;
    //     }
    // }

    // renderText(time) {
    //     const characters = Math.min(Math.floor(delta / this.timePerCharacter), this.bootingText.length);
    //     const textToShow = this.bootingText.slice(0, characters);
    //     if (textToShow !== this.currentTextDisplayed) {
    //         this.currentTextDisplayed = textToShow;
    //         this.bootTextDisplay.setText(textToShow);
    //     }
    // }
}

export default BlankScreenScene;