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
    this.load.image('staticSlime','assets/slime.png');
    this.load.spritesheet('slime','assets/slimeTiles.png',
        {frameWidth: 32, frameHeight: 32});
    this.load.image('border','assets/bordertileset.png', 
        {frameWidth: 32, frameHeight: 32});
    console.log(SystemState.state);

}

var workers;
var allSlimes;

function create () {

    var config = {
        key: 'wiggle',
        frames: this.anims.generateFrameNumbers('slime', {start: 0, end: 1, first:0}),
        frameRate: 30,
        repeat: -1,
        repeatDelay: 2
    };

    this.anims.create(config);

    for (var i=0; i<5; i++) {
        var x = Phaser.Math.Between(10,790);
        var y = Phaser.Math.Between(10,590);

        allSlimes = this.add.sprite(x,y, 'slime', 1);

        allSlimes.anims.delayedPlay(Math.random() * 3, 'wiggle');
    }

    workers = this.add.sprite(400,300,'slime');
    this.anims.create({
        key: 'bounce',
        frames: this.anims.generateFrameNumbers('slime', {start: 0, end: 1}),
        frameRate: 5,
        repeat: -1
    })

}

function update () {
    workers.anims.play('bounce',true);
    allSlimes.anims.play('bounce',true);
}