Game.MainMenu = function(game){};
Game.MainMenu.prototype = {

	create: function(game){

		game.scale.pageAlignHorizontally = true;
		game.scale.pageAlignVertically = true;
		game.scale.refresh();

		
		initalPosX = game.width/2;
		initalPosY = game.height;

		//Background
		bg = game.add.sprite(-250,-10,'background_menu');
		bg.anchor.setTo(0,0);

		//Logo
		logo = game.add.image(game.width-550,10,'logo');
		logo.scale.y = 0.9;
		logo.scale.x = 1;
		//logo.alpha = 0;

		//Button and actions
		playButton = game.add.button(350 ,(game.height/2)-100, "play",this.playTheGame,this);
		playButton.anchor.setTo(0.5,0.5);
		//playButton.alpha = 0;

		optionsButton = game.add.button(350, playButton.y+100,"options",this.optionsGame,this);
		optionsButton.anchor.setTo(0.5,0.5);
		//optionsButton.alpha = 0;

		exitButton = game.add.button(350, optionsButton.y+100,"backtothis",this.optionsGame,this);
		exitButton.anchor.setTo(0.5,0.5);
		//exitButton.alpha = 0;

		howtobutton = game.add.button(700, playButton.y+350,"howto",this.howtoGame,this);
		howtobutton.anchor.setTo(0.5,0.5);
		howtobutton.scale.setTo(0.75);
		//howtobutton.alpha = 0;


		
	},

	playTheGame: function(game){

		this.game.add.tween(optionsButton).to( {alpha : 0 }, 200, Phaser.Easing.None, true);
		this.game.add.tween(howtobutton).to( {alpha : 0 }, 200, Phaser.Easing.None, true);
		this.game.add.tween(exitButton).to( {alpha : 0 }, 200, Phaser.Easing.None, true);
		this.game.add.tween(playButton).to( {alpha : 0 }, 200, Phaser.Easing.None, true);
		this.game.add.tween(logo).to( {y : -200 }, 300, Phaser.Easing.None, true);
		
		this.game.state.start('EscolhaPersonagem');
		console.log("%cChoose Wisely!", "color:green; background:none; padding:5px;");
	},

	optionsGame: function(game){
		this.game.state.start('Options');

	},
	update: function(game){

	},

	howtoGame: function(game){
		this.game.state.start('ajuda')
	}

};