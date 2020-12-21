if(LD === undefined) {
  var LD = {};
}

LD.Player = {
    imgSize: {x:25,y:25},

    maxVel: 160,

    statsMaxButton: {blue:{},red:{},yellow:{}},
    basicColorArray: ["blue","red","yellow"],

    tints: {
        blue: 0x0000ff,
        red: 0xff0000,
        yellow: 0xffff00
    },

    resources: {
        basics: 10,
        metals: 100,
        reactant: 98765439876543987654398765,
        isotopes: 1000,
        research: 10,
        biologic: 1000000
    },

	refresh: function (){

		LD.Player.vel = {x:0,y:0};

        LD.Player.velocityMult = 2.0;

        LD.Player.stats = {
            blue: 50,
            yellow: 50,
            red: 50
        };
        LD.Player.statsMax = {
            blue: 100,
            yellow: 100,
            red: 100
        };
	},

	createPlayer: function(x=0,y=0){
		thisGame = LD.Globals.game;
		LD.Player.refresh();
        var imgSize = LD.Player.imgSize;

        LD.Player.rect = thisGame.add.rectangle(32 + x, 32 + y, 128, 128, 0xffff00);
        LD.Player.rect.setAlpha(0.1);
        LD.Player.rect.setInteractive();

        LD.Player.player = thisGame.physics.add.sprite(32 + x, 32 + y, 'player');
      
        LD.Player.player.setCollideWorldBounds(true);
        LD.Player.player.setSize(imgSize.x*0.9,imgSize.y*0.9).setOffset(imgSize.x*0.05,imgSize.y*0.05);   // actual size 100,150

        // LD.Player.upgradeButton = thisGame.physics.add.sprite(32 + x, 32 + y, 'upgrade_button');
        // LD.Player.upgradeButton.on('pointerup', function (pointer) {
        //     LD.Blocks.upgradeButtonClicked();
        //     LD.Player.upgradeButton.setActive(false).setVisible(false);
        // });
        // LD.Player.upgradeButton.setActive(false);
        // LD.Player.upgradeButton.setDepth(10);
        // LD.Player.upgradeButton.setInteractive();
        // LD.Player.upgradeButton.target = {x:0,y:0};

        // LD.Player.basicColorArray.forEach(color => {
        //     var tint = LD.Player.tints[color];
        //     LD.Player.statsMaxButton[color] = thisGame.physics.add.sprite(32 + x, 32 + y, 'upgrade_button');
        //     LD.Player.statsMaxButton[color].on('pointerup', function (pointer) {
        //         LD.Player.upgradeStatMax(color);
        //         LD.Player.statsMaxButton[color].setActive(false).setVisible(false);
        //     });
        //     LD.Player.statsMaxButton[color].setInteractive();
        //     LD.Player.statsMaxButton[color].setDepth(1).setTint(tint).setScale(0.5);
        //     LD.Player.statsMaxButton[color].setActive(true).setVisible(true);
        // });




		return LD.Player.player;
	},

	updateTicks: function(){
		var tickMult = 1;
		if(LD.Player.speedBoost > 1){
			tickMult = LD.Player.speedBoost * 1.5;
		}
		LD.Player.runTicks += 1 * (tickMult + LD.Player.thisSheet.tickFactorIncrease);
	},

	updatePlayer: function(){

        var cursors = LD.Globals.cursors;
        var myKeys = LD.Globals.myKeys;
        var player = LD.Player.player;

        LD.Player.rect.setPosition(player.x, player.y);
        // LD.Player.upgradeButton.setPosition(player.x, player.y - LD.Globals.gameWidth * 0.3);

        var backoutX = LD.Globals.gameWidth * 0.20;
        var backoutY = {
            blue: LD.Globals.gameHeight * 0.41,
            yellow: LD.Globals.gameHeight * 0.31,
            red: LD.Globals.gameHeight * 0.21,
        };

        // LD.Player.basicColorArray.forEach(color => {
        //     var button = LD.Player.statsMaxButton[color];
        //     var tint = LD.Player.tints[color];
        //     button.setPosition(
        //         player.x - backoutX, 
        //         player.y - backoutY[color] );
        // });

        // LD.Player.checkForStatMaxButton();

        if (LD.Globals.gameOver)
        {
            return;
        }

        player.angle++;

        player.setVelocity(0);
        LD.Player.vel.x = 0;
        LD.Player.vel.y = 0;
        var currentVel = LD.Player.maxVel;
        if(LD.Player.stats.red > 0){
            currentVel *= LD.Player.velocityMult;
        }

        if (cursors.left.isDown || myKeys.A.isDown)
        {
            LD.Player.vel.x = -currentVel;
            player.setVelocityX(-currentVel);
        }
        else if (cursors.right.isDown || myKeys.D.isDown)
        {
            LD.Player.vel.x = currentVel;
            player.setVelocityX(currentVel);
        }
        if (cursors.up.isDown || myKeys.W.isDown)
        {
            LD.Player.vel.y = -currentVel;
            player.setVelocityY(-currentVel);
        }
        else if (cursors.down.isDown || myKeys.S.isDown) 
        {
            LD.Player.vel.y = currentVel;
            player.setVelocityY(currentVel);
        } 

        if(myKeys.ONE.isDown){
            LD.Player.stats.yellow = 1;
        }

        if (Math.abs(player.body.velocity.x) > 0 || Math.abs(player.body.velocity.y) > 0) {
            LD.Player.depleteColor("red", 20);
        }

		return player;
	},

    depleteColor: function (color, outOf=4) {
        var stat = LD.Player.stats[color];
        var didDeplete = false;
        if(stat && parseInt(stat) > 0){
            didDeplete = true;
            var willDeplete = LD.Globals.willDeplete(outOf);
            if(willDeplete){
                LD.Player.stats[color]--;
            }
        }
        // console.log("depleteColor(): ",stat,willDeplete,didDeplete)
        return didDeplete;
    },

    checkForStatMaxButton: function(){
        var stats = LD.Player.stats;
        var maxStats = LD.Player.statsMax;
        LD.Player.basicColorArray.forEach(color => {
            var stat = stats[color];
            var maxStat = maxStats[color];
            var level = LD.Player.getLevelFromMaxStatVal(maxStat);
            var cost = LD.Globals.calcUpgradeCostForStatsMax(level);
            var button = LD.Player.statsMaxButton[color];

            if( (!button.active || !button.visible) 
                && stat > cost){
                button.setActive(true).setVisible(true);
            }
            if( (button.active || button.visible)
                && stat <= cost ){
                button.setActive(false).setVisible(false);
            }
        });
    },

    upgradeStatMax: function(color){
        // console.log("upgradeStatMax(): ", color);
        // LD.Player.statsMax[stat] += 10;
        var stat = LD.Player.stats[color];
        var maxStat = LD.Player.statsMax[color];
        var level = LD.Player.getLevelFromMaxStatVal(maxStat);
        var cost = LD.Globals.calcUpgradeCostForStatsMax(level);

        console.log("upgradeStatMax(): ", color, stat, maxStat, level, cost);

        if(stat > cost){
            LD.Player.statsMax[color] += 10;
            LD.Player.stats[color] -= cost;
        }
    },

    getLevelFromMaxStatVal(maxStat){
        // 100 -> 1, 110 -> 2, 220 -> 13
        return (maxStat/10)-9;
    }

	

	

};