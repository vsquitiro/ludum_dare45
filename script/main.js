import SystemState from "./state-machine.js";

var config = {
    type: Phaser.AUTO,
    parent: "game-container",
    width:800,
    height: 600,
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);

function preload () {
    this.load.image('slime','assets/slime.png');
    console.log(SystemState.state);
}

function create () {
    this.add.image(400,300, 'slime');
}

function update () {

}