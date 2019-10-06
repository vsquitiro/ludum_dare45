import {c2px, c2py} from './inner-screen-positions.js';

const firstNames = ['Baby Oil', 'Bad News', 'Big Burps', "Beenie", "Weenie",
"Stinkbug", 'Boxelder', 'Butterbean', 'Buttermilk', 'Chad', 'Chesterfield',
'Chewy', 'Cinnabuns', 'Cleet', 'Cornbread', 'Crab Meat', 'Dark Skies',
'Dennis Clawhammer', 'Elphonso', 'Fancypants', 'Figgs', 'Foncy', 'Gootsy',
'Greasy Jim', 'Huckleberry', 'Huggy', 'Ignatious', 'Jimbo', "Pottin", 'Johnny',
'Lemongrass', 'Lil Debil', 'Longbranch', 'Lunch Money', 'Mergatroid',
'Mr Peabody', 'Oil-Can', 'Oinks', 'Old Scratch', 'Ovaltine', 'Pennywhistle',
'Pitchfork Ben', 'Potato Bug', 'Pushmeet', 'Rock Candy', 'Schlomo',
'Scratchensniff', 'Scut', "Squirt", 'Slaps', 'Snakes', 'Snoobs', 'Snorki',
'Soupcan Sam', 'Spitzitout', 'Squids', 'Stinky', 'Storyboard', 'Sweet Tea',
'TeeTee', 'Wheezy Joe', "Winston", 'Jazz Hands', 'Worms'];
const lastNames = ['Appleyard', 'Bigmeat', 'Bloominshine', 'Boogerbottom',
'Breedslovetrout', 'Butterbaugh', 'Clovenhoof', 'Clutterbuck',
'Cocktoasten', 'Endicott', 'Fewhairs', 'Gooberdapple', 'Goodensmith',
'Goodpasture', 'Guster', 'Henderson', 'Hooperbag', 'Hoosenater',
'Hootkins', 'Jefferson', 'Jenkins', 'Jingley-Schmidt', 'Johnson',
'Kingfish', 'Listenbee', "M'Bembo", 'McFadden', 'Moonshine', 'Nettles',
'Noseworthy', 'Olivetti', 'Outerbridge', 'Overpeck', 'Overturf',
'Oxhandler', 'Pealike', 'Pennywhistle', 'Peterson', 'Pieplow',
'Pinkerton', 'Porkins', 'Putney', 'Quakenbush', 'Rainwater',
'Rosenthal', 'Rubbins', 'Sackrider', 'Snuggleshine', 'Splern',
'Stevens', 'Stroganoff', 'Sugar-Gold', 'Swackhamer', 'Tippins',
'Turnipseed', 'Vinaigrette', 'Walkingstick', 'Wallbanger', 'Weewax',
'Weiners', 'Whipkey', 'Wigglesworth', 'Wimplesnatch', 'Winterkorn',
'Woolysocks'];

class SlimeData {
    constructor(ID,traitor) {
        var colors = [0xffffff,0xc0c0c0,0x808080,0x000000,0xff0000,0x800000,0xffff00,0x808000,0x00ff00,0x008000,0x00ffff,0x008080,0x0000ff,0x000080,0xff00ff,0x800080];
        var eyeKeys = [0,1,2,3,4,5,6];
        var mouthKeys = [0,1,2,3,4,5,6];
        var hairKeys = [0,1,2,3,4,5];

        var rnd = Phaser.Math.RND;
        this.ID = ID;
        this.roomID = -1;
        this.eyeKey = rnd.pick(eyeKeys);
        this.mouthKey = rnd.pick(mouthKeys);
        this.hairKey = rnd.pick(hairKeys);
        this.tint = rnd.pick(colors);
        this.tintHair = rnd.pick(colors);
        this.firstName = rnd.pick(firstNames);
        this.lastName = rnd.pick(lastNames);
        this.traitor = traitor;
    }

    setRoomID(room) {
        this.roomID = room;
    }
}

class SlimeVisual {
    constructor(slimeData,scene) {
        this.slimeData = slimeData;
        this.scene = scene;


        this.xPos = c2px(3);
        this.yPos = c2py(3);
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

class StaticSlime {
    /**
     * 
     * @param {Phaser.Scene} scene 
     * @param {number} x 
     * @param {number} y 
     */
    constructor(scene, x, y) {
        this.scene = scene;
        this.randSlime = Math.floor(Math.random() * 3) + 1;

        //create body animation
        this.bod = this.scene.add.sprite(x, y);
        this.bod.setOrigin(0, 0);
    }

    setVisible(visible) {
        this.bod.setVisible(visible);
    }

    destroy() {
        this.bod.destroy();
    }

    animate() {
        this.bod.play('staticSlime' + this.randSlime, true);
    }
}

export {
    SlimeData,
    SlimeVisual,
    StaticSlime,
}

