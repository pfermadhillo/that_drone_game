if(LD === undefined) {
  var LD = {};
}

LD.HUD = {

    colorScheme: {
        base: 0x150451,
        accent:0x056AA4,
        trim:0xE1F485,
        text:0xC2FCF5
    },

    trimSize: 5,

    topDivideY: 200,
    sideDivideX: 900,

    topButtons: [
        {
            text:"Chassis"
        },
        {
            text:"Build"
        }
    ],

    sidebarViews: [],

    buttonSize: {x:180,y:50},
    buttonPadding: 40,
    buttonMargins: 10,
    buttonFontSize: '32px',

    fontColor: "#E1F485",
    fontGreyedOut: "#333333",

    resFontColors: {
        basics: "#CCAAAA",
        metals: "#EEEEEE",
        reactant: "#EE8844",
        isotopes: "#44EE44",
        research: "#DDEE88",
        biologic: "#55EEAA"
    },

    sidebarNameFontSize: '48px',
    sidebarNameMargin: 20,

    resNameFontSize: '42px',
    resNameMargin: 20,
    resValMargin: 24,
    resTextOffsetX: 640,
    resTextGapMult: 2.5,

    sidebarState: "",
    sidebarCurrentView : [],

	refresh: function (){

	},

	createHUD: function(){
		thisGame = LD.Globals.game;
		LD.HUD.refresh();

        const bounds = LD.Globals.getBounds();

        // LD.HUD.fontColor = "#"+LD.HUD.colorScheme.trim.toString().slice(2);

        const cam = thisGame.cameras.main;

        cam.setBounds(0, 0,
                    bounds.x, 
                    bounds.y);
        cam.startFollow(LD.Player.player);
        cam.setViewport(0,LD.HUD.topDivideY,
                        LD.HUD.sideDivideX,
                        LD.Globals.gameWidth - LD.HUD.topDivideY);

	},

	updateHUD: function(){

	},

    createSceneHUD: function () {
        thisHUD = LD.Globals.HUD;

        // const cam2 = thisHUD.cameras.add(400, 0, 400, 300).setBackgroundColor(0x0033ff);


        var topbar = thisHUD.add.rectangle(
                        LD.Globals.gameWidth/2,
                        LD.HUD.topDivideY/2, 
                        LD.Globals.gameWidth, LD.HUD.topDivideY, 
                        LD.HUD.colorScheme.base);
        LD.HUD.topbar = topbar;
        topbar.setStrokeStyle(LD.HUD.trimSize, LD.HUD.colorScheme.trim);
        topbar.setScrollFactor(0);

        var sidebarWidth = LD.Globals.gameWidth - LD.HUD.sideDivideX;
        var sidebarHeight = LD.Globals.gameHeight - LD.HUD.topDivideY;
        var sidebar = thisHUD.add.rectangle(
                        LD.HUD.sideDivideX + sidebarWidth/2,
                        LD.HUD.topDivideY + sidebarHeight/2, 
                        sidebarWidth, 
                        sidebarHeight, 
                        LD.HUD.colorScheme.base);
        LD.HUD.sidebar = sidebar;
        sidebar.setStrokeStyle(LD.HUD.trimSize, LD.HUD.colorScheme.trim);
        sidebar.setScrollFactor(0);

        const size = LD.HUD.buttonSize;
        const pad = LD.HUD.buttonPadding;
        const marg = LD.HUD.buttonMargins;


        for (let i = 0; i < LD.HUD.topButtons.length; i++) {
            var button = LD.HUD.topButtons[i];
            const name = button.text;

            var x = pad + (i * (size.x + pad)) + size.x/2 ;
            console.log("topButtons[]: x:  ", x , i);

            var y = LD.HUD.topDivideY/2
            button.rect = thisHUD.add.rectangle(
                        x,
                        y, 
                        size.x, 
                        size.y, 
                        LD.HUD.colorScheme.accent)
            .setInteractive()
            .setStrokeStyle(LD.HUD.trimSize, LD.HUD.colorScheme.trim)
            .setScrollFactor(0)
            .setName(name);

            button.text = thisHUD.add.text(
                        x + marg - size.x/2, 
                        y + marg - size.y/2, 
                        button.text, 
                        { fontSize: LD.HUD.buttonFontSize, fill: LD.HUD.fontColor })
            .setScrollFactor(0)
            .setName(name);


        }

        console.log("topButtons[]: ", LD.HUD.topButtons);

        sidebar.nameText = thisHUD.add.text(
                    LD.HUD.sideDivideX + LD.HUD.sidebarNameMargin, 
                    LD.HUD.topDivideY + LD.HUD.sidebarNameMargin, 
                    "", 
                    { fontSize: LD.HUD.sidebarNameFontSize, fill: LD.HUD.fontColor });
        // sidebar.nameText.setStroke('#000', 1);
        sidebar.nameText.setScrollFactor(0);

        for (let i = 0; i < LD.Drones.resTypesArray.length; i++) {
            var res = LD.Drones.resTypesArray[i];
            var colOffset = Math.floor(i / 3) * size.x * LD.HUD.resTextGapMult;
            var rowOffset = (i % 3) * size.y;
            sidebar[res+"_msg"] = thisHUD.add.text(
                    LD.HUD.resTextOffsetX + colOffset, 
                    pad + rowOffset, 
                    LD.Globals.toTitleCase(res), 
                    { fontSize: LD.HUD.resNameFontSize, fill: LD.HUD.resFontColors[res] });
            // sidebar.nameText.setStroke('#000', 1);
            sidebar[res+"_msg"].setScrollFactor(0);
        }
        
        for (let i = 0; i < LD.Drones.resTypesArray.length; i++) {
            var res = LD.Drones.resTypesArray[i];
            var colOffset = Math.floor(i / 3) * size.x * LD.HUD.resTextGapMult;
            var rowOffset = (i % 3) * size.y;
            var theRes = LD.Player.resources[res];
            var theResStr = LD.HUD.convertIntToFactors(theRes);
            var len = theResStr.length;
            colOffset -= (len+1) * LD.HUD.resValMargin; 
            LD.HUD.sidebar[res+"_msg"] = thisHUD.add.text(
                    LD.HUD.resTextOffsetX + colOffset, 
                    pad + rowOffset, 
                    theResStr, 
                    { fontSize: LD.HUD.resNameFontSize, fill: LD.HUD.resFontColors[res], align: 'right' }).setScrollFactor(0);
        }
    },

    updateSceneHUD: function() {
        for (let i = 0; i < LD.Drones.resTypesArray.length; i++) {
            const res = LD.Drones.resTypesArray[i];
            var textBox = LD.HUD.sidebar[res+"_msg"];
            // console.log("updateSceneHUD: ", textBox);
            var theRes = LD.Player.resources[res];
            var theResStr = LD.HUD.convertIntToFactors(theRes);
            if(textBox.text != theResStr){
                console.log("updateSceneHUD: ", textBox.text, theResStr );
                textBox.setText(theResStr);
            }
        }
    },

    convertIntToFactors: function   (theInt) {
        var s = ''+theInt;
        var temp = s;
        if(s.length > 4){
            var i=1, j=0;
            var mag = s.length - 1;
            temp = s.charAt(0) +".";
            while (j < 1 && i < mag) {
                var c = s.charAt(i); 
                // console.log("c:  ",c,i);
                if(c >= '0' && c <= '9'){
                    temp += c;
                    j++;
                }
                i++;
            }
            temp += "E"+mag;
        }
        return temp
    },

    changeSidebarView: function(view) {
        // LD.HUD.sidebarState != "planet_"+planet.name
        LD.HUD.sidebarState = view;
        if(view.substring(0,7) == "planet_"){
            LD.HUD.makeOrResumePlanetView(view);
        }
    },

    makeOrResumePlanetView: function(view) {
        const name = view.substring(7);
        const size = LD.HUD.buttonSize;
        const pad = LD.HUD.buttonPadding;
        const marg = LD.HUD.buttonMargins;

        var theView = {};
        var button = {};
        LD.HUD.emptySidebarCurrentView();


        var x = LD.HUD.sideDivideX + size.x;
        // console.log("topButtons[]: x:  ", x , i);

        var y = pad + LD.HUD.topDivideY + size.y * 1.5
        button.rect = thisHUD.add.rectangle(
                    x,
                    y, 
                    size.x, 
                    size.y, 
                    LD.HUD.colorScheme.accent)
        .setInteractive()
        .setStrokeStyle(LD.HUD.trimSize, LD.HUD.colorScheme.trim)
        .setScrollFactor(0)
        .setName("addDrone_"+name);

        var addDroneFontColor = LD.HUD.fontColor;
        if(!LD.Drones.checkCostOfDrone()){
            addDroneFontColor = LD.HUD.fontGreyedOut;
        }

        button.text = thisHUD.add.text(
                    x + marg - size.x/2, 
                    y + marg - size.y/2, 
                    "Add Drone", 
                    { fontSize: LD.HUD.buttonFontSize, fill: addDroneFontColor })
        .setScrollFactor(0)
        .setName("addDrone_"+name);

        LD.HUD.sidebarCurrentView.push(button);


        console.log("LD.Drones.drones:  ",LD.Drones.drones, name);
        if(LD.Drones.drones && LD.Drones.drones[name] && LD.Drones.drones[name].length){
            for (let i = 0; i < LD.Drones.drones[name].length; i++) {
                const drone = LD.Drones.drones[name][i];
                var btn = {};
                var newY = y + (i+1) * (size.y + pad);
                console.log("in planet drones list: ",name,i,newY);
                btn.rect = thisHUD.add.rectangle(
                        x,
                        newY, 
                        size.x, 
                        size.y, 
                        LD.HUD.colorScheme.accent)
                .setInteractive()
                .setStrokeStyle(LD.HUD.trimSize, LD.HUD.colorScheme.trim)
                .setScrollFactor(0);

                btn.text = thisHUD.add.text(
                        x + marg - size.x/2, 
                        newY + marg - size.y/2, 
                        drone.name, 
                        { fontSize: LD.HUD.buttonFontSize, fill: LD.HUD.fontColor }).setScrollFactor(0);
                LD.HUD.sidebarCurrentView.push(btn);
            }
        }
        
    },

    getLevelFromMaxStatVal(maxStat){
        // 100 -> 1, 110 -> 2, 220 -> 13
        return (maxStat/10)-9;
    },

    emptySidebarCurrentView: function() {
        console.log("emptySidebarCurrentView():  ",LD.HUD.sidebarCurrentView);
        LD.HUD.sidebarCurrentView.forEach(function(obj) {
            try{
                if(obj.rect){obj.rect.destroy();}
                if(obj.text){obj.text.destroy();}
            }catch(e){
                console.log("e: ",e);
            }          
        });
        LD.HUD.sidebarCurrentView = [];
    }

	

	

};