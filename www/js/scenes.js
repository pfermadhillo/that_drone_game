if(LD === undefined) {
  var LD = {};
}

LD.Scenes = {};


LD.Scenes.Intro = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function Intro ()
    {
        Phaser.Scene.call(this, { key: 'intro' });
    },

    init: function (data)
    {
        // console.log('init', data);

        this.imageID = data.id;
        this.imageFile = data.image;

        thisGame = this;
        LD.Globals.game = this;
        // LD.Globals.initKeys(this);
    },

    preload: function ()
    {
        this.load.image('black_center', 'img/assets/bg.png');

        
        LD.Sounds.preload(this);


    },

    create: function ()
    {

        LD.Sounds.create(this);

    	var black_center = this.add.sprite(0,0, 'black_center');
	    black_center.setDisplayOrigin(0);

        LD.Messages.introText = this.add.text(160, 80, 
                                    LD.Messages.introTextMsg , 
                                    { fontFamily: 'Anton', fontSize: '48px', fill: '#fff' });
        LD.Messages.introText.setStroke('#000', 5); 
        LD.Messages.introText.setX( (LD.Globals.gameWidth - LD.Messages.introText.width)/2 ); 

        this.input.once('pointerdown', function () {
            // LD.Sounds.myPlay('emptySound');

            var deadlockTimer = this.time.delayedCall(LD.Globals.deadlockTimeDelay, 
                                                function(){this.scene.start('intro2')}, 
                                                [], this); 
        }, this);
    },

    update: function () {
        // if(LD.Sounds.emptySound.isPlaying){
        //     console.log("intro audio loaded!");
        //     var deadlockTimer = this.time.delayedCall(LD.Globals.deadlockTimeDelay, 
        //                                         function(){this.scene.start('intro2')}, 
        //                                         [], this); 
        // }
    }

});



LD.Scenes.Intro2 = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function Intro2 ()
    {
        Phaser.Scene.call(this, { key: 'intro2' });
    },

    init: function (data)
    {
        // console.log('init', data);

        this.imageID = data.id;
        this.imageFile = data.image;

        thisGame = this;
        LD.Globals.game = this;
        // LD.Globals.initKeys(this);
    },

    preload: function ()
    {
        // this.load.image('fireplace', 'img/assets/fireplace.png');
    },

    create: function ()
    {


        // var fireplace = this.add.sprite(0,0, 'fireplace');
        // fireplace.setDisplayOrigin(0);

        LD.Messages.introText2 = this.add.text(160, 80, 
                                    LD.Messages.introTextMsg2 , 
                                    { fontFamily: 'Anton', fontSize: '48px', fill: '#fff' });
        LD.Messages.introText2.setStroke('#000', 5); 
        LD.Messages.introText2.setX( (LD.Globals.gameWidth - LD.Messages.introText2.width)/2 ); 

        this.input.once('pointerdown', function () {
            // LD.Sounds.myStop('emptySound');
            // LD.Sounds.myPlay('emptySound');

            var deadlockTimer = this.time.delayedCall(LD.Globals.deadlockTimeDelay, 
                                                function(){this.scene.start('play')}, 
                                                [], this); 
        }, this);

    },

    update: function () {
        // if(LD.Sounds.emptySound.isPlaying){
        //     console.log("intro2 audio loaded!");
        //     var deadlockTimer = this.time.delayedCall(LD.Globals.deadlockTimeDelay, 
        //                                         function(){this.scene.start('play')}, 
        //                                         [], this); 
        // }
    }

});













LD.Scenes.WinLose = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function WinLose ()
    {
        Phaser.Scene.call(this, { key: 'winlose' });
    },

    init: function (data)
    {
        this.inText = data.text;
        this.inImg = data.img;
    },

    preload: function ()
    {
	    // this.load.image('teal_border', 'img/backgrounds_teal_border.png');
	    this.load.image('show_image', 'img/assets/'+this.inImg+'.png');

    },

    create: function ()
    {
    	// var teal_border = this.add.image(0, 0, 'teal_border');
	    // teal_border.setDisplayOrigin(0);
        LD.Sounds.emptySound.play();


    	var black_center = this.add.sprite(0,0, 'show_image').setInteractive();
	    black_center.setDisplayOrigin(0);    


        var specificMessage = this.inText;
        // var specificMessage = "you lost bruh";
		var winloseText = this.add.text(LD.Globals.horizontalOffset, 80, 
	    	LD.Messages.winloseTextMsg + "\n" + specificMessage, 
	    	{ align: 'center', 
	    		font: '48px Anton', 
	    		fill: '#fff', 
	    		wordWrap: {width: LD.Globals.gameWidth - (LD.Globals.horizontalOffset*2)} 
	    	});
        winloseText.setStroke('#000', 5);	    
        winloseText.setX( (LD.Globals.gameWidth - winloseText.width)/2 ); 

        var restartText = this.add.text(60, LD.Globals.vertOneThird*2.5, 
            LD.Messages.restartTextMsg, 
            { align: 'center', font: '48px Anton', fill: '#fff' });
        restartText.setStroke('#000', 5);
        restartText.setX( (LD.Globals.gameWidth - restartText.width)/2 ); 



        this.input.once('pointerup', function () {
            // LD.Sounds.myStop('emptySound');
            // LD.Sounds.myPlay('emptySound');

            var deadlockTimer = this.time.delayedCall(LD.Globals.deadlockTimeDelay, 
                                                function(){this.scene.start('intro')}, 
                                                [], this); 
        }, this);

    }

});






LD.Scenes.Play = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function Play ()
    {
        // console.log("Play Scene Play()");
        Phaser.Scene.call(this, 'play');
    },


    preload: function ()
    {

        // this.load.image('tiles', 'img/assets/quickie_tilemap.png');
        // this.load.tilemapTiledJSON('map', 'json/simple-map.json');
        // // this.load.image('triangle', 'img/sprites/triangle.png');
        this.load.image('player', 'img/sprites/player_t25x25.png');
        // this.load.image('upgrade_button', 'img/sprites/upgrade_button.png');

        this.load.image('background', 'img/assets/bg_1280x1024.png');


    },

    create: function ()
    {
        console.log("Play Scene create()");
        thisGame = this;
        LD.Globals.game = this;

        LD.Globals.gameOver = false;

        var background = this.add.sprite(0,0, 'background');
        background.setDisplayOrigin(0);
        background.setScale(LD.Globals.mapMult);

        const bounds = LD.Globals.getBounds();
        this.physics.world.setBounds(0, 0, bounds.x, bounds.y);


        // var map = LD.Maps.create(thisGame);
        // var ts = LD.Maps.tileSize;
        // var tn = LD.Maps.tileNum;  
        
        // tileset = map.addTilesetImage('tiles');
        // var tileName = LD.Maps.tiles;
        // // layer = map.createDynamicLayer('Level1', tileset);
        // LD.Maps.layer = map.createBlankDynamicLayer('layer', tileset);
        // var layer = LD.Maps.layer;
        // layer.setScale(LD.Maps.tileScale.x,LD.Maps.tileScale.y);
        // layer.fill(tileName.wall, 0, 0, tn.x, tn.y); // Body of the water

        // var bounds = LD.Maps.getBounds();
        // this.physics.world.setBounds(
        //     -ts.x , 
        //     -ts.y , 
        //     bounds.x ,
        //     bounds.y , 
        //     true, true, true, true);


        // map.setCollision([ tileName.fog, tileName.wall, tileName.node, 20, 48 ]);

        // var i,j;
        // var startTile = LD.Maps.findStartTiles();

        // LD.Blocks.createBlocks();
        // LD.Blocks.createNode(startTile.x,startTile.y, true);

        // var start ={};
        // var start ={};
        // start.x = map.tileToWorldX(startTile.x);
        // start.y = map.tileToWorldY(startTile.y);


        var start ={x:200,y:300};

        var player = LD.Player.createPlayer(start.x, start.y);

        // console.log(start,player);



        // LD.Maps.fogLayer = map.createBlankDynamicLayer('fogLayer', tileset);
        // var fogLayer = LD.Maps.fogLayer;
        // // fogLayer.setScale(2);
        // var fn = {x:2*tn.x, y:2*tn.y};
        // fogLayer.fill(tileName.fog, 1, 1, fn.x, fn.y); // Body of the water
        // // fogLayer.setZ(1);
        // console.log(tn,fn,fogLayer, layer);


        LD.Globals.cursors = this.input.keyboard.createCursorKeys();
        var cursors = LD.Globals.cursors;

        LD.Globals.myKeys = this.input.keyboard.addKeys(
            {
                W:Phaser.Input.Keyboard.KeyCodes.W,
                S:Phaser.Input.Keyboard.KeyCodes.S,
                A:Phaser.Input.Keyboard.KeyCodes.A,
                D:Phaser.Input.Keyboard.KeyCodes.D,
                ONE:Phaser.Input.Keyboard.KeyCodes.ONE,
                TWO:Phaser.Input.Keyboard.KeyCodes.TWO,
                THREE:Phaser.Input.Keyboard.KeyCodes.THREE,
                SPACE:Phaser.Input.Keyboard.KeyCodes.SPACE
            }
        );


        // LD.Messages.createStatsText();


        // this.physics.add.collider(player, layer);
        // this.physics.add.collider(player, fogLayer);

        // this.physics.add.existing(LD.Player.rect);
        // // this.physics.add.collider(LD.Player.rect, fogLayer);

        // LD.Maps.fogs = map.filterTiles(function (tile) {
        //     return (tile.index === tileName.fog);
        // });

        // this.physics.world.overlapTiles(LD.Player.rect, fogLayer, this.collideFog, null, this);
        
        // console.log("fogs:",LD.Maps.fogs);
        // console.log("map:",map);
        // console.log("layer:",layer);
        // console.log("fogLayer:",fogLayer);

        console.log("bounds pt2:  ",thisGame.cameras.main.getBounds());


    },

    update: function ()
    {
        var thisGame = LD.Globals.game;
        var player = LD.Player.updatePlayer();

        // console.log("player:  ",player.x, player.y);


        // // console.log("this.physics.world:  ",this.physics.world);
        // // console.log("thisGame.physics.world:  ",thisGame.physics.world);
        // // console.log("LD.Maps.nodes:  ",LD.Maps.nodes);
        // // console.log("player:  ",player);
        
        // // if(LD.Player.rect && LD.Maps.nodes && this.physics.world._elapsed > 1){
        // //     // for some reason I have to delay this block until the game has one second to load
        // //     thisGame.physics.world.overlapTiles(LD.Player.rect, LD.Maps.nodes, this.collideNode);
        // //     thisGame.physics.world.overlapTiles(LD.Player.rect, LD.Maps.fogs, this.collideFog);
        // //     thisGame.physics.world.overlapTiles(player, LD.Maps.blocks, this.collideBlock);
        // // }

        // thisGame.physics.world.overlapTiles(LD.Player.rect, LD.Maps.nodes, thisGame.collideNode);
        // thisGame.physics.world.overlapTiles(LD.Player.rect, LD.Maps.fogs, thisGame.collideFog);
        // thisGame.physics.world.overlapTiles(player, LD.Maps.blocks, thisGame.collideBlock);
        

        // LD.Messages.updateStatsText();

        // if(LD.Player.stats.yellow <= 0){
        //     thisGame.scene.start('winlose', { id: 2, 
        //                                     text:  LD.Messages.winloseTexts.zeroHP ,
        //                                     img: "bg"   });
        // }

        // LD.Blocks.checkForUpgradable(player);

        // LD.Blocks.updateUpgradeTextAllBlocks();

    },



    collideFog: function (player, tile)
    {
        if(LD.Player.stats.blue > 0){
            LD.Maps.map.removeTile(tile, -1);
            LD.Maps.fogs = LD.Maps.map.filterTiles(function (tile) {
                return (tile.index === LD.Maps.tiles.fog);
            });
            LD.Player.depleteColor("blue");
        }
    }, 

    collideNode: function (player, tile)
    {
        console.log("collideNode():  ",player,tile);
        var tileX = tile.x;
        var tileY = tile.y;

        LD.Maps.map.removeTile(tile, -1);
        console.log("collideNode(): x,y",tile.x,tile.y);

        LD.Maps.nodes = LD.Maps.nodes.filter(function(t) {
          return !(t.x == tile.x && t.y == tile.y)
        });

        LD.Blocks.createNode(tileX,tileY);

    },



    collideBlock: function (player, tile)
    {
        

        var tileName = LD.Maps.tiles;
        var index = tile.index;
        var stats = LD.Player.stats;
        var statsMax = LD.Player.statsMax;
        var didCollide = false;
        var block = LD.Blocks.getBlockAtPlayer(player);
        var upg = 1;
        if(block && block.upgrade > 1){
            upg = block.upgrade;
        }
        // console.log("collideBlock(): block: ",upg, block);

        if(index === tileName.blue && stats.blue + 2 * upg <= statsMax.blue){
            didCollide = true;
            stats.blue += 2 * upg;
        }else if(index === tileName.yellow && stats.yellow + 2 * upg < statsMax.yellow){
            didCollide = true;
            stats.yellow += 2 * upg;
        }else if(index === tileName.red && stats.red + 2 * upg <= statsMax.red){
            didCollide = true;
            stats.red += 2 * upg;
        }else if(index === tileName.purple 
             && stats.blue + 1 * upg <= statsMax.blue
             && stats.red + 1 * upg <= statsMax.red
             && stats.yellow - 1 * upg > 0
             ){
            didCollide = true;
            stats.blue += 1 * upg;
            stats.red += 1 * upg;
            stats.yellow -= 1 * upg;
        }else if(index === tileName.green 
             && stats.blue + 1 * upg <= statsMax.blue
             && stats.yellow + 1 * upg <= statsMax.yellow
             && stats.red - 1 * upg >= 0
             ){
            didCollide = true;
            stats.yellow += 1 * upg;
            stats.blue += 1 * upg;
            stats.red -= 1 * upg;
        }else if(index === tileName.orange 
             && stats.yellow + 1 * upg <= statsMax.yellow
             && stats.red + 1 * upg <= statsMax.red
             && stats.blue - 1 * upg >= 0
             ){
            didCollide = true;
            stats.red += 1 * upg;
            stats.yellow += 1 * upg;
            stats.blue -= 1 * upg;
        }else{

        }

        if(didCollide){
            LD.Blocks.removeBlock(tile);
        }
        // player.angle++;
        // LD.Blocks.checkForUpgradable(player);
        
    }

    

});










