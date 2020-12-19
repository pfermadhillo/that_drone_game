if(LD === undefined) {
  var LD = {};
}

LD.Blocks = {


    nodes: [],


	refresh: function (){
		// refresh every game propeties goes here
        LD.Blocks.nodes = [];
        LD.Blocks.blocks = [];
        LD.Blocks.upgrades = [];
	},

	createBlocks: function(){
		thisGame = LD.Globals.game;
		LD.Blocks.refresh();
	},

	updateBlocks: function(){


        

	},

    createNode: function(tileX, tileY, first=false) {
        var layer = LD.Maps.layer;
        var tileName = LD.Maps.tiles;
        LD.Blocks.nodes.push([tileX,tileY]);
        layer.putTileAt(tileName.path, tileX, tileY);
        var pathNum = LD.Globals.randomNumber(1,3);
        if(first){pathNum = LD.Globals.randomNumber(3,4);}
        var i,j;
        var justInCase = 20;
        console.log("createnode(first?): ",first,pathNum);

        while(pathNum>0 && justInCase>0){
            if(pathNum == 0){
                justInCase = 0;
                break;
            }else{
                justInCase--;
            }
            var pathDir = LD.Globals.randomNumber(0,3);
            var pathLen = LD.Globals.randomNumber(1,4);
            pathLen = pathLen * 2 + 1;

            console.log("createnode(): ",pathNum,justInCase, pathDir, pathLen);
            if(pathDir == 0){
                // left
                if (LD.Blocks.checkIfOnlyWallsOnPath(pathLen,tileX,tileY,-1,0)) {
                    --pathNum;
                    LD.Blocks.buildPath(pathLen,tileX,tileY,-1,0);
                }
            }else if(pathDir == 1){
                // right
                if (LD.Blocks.checkIfOnlyWallsOnPath(pathLen,tileX,tileY,1,0)) {
                    --pathNum;
                    LD.Blocks.buildPath(pathLen,tileX,tileY,1,0);
                }
            }else if(pathDir == 2){
                // up
                if (LD.Blocks.checkIfOnlyWallsOnPath(pathLen,tileX,tileY,0,-1)) {
                    --pathNum;
                    LD.Blocks.buildPath(pathLen,tileX,tileY,0,-1);
                }
            }else if(pathDir == 3){
                // down
                if (LD.Blocks.checkIfOnlyWallsOnPath(pathLen,tileX,tileY,0,1)) {
                    --pathNum;
                    LD.Blocks.buildPath(pathLen,tileX,tileY,0,1);
                }
            }

            console.log("createnode(): at the end: ",pathNum,justInCase, pathDir, pathLen);

        }
    },

    checkIfWall: function(x,y){
        console.log(LD.Maps.layer.getTileAt(x,y).index , LD.Maps.tiles.wall);
        if(LD.Maps.layer.getTileAt(x,y).index === LD.Maps.tiles.wall){
            return true;
        }else{
            return false;
        }
    },

    checkIfOnlyWallsOnPath: function(len, tileX, tileY, x=0, y=0){
        var retVal = true;
        var count = 1; // i am here
        var X,Y;
        for(j=0;j<len;j++){
            X = tileX+(x*j);
            Y = tileY+(y*j);
            var wallMaybe = LD.Maps.layer.getTileAt(X,Y);
            if(wallMaybe && wallMaybe.index === LD.Maps.tiles.wall){
                count++;
            }
        }
        console.log("checkIfOnlyWallsOnPath(): ",len, count);
        if(count===len){
            return true;
        }else{
            return false;
        }
    },

    buildPath: function(len, tileX, tileY, x=0, y=0){
        var layer = LD.Maps.layer;
        var tileName = LD.Maps.tiles;
        var X,Y;
        var makeNode=true;
        for(j=0;j<len;j++){
            X = tileX+(x*j);
            Y = tileY+(y*j);
            if(X>=2 && X < LD.Maps.tileNum.x-1
                && Y>=2 && Y < LD.Maps.tileNum.y-1){

                layer.putTileAt(tileName.path, X, Y);
                LD.Blocks.fillBlock(X,Y);
            }else{
                makeNode = false;
                break;
            }
        }
        if(makeNode){
            LD.Blocks.setNodeOnPath(len,X,Y);
        }
    },

    setNodeOnPath: function(l,tileX,tileY){
        var layer = LD.Maps.layer;
        var tileName = LD.Maps.tiles;
        var nodes = LD.Maps.nodes;
        var tile = layer.putTileAt(tileName.node, tileX, tileY );
        nodes.push(tile);
    },

    fillBlock: function (tileX,tileY) {
        // body...
        var tilePicked = LD.Blocks.pickTileType();
        if(tilePicked > 0){
            LD.Blocks.createBlock(tileX,tileY,tilePicked);
            var pos = {
                x: LD.Maps.layer.tileToWorldX(tileX), 
                y: LD.Maps.layer.tileToWorldY(tileY)
            };
            var upgradeText = LD.Globals.game.add.text(pos.x, pos.y, 
                "", { fontSize: '34px', fill: '#fff' });
            upgradeText.setStroke('#000', 5).setZ( 2 );
            LD.Blocks.blocks.push({
                x: tileX,
                y: tileY,
                tile: tilePicked,
                upgrade: 1,
                upgradeText: upgradeText
            });
        }
    },

    pickTileType: function(){
        var tileName = LD.Maps.tiles;
        var wtArray = [
            {wt:200, tile:0},
            {wt:20, tile:tileName.blue},
            {wt:20, tile:tileName.yellow},
            {wt:20, tile:tileName.red},
            {wt:20, tile:tileName.purple},
            {wt:20, tile:tileName.green},
            {wt:20, tile:tileName.orange},
        ];
        var tallyWT = 0;
        wtArray.forEach(function(block) {
            tallyWT += block.wt;
        });

        var pickWT = LD.Globals.randomNumber(1,tallyWT);
        var tilePicked = 0;
        var i=0;
        while(pickWT > 0){
            var pick = wtArray[i];
            pickWT -= pick.wt;
            tilePicked = pick.tile;
            i++;
        }

        return tilePicked;
    },

    createBlock: function(tileX,tileY,tilePicked){
        var layer = LD.Maps.layer;
        var tileName = LD.Maps.tiles;
        var blocks = LD.Maps.blocks;
        var tile = layer.putTileAt(tilePicked, tileX, tileY );
        blocks.push(tile);
    },

    removeBlock: function(tile){
        var thisTime = LD.Globals.game.time; 
        var tileX = tile.x;
        var tileY = tile.y;
        var tilePicked = tile.index;

        LD.Maps.map.removeTile(tile, LD.Maps.tiles.path);
        console.log("removeBlock(): x,y",tile.x,tile.y);

        if(tile.index !== LD.Maps.tiles.node){
            // dont respawn node tiles
            LD.Maps.blocks = LD.Maps.blocks.filter(function(t) {
              return !(t.x == tile.x && t.y == tile.y)
            });
            thisTime.delayedCall(3000, LD.Blocks.createBlock, [tileX,tileY,tilePicked], this);
        }

        
    },

    getBlockAtPlayer(player){
        var layer = LD.Maps.layer;
        var playerX =  layer.worldToTileX(player.x);
        var playerY =  layer.worldToTileY(player.y);
        var block = LD.Blocks.getBlockAt(playerX,playerY);
        return block;
    },

    getBlockAt(x,y){
        var foundBlock = null;
        // console.log("getBlockAt(): ",x,y,LD.Blocks.blocks);
        LD.Blocks.blocks.forEach(block => {
            if(x === block.x && y === block.y && block.tile != LD.Maps.tiles.node){
                foundBlock = block;
            }
        });
        return foundBlock;
    },

    checkForUpgradable: function(player){
        var button = LD.Player.upgradeButton;
        var block = LD.Blocks.getBlockAtPlayer(player);
        // console.log("checkForUpgradable(): ", block);
        if(block && block.upgrade){
            if( (!button.active || !button.visible) 
                && LD.Blocks.checkPlayerStatsforUpgrade(block) ){
                button.setActive(true).setVisible(true);
                button.target = {x:block.x,y:block.y};
            }
        }else{
            if( (button.active || button.visible) ){
                button.setActive(false).setVisible(false);
                button.target = {x:0,y:0};
            }
        }
    },

    upgradeButtonClicked: function(){
        var button = LD.Player.upgradeButton;
        var target = button.target;
        var block = null;
        console.log("upgradeButtonClicked() !!");
        if(target){
            block = LD.Blocks.getBlockAt(target.x,target.y);
        }   
        if(button.active && block){
            LD.Blocks.checkPlayerStatsforUpgrade(block, true);
        }
    },

    updateUpgradeTextAllBlocks(){
        LD.Blocks.blocks.forEach(block => {
            if(block.upgrade > 1){
                block.upgradeText.setText("x"+block.upgrade);
            }
        });
    },

    checkPlayerStatsforUpgrade: function(block, doUpgrade=false){
        var cost = LD.Globals.calcUpgradeCostForBlock(block.upgrade);
        var stats = LD.Player.stats;
        var isUpgradeable = false;
        // console.log("checkPlayerStatsforUpgrade(): ",stats, block, cost);
        if(block.tile === LD.Maps.tiles.blue && stats.blue >= cost){
            isUpgradeable = true;
            if(doUpgrade){stats.blue -= cost;}
        }else if(block.tile === LD.Maps.tiles.red && stats.red >= cost){
            isUpgradeable = true;
            if(doUpgrade){stats.red -= cost;}
        }else if(block.tile === LD.Maps.tiles.yellow && stats.yellow > cost){
            isUpgradeable = true;
            if(doUpgrade){stats.yellow -= cost;}
        }else if(block.tile === LD.Maps.tiles.green && stats.red >= cost){
            isUpgradeable = true;
            if(doUpgrade){stats.red -= cost;}
        }else if(block.tile === LD.Maps.tiles.purple && stats.yellow > cost){
            isUpgradeable = true;
            if(doUpgrade){stats.yellow -= cost;}
        }else if(block.tile === LD.Maps.tiles.orange && stats.blue >= cost){
            isUpgradeable = true;
            if(doUpgrade){stats.blue -= cost;}
        }else {

        }

        if(isUpgradeable && doUpgrade){
            block.upgrade++;
        }

        return isUpgradeable;
    },

    



	

	

};