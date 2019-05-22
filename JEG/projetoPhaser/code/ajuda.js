Game.ajuda = function(game){};
Game.ajuda.prototype = {

	create: function(game){

		game.scale.pageAlignHorizontally = true;
		game.scale.pageAlignVertically = true;
		game.scale.refresh();
		bg = game.add.sprite(-250,-10,'background_menu');
		bg.anchor.setTo(0,0);

		game.add.sprite(100, 100,'ajuda')

		backButton = game.add.button(90, 590,"seta_esquerda",this.BackToMainMenu,this);
		backButton.anchor.setTo(0.5,0.5);
		backButton.scale.set(0.5);

		

	},

	BackToMainMenu: function(game){
		this.game.state.start('MainMenu');
	},

	
}
