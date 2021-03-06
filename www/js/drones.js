if(LD === undefined) {
  var LD = {};
}

LD.Drones = {

    statCosts: {
        damage: {
            basics: 110,
            metals: 100,
            reactant: 90,
            isotopes: 60,
            biologic: 1
        },
        collection: {
            basics: 110,
            metals: 100,
            reactant: 90,
            isotopes: 60,
            biologic: 1
        },
        thrusters: {
            basics: 110,
            metals: 100,
            reactant: 90,
            isotopes: 60,
            biologic: 1
        },
        armor: {
            basics: 110,
            metals: 100,
            reactant: 90,
            isotopes: 60,
            biologic: 1
        },
        intellect: {
            basics: 110,
            metals: 100,
            reactant: 90,
            isotopes: 60,
            biologic: 1
        },
        storage: {
            basics: 110,
            metals: 100,
            reactant: 90,
            isotopes: 60,
            biologic: 1
        }
    },

    drones: {
        Tartarus: [
            {
                name: "test001",
            }
        ]
    },

    resTypesArray: ["basics", "metals", "reactant", "isotopes", "research", "biologic"],
    statTypesArray: ["damage", "collection", "thrusters", "armor", "intellect","storage"],

    chassisArray: [
        {
            name: "tester",
            stats: {
                damage: 1,
                collection: 1,
                thrusters: 1,
                armor: 1,
                intellect: 1,
                storage: 1
            }
        }
    ],

    activeDrone: {},

	refresh: function (){



	},

	createDrones: function(x=0,y=0){
		thisGame = LD.Globals.game;
		LD.Drones.refresh();
        LD.Drones.activeDrone = LD.Drones.chassisArray[0];
	},




	updateDrones: function(){
        thisGame = LD.Globals.game;

	},

    calcDroneCost: function(stats) {
        var tallyObj = {};
        LD.Drones.statTypesArray.forEach(function(stat) {
            if(LD.Drones.statCosts && LD.Drones.statCosts[stat]){
                statCostObj = LD.Drones.statCosts[stat];
                costFib = LD.Globals.levelToCost(stats[stat]);
                LD.Drones.resTypesArray.forEach(res => {
                    tallyObj[res] = statCostObj[res] * costFib;
                });
            }
        });
        return tallyObj;
    },

    genName: function(){
        const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const numbers = "0123456789";
        var ltr = LD.Drones.genNameCharset(4, letters);
        var num = LD.Drones.genNameCharset(3, numbers);
        return ltr +"-"+ num;
    },

    genNameCharset: function(length, charset) {
        var result           = '';
        var charactersLength = charset.length;
        for ( var i = 0; i < length; i++ ) {
          result += charset.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    },

    getLevelFromMaxStatVal(maxStat){
        // 100 -> 1, 110 -> 2, 220 -> 13
        return (maxStat/10)-9;
    },

    addDrone: function(planet) {
        const drone = LD.Drones.activeDrone;
        console.log("in addDrone() , planet: ", planet);
        var arr = LD.Drones.drones[planet];
        if(Array.isArray(arr)){
            arr.push(drone);
        }else{
            LD.Drones.drones[planet] = [];
            LD.Drones.drones[planet].push(drone);
        }
        LD.Drones.payForDrone(drone);
    },

    checkCostOfDrone: function() {
        const drone = LD.Drones.activeDrone;
        console.log("checkCostOfDrone: ",drone);
        const tallyObj = LD.Drones.calcDroneCost(drone.stats);
        const resources = LD.Player.resources;
        const resTypesArray = LD.Drones.resTypesArray;

        var canAfford = true;
        for ( var i = 0; i < resTypesArray.length; i++ ) {
            var res = resTypesArray[i];
            if(tallyObj[res] && tallyObj[res] > resources[res]){
                canAfford = false;
            }
        }
        return canAfford;
    },

    payForDrone: function (drone) {
        const tallyObj = LD.Drones.calcDroneCost(drone.stats);
        const resTypesArray = LD.Drones.resTypesArray;
        var resources = LD.Player.resources;
        for ( var i = 0; i < resTypesArray.length; i++ ) {
            var res = resTypesArray[i];
            if(tallyObj[res]){
                resources[res] -= tallyObj[res];
            }
        }
        console.log("payForDrone():  ",tallyObj, resources);

    }

	

	

};

/*
    Resources:

    Basics
    Metals
    Reactant
    Isotopes
    Research
    Biologic

    basics
    metals
    reactant
    isotopes
    research
    biologic

*/
/*
    Drone Stats:

    Damage
        deals dmg to enemies per tick, faster mining
    Collection
        amount reclaimed from dmg per tick
    Thrusters
        inc dmg, col, and armor by small amount - determine max planet size
    Armor
        amount of damage taken before dead + reduces enemy dmg
    Intellect
        amount of research collected per coll
    Storage
        amount of stuff held until 'full'

    Each will have a 'factor' where things like biological are 0, but will appear as more and more are demanded

    Eg.   out of 100  ++stat research cost

    Basics      110
    Metals      105
    Reactant    95
    Isotopes    90
    // Research
    Biologic    10

    damage
    collection
    thrusters
    armor
    intellect
    storage

*/