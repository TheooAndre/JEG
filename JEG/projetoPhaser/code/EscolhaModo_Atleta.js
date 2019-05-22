Game.EscolhaModo_Atleta = function(game){};
Game.EscolhaModo_Atleta.prototype = {

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

		classicoButton = game.add.button(350, 350,"classico",this.Classic_Atleta,this);
		classicoButton.anchor.setTo(0.5,0.5);
		//classicoButton.scale.set(0.5);
		//classicoButton.alpha = 0;

		competitivoButton = game.add.button(350, classicoButton.y-100,"competitivo",this.Competitivo_Atleta,this);
		competitivoButton.anchor.setTo(0.5,0.5);
		//competitivoButton.scale.set(0.5);
		backButton = game.add.button(90, 590,"seta_esquerda",this.BackToMainMenu,this);
		backButton.anchor.setTo(0.5,0.5);
		backButton.scale.set(0.5);

},

//verificar se os estados estão adicionados no html game1, e se são chamados os scripts!!!
	Classic_Atleta: function(game){
		//NIVEL 1 DO ATLETA
		this.game.state.start('Level1Atleta');
	},
	Competitivo_Atleta: function(game){
		this.game.state.start('AtletaEndless');

	},
	BackToMainMenu: function(game){
		this.game.state.start('EscolhaPersonagem');
	},
	update : function(game){

	},


};