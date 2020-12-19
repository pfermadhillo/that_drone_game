if(LD === undefined) {
  var LD = {};
}

LD.Messages = {
    woodText:  "",
    woodTextPrefix:   "Need Wood: ",
    woodTextSuffix:   "/9",

    nothingText:  "",
    nothingTextPrefix:   "Nothing: ",
    nothingTextSuffix:   "/"+LD.Player.nothingTallyMax,

    movesText:  "",
    movesTextPrefix:   "Moves: ",

    levelText:  "",
    levelTextPrefix :   "Level: ",

    ticksText:  "",
    ticksTextPrefix :   "Distance: ",

    debugText:  "",
    debugTextPrefix :   "debug: ",

    timeText:  "",
    timeTextPrefix :   "Time: ",
    savedTime: 0,

    introTextMsg:   "intro 1 fill",
    introTextMsg2:   "intro 2 fill",
    
    selectTextMsg:   "Select your Runner!",
    winloseTextMsg:   "",
    restartTextMsg:   "Click to restart!",

    gotSwordText: "There's a note it reads: \n\t\t\tHey kid I left you my old sword",

    winloseTexts: {
        zeroHP: "You ran out of yellow (life).",
        nothingMaxed: "Thanks I'll take it from here",
        levelOneCleared: "Ah... The fire is nice \n\t and let's take a nap"
      },

    textDepth: 200,

    hpBarSize: {width:100,height:20},


    statsText: {}, 

    createStatsText: function(){
      var player = LD.Player.player;

      LD.Messages.statsText.blue = LD.Globals.game.add.text(80, 80, 
        LD.Player.stats.blue + ":" + LD.Player.statsMax.blue, 
        { fontSize: '48px', fill: '#00f' });
      LD.Messages.statsText.blue.setStroke('#000', 5);
      LD.Messages.statsText.blue.setDepth( 2 );

      LD.Messages.statsText.yellow = LD.Globals.game.add.text(80, 80, 
        LD.Player.stats.yellow + ":" + LD.Player.statsMax.yellow, 
        { fontSize: '48px', fill: '#ff0' });
      LD.Messages.statsText.yellow.setStroke('#000', 5);
      LD.Messages.statsText.yellow.setDepth( 2 );

      LD.Messages.statsText.red = LD.Globals.game.add.text(80, 80, 
        LD.Player.stats.red + ":" + LD.Player.statsMax.red, 
        { fontSize: '48px', fill: '#f00' });
      LD.Messages.statsText.red.setStroke('#000', 5);
      LD.Messages.statsText.red.setDepth( 2 );

      LD.Messages.upgradeStatusArray = [];
    },

    updateStatsText: function(){
      // LD.Messages.statsText.blue.setText(LD.Player.stats.blue + ":" + LD.Player.statsMax.blue);
      var stats = LD.Player.stats;
      var statsMax = LD.Player.statsMax;
      var player = LD.Player.player;
      var blue = {};
      var yellow = {};
      var red = {};
      if(LD.Messages.statsText && LD.Messages.statsText.blue){blue = LD.Messages.statsText.blue;}
      if(LD.Messages.statsText && LD.Messages.statsText.yellow){yellow = LD.Messages.statsText.yellow;}
      if(LD.Messages.statsText && LD.Messages.statsText.red){red = LD.Messages.statsText.red;}
      var backoutX = LD.Globals.gameWidth * 0.49;
      // var backoutY = LD.Globals.gameHeight * 0.4;
      var backoutY = {
        blue: LD.Globals.gameHeight * 0.45,
        yellow: LD.Globals.gameHeight * 0.35,
        red: LD.Globals.gameHeight * 0.25,
      };

      if(stats  && statsMax){
        if(blue && blue.text && statsMax.blue){
          // console.log("updateStatsText(): ", blue, backoutX, backoutY);
          blue.setPosition(player.x - backoutX, player.y - backoutY.blue);
          blue.setText(stats.blue.toString().padStart(3, ' ') + ":" + statsMax.blue);
        }
        if(yellow && yellow.text && statsMax.yellow){
          // console.log("updateStatsText(): ", yellow, backoutX, backoutY);
          yellow.setPosition(player.x - backoutX, player.y - backoutY.yellow);
          yellow.setText(stats.yellow.toString().padStart(3, ' ') + ":" + statsMax.yellow);
        }
        if(red && red.text && statsMax.red){
          // console.log("updateStatsText(): ", red, backoutX, backoutY);
          red.setPosition(player.x - backoutX, player.y - backoutY.red);
          red.setText(stats.red.toString().padStart(3, ' ') + ":" + statsMax.red);
        }
      }
    },


    savedTimeFormatted: function(){
        return LD.Messages.msToTime(LD.Messages.savedTime);
    },

    msToTime: function(s) {

  // Pad to 2 or 3 digits, default is 2
      function pad(n, z) {
        z = z || 2;
        return ('00' + n).slice(-z);
      }

      var ms = s % 1000;
      s = (s - ms) / 1000;
      var secs = s % 60;
      s = (s - secs) / 60;
      var mins = s % 60;
      var hrs = (s - mins) / 60;

      // return pad(hrs) + ':' + pad(mins) + ':' + pad(secs) + '.' + pad(ms, 3);
      return pad(mins) + ':' + pad(secs) + '.' + pad(ms);
    }
};

