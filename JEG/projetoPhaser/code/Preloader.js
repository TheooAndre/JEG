Game.Preloader = function(game){

	this.preloadBar = null;
};

Game.Preloader.prototype = {
	preload:function(){
		this.time.advancedTiming = true;

		//LevelAtleta
		this.load.image('groundCave','resources/fundos/groundRocha.png');
		this.load.image('star','resources/objetos/star.png');
		this.load.image('meta','resources/objetos/meta.png');
		this.load.image('checkpoint','resources/objetos/checkpoint.png');
		this.load.image('plataformaCave','resources/fundos/rocha.png');
		this.load.spritesheet('heart','resources/fundos/heart.png',32,32);
		this.load.spritesheet('lava','resources/fundos/lava.png',61,128);
		this.load.spritesheet('roda','resources/objetos/roda.png',45.6,45);

		this.load.image('nuvem','resources/objetos/nuvem.png');
		this.load.image('gancho','resources/objetos/gancho.png');
		this.load.image('corda','resources/objetos/corda.png');
		this.load.image('doca','resources/objetos/plataforma.png');
		this.load.image('laser','resources/objetos/laser.png');





		this.load.spritesheet('pescador','resources/personagens/pescador.png',35,48);
		this.load.spritesheet('atleta','resources/personagens/atleta.png',35,55);
		this.load.spritesheet('astronauta','resources/personagens/astronautateste.png',35,48);


		
		this.load.audio('run', 'resources/audio/correr1.mp3');
		this.load.audio('theme', 'resources/audio/somFundo.mp3');


		this.load.spritesheet('waves','resources/fundos/waves.png',190,70);

		this.load.spritesheet('groundAtleta','resources/fundos/groundAtletaSprite.png',855,50);

		

		this.load.spritesheet('missil','resources/fundos/missil.png',32,64);

        this.load.image("bar", "resources/fundos/powerbar.png");
        this.load.image("block", "resources/fundos/bloco.png");
        

        this.load.image('logo', 'resources/fundos/logo1.png');
		this.load.image('play', 'resources/botoes/btn_jogar.png');
		this.load.image('options', 'resources/botoes/btn_opcoes.png');
		this.load.image('backtothis', 'resources/botoes/btn_sair.png');
		this.load.image('howto', 'resources/botoes/btn_ajuda.png');
		this.load.image('plus', 'resources/botoes/btn_som_mais.png');
		this.load.image('minus', 'resources/botoes/btn_som_menos.png');
		this.load.image('muteoff', 'resources/botoes/btn_som_on.png');
		this.load.image('muteon', 'resources/botoes/btn_som_neg.png');
		this.load.image('seta_esquerda', 'resources/botoes/seta_esquerda.png');
		this.load.image('seta_direita', 'resources/botoes/seta_direita.png');
		this.load.image('classico','resources/botoes/classico.png');
		this.load.image('competitivo','resources/botoes/competitivo.png');
		this.load.image('ajuda','resources/objetos/ajuda.png');


		//Buttons Characters
		this.load.image('select_atleta', 'resources/botoes/btn_Atleta.png?');
		this.load.image('select_astronauta', 'resources/botoes/btn_Astronauta.png');
		this.load.image('select_pescador', 'resources/botoes/btn_Pescador.png');

		//Load Menu Background
		this.load.image('background_menu','resources/fundos/menu1.png');
		this.load.image('background_menu2','resources/fundos/menu.png');

		
	},
 
 	create:function(){

 		this.state.start('MainMenu');
 	}
};