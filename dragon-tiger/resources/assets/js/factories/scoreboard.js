
let instance = {};

export default () => {
instance.createSpriteRoadMap =  function (imageRes,width,height,targetToSprite) {
    let spriteData= {
      images: [imageRes],
      frames  :{width:width, height:height},
      animations:{
        "pearl-p":0,
        "pearl-h":1,
        "pearl-f":2,
        "pearl-g":3,
        "pearl-b":4,
        "pearl-e":5,
        "pearl-q":6,
        "pearl-w":7,
        "pearl-t":8,
        "pearl-k":9,
        "pearl-i":10,
        "pearl-j":11,
        "pearl-l":75,
        "pearl-m":77,
        "pearl-n":78,
        "pearl-o":76,
        "big-triple":17,

        "big-p":18,
        "big-h":19,
        "big-f":20,
        "big-g":21,

        "big-l":79,
        "big-o":80,
        "big-m":81,
        "big-n":82,

        //new suited tie marks for tie
        "big-l-t":83,
        "big-o-t":84,
        "big-m-t":85,
        "big-n-t":86,
        //new suited tie marks for tie
        "big-p-t":22,
        "big-h-t":23,
        "big-f-t":24,
        "big-g-t":25,

        "big-j":17,
        "big-j-t":17,
        "big-k":17,
        "big-k-t":17,
        "big-i":17,
        "big-i-t":17,
        "big-t":17,
        "big-t-t":17,

        "big-b":26,
        "big-e":27,
        "big-q":28,
        "big-w":29,

        "big-b-t":30,
        "big-e-t":31,
        "big-q-t":31,
        "big-w-t":32,

        "bigeye-R" : 26,//18,
        "bigeye-B" : 18,

        "bigsmall-R" : 13,//12,
        "bigsmall-B" : 12, //13,

        "roach-R" : 16, //15,
        "roach-B" : 15, //16,

        /// dragontiger 68 len
        "pearl-dt-d" : 43, //dragon
        "pearl-dt-z" : 44, //tiger
        "pearl-dt-a" : 8, //tie
        "pearl-dt-b" : 46, //dragon
        "pearl-dt-c" : 48, //dragon
        "pearl-dt-e" : 45, //tiger
        "pearl-dt-f" : 47, //tiger
        "pearl-dt-g" : 46, //dragon
        "pearl-dt-h" : 46, //dragon
        "pearl-dt-i" : 48, //dragon
        "pearl-dt-j" : 48, //dragon
        "pearl-dt-k" : 45, //tiger
        "pearl-dt-l" : 47, //tiger
        "pearl-dt-m" : 45, //tiger
        "pearl-dt-n" : 47, //tiger
        "pearl-dt-s" : 73, //suited tie big
        "pearl-dt-t" : 74, //suited tie small

        //not sure here
        "pearl-dt-o" : 8, //tie
        "pearl-dt-p" : 8,  //tie
        "pearl-dt-q" : 8, //tie
        "pearl-dt-r" : 8 //tie
      }
    }

    let sprite=new createjs.SpriteSheet(spriteData);
    targetToSprite = new createjs.Sprite(sprite,"pearl-p");

    return _.clone(targetToSprite);
  }
  return instance;
}
