import {c2px, c2py} from './inner-screen-positions.js';

class SlimeData {
    constructor(ID,traitor) {
        var colors = [0xffffff,0xc0c0c0,0x808080,0x000000,0xff0000,0x800000,0xffff00,0x808000,0x00ff00,0x008000,0x00ffff,0x008080,0x0000ff,0x000080,0xff00ff,0x800080];
        var eyeKeys = [0,1,2,3,4,5,6];
        var mouthKeys = [0,1,2,3,4,5,6];
        var hairKeys = [0,1,2,3,4,5];
        var roomID = [0,1,2,3];

        var rnd = Phaser.Math.RND;
        this.ID = ID;
        this.roomID = rnd.pick(roomID);
        this.eyeKey = rnd.pick(eyeKeys);
        this.mouthKey = rnd.pick(mouthKeys);
        this.hairKey = rnd.pick(hairKeys);
        this.tint = rnd.pick(colors);
        this.tintHair = rnd.pick(colors);
        this.traitor = traitor;
    }

    setRoomID(room) {
        this.roomID = room;
    }
}

class SlimeVisual {
    constructor(slimeData,scene) {
        var xRand = [0,1,2,3,4,5,6,7,8]
        var yRand = [1,2,3,4];
        var rnd = Phaser.Math.RND;
        this.slimeData = slimeData;
        this.scene = scene;

        this.xPos = c2px(rnd.pick(xRand));
        this.yPos = c2py(rnd.pick(yRand));
        this.xRoom;
        this.yRoom;
        this.adjustPos(this.xPos,this.yPos);
        // this.xPos = c2px(-10);
        // this.yPos = c2py(-10);
        

        this.eyeIdx = 2 + 6*(slimeData.eyeKey);
        this.eyeKey = 'eye' + this.slimeData.ID;
        this.mouthIdx = 4 + 6*(slimeData.mouthKey);
        this.mouthKey = 'mouth' + this.slimeData.ID;
        this.hairIdx = 6 + 6*(slimeData.hairKey);
        this.hairKey = 'hair' + this.slimeData.ID;
        this.bounceKey = 'bounce' + this.slimeData.ID;

        this.tint = slimeData.tint;
        this.tintHair = slimeData.tintHair;

        this.setSpriteAndColor(scene,'mass')

        // this.bod = scene.add.sprite(this.xPos,this.yPox,'mass');
        // this.eyes = scene.add.sprite(this.xPos,this.yPox,'mass');
        // this.mouth = scene.add.sprite(this.xPos,this.yPox,'mass');
        // this.hair = scene.add.sprite(this.xPos,this.yPox,'mass');

        //create eye animations
        this.scene.anims.create({
            key: this.eyeKey,
            frames: this.scene.anims.generateFrameNumbers('mass', {start: this.eyeIdx, end: this.eyeIdx+1}),
            frameRate: 5,
            repeat: -1
        })

        //create mouth animations
        this.scene.anims.create({
            key: this.mouthKey,
            frames: this.scene.anims.generateFrameNumbers('mass', {start: this.mouthIdx, end: this.mouthIdx+1}),
            frameRate: 5,
            repeat: -1
        })

        //create hair animations
        this.scene.anims.create({
            key: this.hairKey,
            frames: this.scene.anims.generateFrameNumbers('mass', {start: this.hairIdx, end: this.hairIdx+1}),
            frameRate: 5,
            repeat: -1
        })

        //create body animation
        this.scene.anims.create({
            key: this.bounceKey,
            frames: this.scene.anims.generateFrameNumbers('mass', {start: 0, end: 1}),
            frameRate: 5,
            repeat: -1
        })
    }

    // setPosition(x,y) {
    //     var room = this.slimeData.roomID;
    //     if (room == 0) {
    //         this.xPos = x;
    //         this.yPos = y;
    //     } else if(room == 1) {
    //         this.xPos = x+288;
    //         this.yPos = y;
    //     } else if (room ==2) {
    //         this.xPos = x;
    //         this.yPos = y+160;
    //     } else if (room ==3) {
    //         this.xPos = x+288;
    //         this.yPos = y+160
    //     }
    // }

    adjustPos(x,y) {
        var room = this.slimeData.roomID;
        console.log('slime view: ' + room);
        if(room == 0) {
            this.xRoom = x;
            this.yRoom = y;
        } else if (room == 1) {
            this.xRoom = x + 288;
            this.yRoom = y;
        } else if (room == 2) {
            this.xRoom = x;
            this.yRoom = y + 160;
        } else if (room == 3) {
            this.xRoom = x + 288;
            this.yRoom = y + 160;
        }
        console.log(this.ID);
        console.log(this.xRoom);
        console.log(this.yRoom);
    }

    setBody(scene) {
        this.bod = this.scene.add.sprite(this.xRoom,this.yRoom);
    }

    setEyes(scene) {
        this.eyes = this.scene.add.sprite(this.xRoom,this.yRoom);
    }

    setMouth(scene) {
        this.mouth = this.scene.add.sprite(this.xRoom,this.yRoom);
    }

    setHair(scene) {
        this.hair = this.scene.add.sprite(this.xRoom,this.yRoom);
    }

    setColor() {
        this.bod.setTint(this.tint);
    }

    setColorEyes() {
        this.eyes.setTint(this.tint);
    }

    setColorHair() {
        this.hair.setTint(this.tintHair);
    }

    setSprite(scene,key) {
        this.setBody(scene,key);
        this.setEyes(scene,key);
        this.setMouth(scene,key);
        this.setHair(scene,key);
    }

    setSpriteAndColor(scene,key) {
        this.setSprite(scene,key);
        this.setColor();
        this.setColorEyes();
        this.setColorHair();
    }

    animate() {
        this.bod.play(this.bounceKey,true);
        this.eyes.play(this.eyeKey,true);
        this.mouth.play(this.mouthKey,true);
        this.hair.play(this.hairKey,true);
    }

}

class StaticSlime {
    constructor(scene, xPos, yPos) {
        this.scene = scene;
        this.randSlime = Math.floor(Math.random() * 3);
        

        //create eye animations
        this.scene.anims.create({
            key: this.eyeKey,
            frames: this.scene.anims.generateFrameNumbers('mass', {start: this.eyeIdx, end: this.eyeIdx+1}),
            frameRate: 5,
            repeat: -1
        })

        //create mouth animations
        this.scene.anims.create({
            key: this.mouthKey,
            frames: this.scene.anims.generateFrameNumbers('mass', {start: this.mouthIdx, end: this.mouthIdx+1}),
            frameRate: 5,
            repeat: -1
        })

        //create hair animations
        this.scene.anims.create({
            key: this.hairKey,
            frames: this.scene.anims.generateFrameNumbers('mass', {start: this.hairIdx, end: this.hairIdx+1}),
            frameRate: 5,
            repeat: -1
        })

        //create body animation
        this.scene.anims.create({
            key: this.bounceKey,
            frames: this.scene.anims.generateFrameNumbers('mass', {start: 0, end: 1}),
            frameRate: 5,
            repeat: -1
        })
    }

    // setPosition(x,y) {
    //     var room = this.slimeData.roomID;
    //     if (room == 0) {
    //         this.xPos = x;
    //         this.yPos = y;
    //     } else if(room == 1) {
    //         this.xPos = x+288;
    //         this.yPos = y;
    //     } else if (room ==2) {
    //         this.xPos = x;
    //         this.yPos = y+160;
    //     } else if (room ==3) {
    //         this.xPos = x+288;
    //         this.yPos = y+160
    //     }
    // }

    setBody(scene) {
        this.bod = this.scene.add.sprite(this.xPos,this.yPos);
    }

    setEyes(scene) {
        this.eyes = this.scene.add.sprite(this.xPos,this.yPos);
    }

    setMouth(scene) {
        this.mouth = this.scene.add.sprite(this.xPos,this.yPos);
    }

    setHair(scene) {
        this.hair = this.scene.add.sprite(this.xPos,this.yPos);
    }

    setColor() {
        this.bod.setTint(this.tint);
    }

    setColorEyes() {
        this.eyes.setTint(this.tint);
    }

    setColorHair() {
        this.hair.setTint(this.tintHair);
    }

    setSprite(scene,key) {
        this.setBody(scene,key);
        this.setEyes(scene,key);
        this.setMouth(scene,key);
        this.setHair(scene,key);
    }

    setSpriteAndColor(scene,key) {
        this.setSprite(scene,key);
        this.setColor();
        this.setColorEyes();
        this.setColorHair();
    }

    animate() {
        this.bod.play(this.bounceKey,true);
        this.eyes.play(this.eyeKey,true);
        this.mouth.play(this.mouthKey,true);
        this.hair.play(this.hairKey,true);
    }

}

export {
    SlimeData,
    SlimeVisual,
    StaticSlime,
}

