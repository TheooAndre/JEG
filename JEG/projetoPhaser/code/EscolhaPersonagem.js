Game.EscolhaPersonagem = function(game){};
Game.EscolhaPersonagem.prototype = {

	create:function(game){

		game.scale.pageAlignHorizontally = true;
		game.scale.pageAlignVertically = true;
		game.scale.refresh();

		initalPosX = game.width/2;
		initalPosY = game.height;

		//Background
		bg = game.add.sprite(-250,-10,'background_menu2');
		bg.anchor.setTo(0,0);

		//Logo
		logo = game.add.image(game.width-550,10,'logo');
		logo.scale.y = 0.9;
		logo.scale.x = 1;
		//logo.alpha = 0;

		//Players
		atletaButton = game.add.button(300, 310,"select_atleta",this.Select_Atleta,this);
		atletaButton.anchor.setTo(0.5,0.5);
		atletaButton.scale.set(0.5);
		//atletaButton.alpha = 0;

		pescadorButton = game.add.button(300, 450,"select_pescador",this.Select_Pescador,this);
		pescadorButton.anchor.setTo(0.5,0.5);
		pescadorButton.scale.set(0.5);
		//pescadorButton.alpha = 0;

		astronautaButton = game.add.button(300, 175,"select_astronauta",this.Select_Astronauta,this);
		astronautaButton.anchor.setTo(0.5,0.5);
		astronautaButton.scale.set(0.5);
		//astronautaButton.alpha = 0;

		pescador = this.game.add.image(400, 400, 'pescador');
		pescador.scale.set(2);
		pescador.animations.add('run',[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14],20, true);
		pescador.animations.play('run');
		

		atleta = this.game.add.image(400,250,'atleta');
		atleta.scale.set(2);
		atleta.animations.add('run',[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14],20, true);
		atleta.animations.play('run');
		

		astronauta = this.game.add.image(400,100,'astronauta');
		astronauta.scale.set(2);
		astronauta.animations.add('run',[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14],20, true);
		astronauta.animations.play('run');

		//Seta Esquerda(voltar para menu principal)
		backButton = game.add.button(90, 590,"seta_esquerda",this.BackToMainMenu,this);
		backButton.anchor.setTo(0.5,0.5);
		backButton.scale.set(0.5);
	},
	Select_Atleta : function(game){
		this.game.state.start('EscolhaModo_Atleta');
	},

	Select_Astronauta: function(game){
		this.game.state.start('EscolhaModo_Astronauta');
	},

	Select_Pescador: function(game){
		this.game.state.start('EscolhaModo_Pescador');
	},
	BackToMainMenu: function(game){
		this.game.state.start('MainMenu');
	},

	update : function(game){

	},

};