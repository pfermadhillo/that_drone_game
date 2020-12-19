if(LD === undefined) { 
  var LD = {};
}

LD.Maps = {

    tileSize:{x:32,y:32},
    tileNum:{x:165,y:165},
    tileScale:{x:2,y:2},

    startVariance: 5,

    // tiles: {
    //     wall: 14,
    //     path: 43,
    //     fog: 7,
    //     node: 85
    // },

    tiles: {
        wall: 4,
        path: 3,
        fog: 2,
        node: 11,
        blue: 5,
        yellow: 6,
        red: 7,
        purple: 8,
        green: 9,
        orange: 10,
    },

    

	preload: function (thisGame){

	},

    refresh: function (thisGame){
        LD.Maps.nodes = [];
        LD.Maps.fogs = [];
        LD.Maps.blocks = [];
        LD.Maps.map = {};

        var ts = LD.Maps.tileSize;
        LD.Maps.map = thisGame.make.tilemap({ key: 'map', tileWidth: ts.x, tileHeight: ts.y });
        return LD.Maps.map;
    },

	create: function (thisGame){
        var map = LD.Maps.refresh(thisGame);
        
        return map;
	},

    getBounds: function(){
        var bounds = {};
        bounds.x = LD.Maps.tileSize.x * LD.Maps.tileNum.x;
        bounds.y = LD.Maps.tileSize.y * LD.Maps.tileNum.y;
        return bounds;
    },

    findStartTiles: function(){
        var start = {};
        var x = parseInt(LD.Maps.tileNum.x/4);
        var y = parseInt(LD.Maps.tileNum.y/4);
        var v = LD.Maps.startVariance;
        start.x = LD.Globals.randomNumber(x-v,x+v);
        start.y = LD.Globals.randomNumber(y-v,y+v);

        return start;
    }
};


