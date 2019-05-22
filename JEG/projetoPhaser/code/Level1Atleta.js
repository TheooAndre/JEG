Game.Level1Atleta = function(game){};


var player;
var controls = {};
var playerSpeed = 50;
var jumpTimer = 0;
var myArray = [];

makeArray = function(start, end, posX, posY) {
        
        for (var i = start; i < end; i++) { 
            myArray.push({x: posX*i, y: posY}); 
        } 
        return myArray;
    }

Game.Level1Atleta.prototype = { 
	create: function(game) {

		game.scale.pageAlignHorizontally = true;
		game.scale.pageAlignVertically = true;
		game.scale.refresh();

		music = game.add.audio('theme');
		music.volume = 0.3
		if(!music.isPlaying){
			music.loopFull();
		}


		this.ground = game.add.group();
		this.ground.enableBody = true

		game.world.setBounds(0,0,2200,600);
		this.stage.backgroundColor = '#3A5963';

		this.physics.arcade.gravity.y = 800


		var ground_data = makeArray(0, 5, 127, 500)
		var ground_data = makeArray(13, 20, 127, 500)
            
        this.ground = game.add.group();
        this.ground.enableBody = true;
        
        ground_data.forEach(function(item){
            var ground_chunk = this.ground.create(item.x, item.y, 'groundCave');
        }, this);        
        this.ground.setAll('body.immovable', true);
        this.ground.setAll('body.allowGravity', false);



        myArray = []


        //   ************************ PLATAFORMAS *************************


        var plataforma_data = makeArray(4, 5, 114, 400)
		var plataforma_data = makeArray(8, 9, 110, 300)
		var plataforma_data = makeArray(13, 14, 100, 300)
            
        this.plataforma = game.add.group();
        this.plataforma.enableBody = true;
        
        plataforma_data.forEach(function(item){
            var plataforma_chunk = this.plataforma.create(item.x, item.y, 'plataformaCave');
        }, this);        
        this.plataforma.setAll('body.immovable', true);
        this.plataforma.setAll('body.allowGravity', false);


        myArray = []

        // *************************** LAVA *******************************

        var lava_data = makeArray(5, 13, 127, 510)
		//var lava_data = makeArray(8, 9, 114, 300)

        this.lava = game.add.group();
       
        this.lava.enableBody = true;
        
        lava_data.forEach(function(item){
            var lava_chunk = this.lava.create(item.x, item.y, 'lava');
        }, this);        
        this.lava.setAll('body.immovable', true);
        this.lava.setAll('body.allowGravity', false);

        myArray = []


        this.meta = this.add.sprite(2100,400,'meta');
        this.meta.scale.setTo(0.3);
        this.meta.enableBody = true;

        game.physics.enable(this.meta,Phaser.Physics.ARCADE);
		this.meta.body.immovable = true;
		this.meta.body.collideWorldBounds = true;
		this.meta.body.allowGravity = false;

		 

		player = this.add.sprite(50,50,'atleta');
		player.anchor.setTo(0.5,0.5);

		
		player.animations.add('idle',[2],5, true);    
        player.animations.add('jump',[0],5, true);
        player.animations.add('run',[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14],20, true);

		this.camera.follow(player);

		controls = {

			right: this.input.keyboard.addKey(Phaser.Keyboard.D),
			left: this.input.keyboard.addKey(Phaser.Keyboard.A),
			up: this.input.keyboard.addKey(Phaser.Keyboard.W),
		};

        game.physics.startSystem(Phaser.Physics.ARCADE);
     
        game.physics.enable(player, Phaser.Physics.ARCADE);
       
        player.body.gravity.y = 600;
        player.body.collideWorldBounds = true;
        
        

	},

	

	onGround() {
        if(controls.up.isDown )//&& this.player.body.onFloor())
            {
                player.body.velocity.y = -200;
                player.animations.play('jump');
            }else if (player) {
            player.animations.play("run");

        }
    },

	update: function(game) {

		game.physics.arcade.collide(player, this.ground, this.onGround, null, this);

		game.physics.arcade.collide(player, this.plataforma)

		game.physics.arcade.collide(player, this.lava, this.resetPlayer, null, this);

		game.physics.arcade.collide(player, this.meta, this.nextLevel, null, this);

		player.body.velocity.x = 0;

		if(controls.right.isDown){
			player.animations.play('run');
			player.scale.setTo(1,1);
			player.body.velocity.x = 300;
		}

		if(controls.left.isDown){
			player.animations.play('run');
			player.scale.setTo(-1,1);
			player.body.velocity.x = -300;
		}

		if(controls.up.isDown && (player.body.onFloor() || 
		player.body.touching.down) && this.time.now > jumpTimer)
			{
				player.body.velocity.y = -400;
				jumpTimer = this.time.now + 1200;
				player.animations.play('jump');
			}
		if(controls.up.isUp && controls.right.isUp && controls.left.isUp && player.body.onFloor()){
			player.animations.play('idle');
			player.scale.setTo(1,1);
			player.body.velocity.x = 0;
		}

		if(player.body.velocity.x == 0 && player.body.velocity.y == 0){
			player.animations.play('idle');
		}

	},


	nextLevel:function(){
		this.lava.destroy();
		this.state.start('Level2Atleta',true,false);
	},

	resetPlayer:function(){
	player.reset(100,400);

	},


	getCoin:function(){
		map.putTile(-1, layer.getTileX(player.x), layer.getTileY(player.y));
	},
}
