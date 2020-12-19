if(LD === undefined) { 
  var LD = {};
}

LD.Globals = {
	game: 0,

	gameWidth: 1280,
	gameHeight: 1024,

    mapMult: 2,

	deadlockTimeDelay: 300,

	progressPattern: [1,2,5,8],

    getBounds: function () {  
        const bounds = {};
        bounds.x = LD.Globals.gameWidth * LD.Globals.mapMult;
        bounds.y = LD.Globals.gameHeight * LD.Globals.mapMult;
        return bounds;
    },

    getCenter: function() {
        const bounds = LD.Globals.getBounds();
        const center = {
            x: bounds.x/2,
            y: bounds.y/2
        };
        return center
    },

	randomNumber: function (min, max) {  
	    var min = Math.ceil(min); 
	    var max = Math.floor(max); 
	    return Math.floor(Math.random() * (max - min + 1)) + min; 
	}, 

	randomFloat: function (min, max) {
        return Math.random() * (max - min) + min;
	},

    randomSpawn: function(x, y){
        var spawn = {x:0,y:0};
        spawn.x = LD.Globals.randomNumber(x,LD.Globals.gameWidth*0.95);
        spawn.y = LD.Globals.randomNumber(y,LD.Globals.gameHeight*0.95);
        return spawn;
    },

    willDeplete: function (outOf=4) {
    	var result = LD.Globals.randomNumber(1,outOf);
    	if(result === 1){
    		return true;
    	} 
    	return false;
    },

    calcUpgradeCost: function (level, base=1, mult=1){
    	var output = 0;
    	var pattern = LD.Globals.progressPattern;
    	var modulo = level % pattern.length;
    	var magnitude = level / pattern.length;
    	var progression = pattern[modulo];

    	output = base + (progression * magnitude * mult);
    	return parseInt(output);
    },

    simpleUpgradeCalc: function(level, base=1,mult=1) {
    	return level * mult + base;
    },

    calcUpgradeCostForBlock: function(level){
    	// LD.Globals.calcUpgradeCost(level, 1, 2);
    	return LD.Globals.simpleUpgradeCalc(level, 1, 3);
    },
    calcUpgradeCostForStatsMax: function(level){
    	// LD.Globals.calcUpgradeCost(level, 5, 5);
    	return LD.Globals.simpleUpgradeCalc(level, 10, 10);
    }


};




LD.Globals.squarePxHalf = LD.Globals.squarePx/2;

LD.Globals.horizontalOffset = LD.Globals.squarePxHalf 
				+ (LD.Globals.gameWidth - (LD.Globals.squarePx * LD.Globals.squareWidth))/2;

// finds the number of px on each side of play area, sans alloted openspace at top
LD.Globals.verticalOffset = LD.Globals.squarePxHalf 
				+ ((LD.Globals.gameHeight - LD.Globals.verticalOpenSpace) 
				- (LD.Globals.squarePx * LD.Globals.squareHeight))/2;

LD.Globals.verticalOffsetTop = LD.Globals.verticalOpenSpace + LD.Globals.verticalOffset;

LD.Globals.vertOneThird = LD.Globals.gameHeight / 3;	
LD.Globals.horzCenter = LD.Globals.gameWidth / 2;	



