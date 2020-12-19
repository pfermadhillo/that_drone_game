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
            text:"button1"
        },
        {
            text:"button2"
        },
        {
            text:"button3"
        },
        {
            text:"button4"
        },
        {
            text:"button5"
        },
        {
            text:"button6"
        }
    ],

    buttonSize: {x:160,y:50},
    buttonPadding: 40,
    buttonMargins: 10,
    buttonFontSize: '32px',

    fontColor: "#E1F485",

    sidebarNameFontSize: '48px',
    sidebarNameMargin: 20,

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


        for (let i = 0; i < LD.HUD.topButtons.length; i++) {
            var button = LD.HUD.topButtons[i];
            const size = LD.HUD.buttonSize;
            const pad = LD.HUD.buttonPadding;
            const marg = LD.HUD.buttonMargins;

            var x = pad + (i * (size.x + pad)) + size.x/2 ;
            console.log("topButtons[]: x:  ", x , i);

            var y = LD.HUD.topDivideY/2
            button.rect = thisHUD.add.rectangle(
                        x,
                        y, 
                        size.x, 
                        size.y, 
                        LD.HUD.colorScheme.accent);
            button.rect.setInteractive();
            button.rect.setStrokeStyle(LD.HUD.trimSize, LD.HUD.colorScheme.trim);
            button.rect.setScrollFactor(0);

            // button.rect.on('pointerup', function (pointer) {
            //     button.rect.fillColor(Math.random() * 16000000);
            // });

            button.text = thisHUD.add.text(
                        x + marg - size.x/2, 
                        y + marg - size.y/2, 
                        button.text, 
                        { fontSize: LD.HUD.buttonFontSize, fill: LD.HUD.fontColor });
            // button.text.setStroke('#000', 1);
            button.text.setScrollFactor(0);
        }

        console.log("topButtons[]: ", LD.HUD.topButtons);

        sidebar.nameText = thisHUD.add.text(
                    LD.HUD.sideDivideX + LD.HUD.sidebarNameMargin, 
                    LD.HUD.topDivideY + LD.HUD.sidebarNameMargin, 
                    "", 
                    { fontSize: LD.HUD.sidebarNameFontSize, fill: LD.HUD.fontColor });
        // sidebar.nameText.setStroke('#000', 1);
        sidebar.nameText.setScrollFactor(0);

    },

    getLevelFromMaxStatVal(maxStat){
        // 100 -> 1, 110 -> 2, 220 -> 13
        return (maxStat/10)-9;
    }

	

	

};