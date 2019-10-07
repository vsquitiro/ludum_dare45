import {c2px, c2py} from './inner-screen-positions.js';

class SlimeData {
    constructor(ID,traitor) {
        var colors = [0xffffff,0xc0c0c0,0x808080,0x000000,0xff0000,0x800000,0xffff00,0x808000,0x00ff00,0x008000,0x00ffff,0x008080,0x0000ff,0x000080,0xff00ff,0x800080];
        var eyeKeys = [0,1,2,3,4,5,6];
        var mouthKeys = [0,1,2,3,4,5,6];
        var hairKeys = [0,1,2,3,4,5];
        this.roomKeys = [0,1,2,3];
        this.xRand = [0,1,2,3,4,5,6,7,8]
        this.yRand = [1,2,3,4];

        var rnd = Phaser.Math.RND;
        this.xPos = c2px(rnd.pick(this.xRand));
        this.yPos = c2py(rnd.pick(this.yRand));
        this.ID = ID;
        this.roomID = rnd.pick(this.roomKeys);
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

    move() {
        var rnd = Phaser.Math.RND;
        this.setRoomID(rnd.pick(this.roomKeys));
        this.xPos = c2px(rnd.pick(this.xRand));
        this.yPos = c2py(rnd.pick(this.yRand));
    }
}

class SlimeVisual {
    constructor(slimeData,scene) {
        this.slimeData = slimeData;
        this.scene = scene;
        this.xRoom;
        this.yRoom;
        this.adjustPos(slimeData.xPos,slimeData.yPos);        

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

    refreshData(slimeData) {
        console.log(this.slimeData.xPos);
        this.slimeData = slimeData;
        console.log(this.slimeData.xPos);
    }

    adjustPos(x,y) {
        var room = this.slimeData.roomID;
        if(room == 0) {
            this.xRoom = x + 16;
            this.yRoom = y;
        } else if (room == 1) {
            this.xRoom = x + 304;
            this.yRoom = y;
        } else if (room == 2) {
            this.xRoom = x + 16;
            this.yRoom = y + 160;
        } else if (room == 3) {
            this.xRoom = x + 304;
            this.yRoom = y + 160;
        }
    }

    updatePosition(slimeData) {
        this.refreshData(slimeData);
        this.adjustPos(this.slimeData.xPos,this.slimeData.yPos);
        this.refreshSprites();

    }

    setBody(scene) {
        this.bod = this.scene.add.sprite(this.xRoom,this.yRoom);
    }

    refreshBody() {
        this.bod.x = this.xRoom;
        this.bod.y = this.yRoom;
    }

    setEyes(scene) {
        this.eyes = this.scene.add.sprite(this.xRoom,this.yRoom);
    }

    refreshEyes() {
        this.eyes.x = this.xRoom;
        this.eyes.y = this.yRoom;
    }

    setMouth(scene) {
        this.mouth = this.scene.add.sprite(this.xRoom,this.yRoom);
    }

    refreshMouth() {
        this.mouth.x = this.xRoom;
        this.mouth.y = this.yRoom;
    }

    setHair(scene) {
        this.hair = this.scene.add.sprite(this.xRoom,this.yRoom);
    }

    refreshHair() {
        this.hair.x = this.xRoom;
        this.hair.y = this.yRoom;
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

    refreshSprites() {
        console.log('slime: ' + this.ID + 'refreshed!');
        this.refreshBody();
        this.refreshEyes();
        this.refreshMouth();
        this.refreshHair();
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

