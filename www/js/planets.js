if(LD === undefined) {
  var LD = {};
}

LD.Planets = {

    solarBodies: [
        {
            name:"Sun",
            radius: 0,
            size:10,
            img: {x:200,y:194,name:'solar'}
        },
        {
            name:"Tartarus",
            radius: 300,
            size:7,
            img: {x:200,y:194,name:'tartarus'}
        },
        {
            name:"Epoch",
            radius: 600,
            size:3,
            img: {x:200,y:194,name:'epoch'}
        }
    ],

    group: {},

	refresh: function (){



	},

	createPlanets: function(x=0,y=0){
		thisGame = LD.Globals.game;
		LD.Planets.refresh();

        LD.Planets.group = thisGame.add.group();
        var group = LD.Planets.group;

        for (let i = 0; i < LD.Planets.solarBodies.length; i++) {
            var planet = LD.Planets.solarBodies[i];
            const bounds = LD.Globals.getBounds();
            const rad = planet.radius;
            const center = {
                x: bounds.x/2,
                y: bounds.y/2
            };
            const scale = planet.size / 10;

            console.log(" center:  ",center);
            // planet.sprite = thisGame.physics.add.sprite(center.x, center.y, planet.img.name);
            planet.sprite = group.create(center.x + rad, center.y + rad, planet.img.name);
            // planet.sprite = thisGame.physics.add.sprite(500, 500, planet.img.name);
            planet.sprite.setInteractive();
            planet.sprite.setDepth(-5);
            planet.sprite.setName(planet.name);
            planet.sprite.setScale(scale);
            planet.sprite.radius = planet.radius;
            // thisGame.game.physics.enable(planet.sprite);
            thisGame.physics.add.existing(planet.sprite);
        }
        // group.setInteractive();
        // group.setDepth(-5);

        // var imgSize = LD.Planets.imgSize;

        // LD.Planets.rect = thisGame.add.rectangle(32 + x, 32 + y, 128, 128, 0xffff00);
        // LD.Planets.rect.setAlpha(0.1);
        // LD.Planets.rect.setInteractive();

        // LD.Planets.player = thisGame.physics.add.sprite(32 + x, 32 + y, 'player');
      
        // LD.Planets.player.setCollideWorldBounds(true);
        // LD.Planets.player.setSize(imgSize.x*0.9,imgSize.y*0.9).setOffset(imgSize.x*0.05,imgSize.y*0.05);   // actual size 100,150

        // LD.Planets.upgradeButton = thisGame.physics.add.sprite(32 + x, 32 + y, 'upgrade_button');
        // LD.Planets.upgradeButton.on('pointerup', function (pointer) {
        //     LD.Blocks.upgradeButtonClicked();
        //     LD.Planets.upgradeButton.setActive(false).setVisible(false);
        // });
        // LD.Planets.upgradeButton.setActive(false);
        // LD.Planets.upgradeButton.setDepth(10);
        // LD.Planets.upgradeButton.setInteractive();
        // LD.Planets.upgradeButton.target = {x:0,y:0};

        // LD.Planets.basicColorArray.forEach(color => {
        //     var tint = LD.Planets.tints[color];
        //     LD.Planets.statsMaxButton[color] = thisGame.physics.add.sprite(32 + x, 32 + y, 'upgrade_button');
        //     LD.Planets.statsMaxButton[color].on('pointerup', function (pointer) {
        //         LD.Planets.upgradeStatMax(color);
        //         LD.Planets.statsMaxButton[color].setActive(false).setVisible(false);
        //     });
        //     LD.Planets.statsMaxButton[color].setInteractive();
        //     LD.Planets.statsMaxButton[color].setDepth(1).setTint(tint).setScale(0.5);
        //     LD.Planets.statsMaxButton[color].setActive(true).setVisible(true);
        // });




		// return LD.Planets.player;
	},




	updatePlanets: function(){
        thisGame = LD.Globals.game;
        // console.log("thisGame.time.now:  ", thisGame.time.now);

        const center = LD.Globals.getCenter();

        LD.Planets.group.getChildren().forEach(function(planet) {
            // console.log(planet);
            if(planet.radius > 0){
                var angle = thisGame.time.now / (-1 * planet.radius * 10);
                var x = center.x + planet.radius * Math.cos(angle);
                var y = center.y + planet.radius * Math.sin(angle);

                console.log("planets x y : ",x,y, center, planet.radius, angle);

                planet.setPosition(x,y);
                planet.setRotation(angle);
            }
            
        });

/*
        xx = x + (d * cos(alpha))
        yy = y + (d * sin(alpha))
        Note: If angle is given in degree:

        angle in radian = angle in degree * Pi / 180
*/

	},



    getLevelFromMaxStatVal(maxStat){
        // 100 -> 1, 110 -> 2, 220 -> 13
        return (maxStat/10)-9;
    }

	

	

};