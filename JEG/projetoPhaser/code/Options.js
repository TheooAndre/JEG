Game.Options = function(game){};

Game.Options.prototype = {

	create:function(game){

		game.scale.pageAlignHorizontally = true;
		game.scale.pageAlignVertically = true;
		game.scale.refresh();

		//Background
		bg = game.add.sprite(-250,-10,'background_menu2');
		bg.anchor.setTo(0,0);

		//Logo
		logo = game.add.image(game.width-550,10,'logo');
		logo.scale.y = 0.9;
		logo.scale.x = 1;
		//logo.alpha = 0;

		plusMusicBTN = game.add.button(game.width/2+35, game.height/2,"plus",this.plusMusic,this);
		plusMusicBTN.anchor.setTo(0.5,0.5);

		minusMusicBTN = game.add.button(game.width/2-150, game.height/2,"minus",this.minusMusic,this);
		minusMusicBTN.anchor.setTo(0.5,0.5);

		muteButton = game.add.button(plusMusicBTN.x-95, game.height/2, "muteon",this.muteMusic,this);
		muteButton.anchor.setTo(0.5,0.5);
		muteButton.alpha = 0;

		unmuteButton = game.add.button(plusMusicBTN.x-95, game.height/2,"muteoff",this.unmuteMusic,this);
		unmuteButton.anchor.setTo(0.5,0.5);
		//unmuteButton.alpha = 0;

		backButton = game.add.button(90, 590,"seta_esquerda",this.BackToMainMenu,this);
		backButton.anchor.setTo(0.5,0.5);
		backButton.scale.set(0.5);
	},
	plusMusic: function(game){
		music.mute = false;
		if(music.volume>=1.00 || music.volume==1.00){
			null;
		}else{
			music.volume += 0.1;
			this.musicVol(music.volume);
		}
	},
	minusMusic: function(game){
		if(music.volume<=0.1 || music.volume==0.00){
			null;
		}
		if(music.volume<=0.01){
			music.mute = true;
		}
		else{
			music.volume -= 0.1;
			this.musicVol(music.volume);
		}
	},
	muteMusic: function(game){
		this.game.add.tween(unmuteButton).to( {alpha : 1 }, 200, Phaser.Easing.None, true);
		this.game.add.tween(muteButton).to( {alpha : 0 }, 200, Phaser.Easing.None, true);
		if(music.volume>0.00){
			music.mute = true;
		}
	},
	unmuteMusic: function(game){
		this.game.add.tween(unmuteButton).to( {alpha : 0 }, 200, Phaser.Easing.None, true);
		this.game.add.tween(muteButton).to( {alpha : 1 }, 200, Phaser.Easing.None, true);
		if(music.volume == 0.00){
			music.mute = false;
		}
	},

	BackToMainMenu: function(game){
		this.game.state.start('MainMenu');
	},
	update: function(game){
	},

};