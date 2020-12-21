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

    rotateMult: 10,
    /* 
        assumes Earth is radius = 800px
        14 = 1y/minute
        840 = 1y/hour
        20160 = 1y/day
    */ 
    lastPlanet: "",

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
            planet.sprite.radOffset = i;
            // thisGame.game.physics.enable(planet.sprite);
            thisGame.physics.add.existing(planet.sprite);
        }

	},




	updatePlanets: function(){
        thisGame = LD.Globals.game;
        // console.log("thisGame.time.now:  ", thisGame.time.now);

        const center = LD.Globals.getCenter();

        LD.Planets.group.getChildren().forEach(function(planet) {
            // console.log(planet);
            if(planet.radius > 0){
                var angle = thisGame.time.now / (-1 * planet.radius * LD.Planets.rotateMult);
                var rotation = angle * 2;
                var rotOff = planet.radOffset;
                var x = center.x + planet.radius * Math.cos(angle+rotOff);
                var y = center.y + planet.radius * Math.sin(angle+rotOff);

                // console.log("planets x y : ",x,y, center, planet.radius, angle);

                planet.setPosition(x,y);
                planet.setRotation(rotation);
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