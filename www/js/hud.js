if(LD === undefined) {
  var LD = {};
}

LD.HUD = {

    colorScheme: {
        base: 0x250491,
        accent:0x057AB4,
        trim:0xE1F485,
        text:0xC2FCF5
    },

    trimSize: 5,

    topDivideY: 200,
    sideDivideX: 1000,

	refresh: function (){

	},

	createHUD: function(){
		thisGame = LD.Globals.game;
		LD.HUD.refresh();

        const bounds = LD.Globals.getBounds();


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

    },

    getLevelFromMaxStatVal(maxStat){
        // 100 -> 1, 110 -> 2, 220 -> 13
        return (maxStat/10)-9;
    }

	

	

};