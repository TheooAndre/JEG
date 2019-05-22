Game.Level2Pescador = function(game){};


var player;
var controls = {};
var playerSpeed = 50;
var jumpTimer = 0;
var life;
var vidaCount = 0;
var count = 0
var myArray = [];
var star = 1
var checkpointBoolean = false


makeArray = function(start, end, posX, posY) {
        
        for (var i = start; i < end; i++) { 
            myArray.push({x: posX*i, y: posY}); 
        } 
        return myArray;
    }

Game.Level2Pescador.prototype = { 
	create: function(game) {


		game.scale.pageAlignHorizontally = true;
		game.scale.pageAlignVertically = true;
		game.scale.refresh();

		music = game.add.audio('theme');
		music.volume = 0.3
		if(!music.isPlaying){
			music.loopFull();
		}

		run = game.add.audio('run');

		this.powerBar = game.add.sprite( 100, 100, "bar");
		this.powerBar.width = 0;
		this.power = 0;

		


		this.ground = game.add.group();
		this.ground.enableBody = true

		game.world.setBounds(0,0,2200,600);
		this.stage.backgroundColor = '#3A5963';

		this.physics.arcade.gravity.y = 800


		//   ************************ GROUND *************************

		var ground_data = makeArray(0, 3, 127, 500)
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


        var plataforma_data = makeArray(5, 6, 114, 400)
		var plataforma_data = makeArray(12, 13, 110, 300)
		//var plataforma_data = makeArray(13, 14, 100, 300)
            
        this.plataforma = game.add.group();
        this.plataforma.enableBody = true;
        
        plataforma_data.forEach(function(item){
            var plataforma_chunk = this.plataforma.create(item.x, item.y, 'plataformaCave');
        }, this);        
        this.plataforma.setAll('body.immovable', true);
        this.plataforma.setAll('body.allowGravity', false);


        myArray = []

        // *************************** LAVA *******************************

        var lava_data = makeArray(3, 13, 127, 510)
		//var lava_data = makeArray(8, 9, 114, 300)

        this.lava = game.add.group();
       
        this.lava.enableBody = true;
        
        lava_data.forEach(function(item){
            var lava_chunk = this.lava.create(item.x, item.y, 'lava');
        }, this);        
        this.lava.setAll('body.immovable', true);
        this.lava.setAll('body.allowGravity', false);

        myArray = []


        // ************************ META ********************************

        this.meta = this.add.sprite(2100,400,'meta');
        this.meta.scale.setTo(0.3);
        this.meta.enableBody = true;

        game.physics.enable(this.meta,Phaser.Physics.ARCADE);
		this.meta.body.immovable = true;
		this.meta.body.collideWorldBounds = true;
		this.meta.body.allowGravity = false;


		//************************ SUPER POWER ***************************

		this.star = game.add.sprite( 200, 300, "star");
		this.star.scale.setTo(0.5);

		this.stars = game.add.group();

		game.physics.enable(this.star,Phaser.Physics.ARCADE);

		this.stars.add(this.star)
		 
		// *********************** CHECKPOINT ****************************

		this.checkpoint = game.add.sprite( 12*112, 255, "checkpoint");
		this.checkpoint.scale.setTo(0.5);

		game.physics.enable(this.checkpoint,Phaser.Physics.ARCADE);
		this.checkpoint.body.immovable = true
		 
		// ********************** PLAYER *******************************

		player = this.add.sprite(50,50,'pescador');
		player.anchor.setTo(0.5,0.5);

		
		player.animations.add('idle',[2],5, true);    
        player.animations.add('jump',[0],5, true);
        player.animations.add('run',[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14],20, true);

		this.camera.follow(player);
		
		// ************************* RODA ESPINHOS *******************

		this.roda = this.add.sprite(1700,400,'roda');
		this.roda.scale.setTo(2);

		this.roda.animations.add('idle',[0,1,2],5, true);
		this.roda.animations.play('idle')

		game.physics.enable(this.roda,Phaser.Physics.ARCADE);

		//************************** HEARTS ****************************

		//vida = game.add.sprite(500,400,'heart');
		//vida.anchor.setTo(0.5,0.5);

		//vida.animations.add('vida',[0,1,2,3,4,5,6], 12, true);
		//vida.animations.play('vida');

		this.heart = game.add.sprite(950,150,'heart');
		this.heart.animations.add('heart',[0,1,2,3,4,5,6], 12, true);
		this.heart.animations.play('heart');

		game.physics.enable(this.heart,Phaser.Physics.ARCADE);



		//life = new addHeart(10, game, 1800, 1800);	
		//console.log(life)

		controls = {

			right: this.input.keyboard.addKey(Phaser.Keyboard.D),
			left: this.input.keyboard.addKey(Phaser.Keyboard.A),
			up: this.input.keyboard.addKey(Phaser.Keyboard.W),
		};

        game.physics.startSystem(Phaser.Physics.ARCADE);
     
        game.physics.enable(player, Phaser.Physics.ARCADE);
        game.physics.enable(this.ground, Phaser.Physics.ARCADE);
       
        player.body.gravity.y = 600;
        player.body.collideWorldBounds = true;
        
        

	},	

	onGround() {
        if(controls.up.isDown )//&& player.body.onFloor())
            {
                player.body.velocity.y = -200;
                player.animations.play('jump');
            }else if (player) {
            player.animations.play("run");

        }
    },

    mouseDown: function() { 
        if(player.body.onFloor() || player.body.touching.down){
            if (this.clickLock == true) { 
                return;
            } 
            
            this.input.onDown.remove(this.mouseDown, this); 
            this.timer = this.time.events.loop(Phaser.Timer.SECOND / 1000, this.increasePower, this); 
            this.input.onUp.add(this.mouseUp, this); 
        }
    }, 

    mouseUp: function() { 
        this.input.onUp.remove(this.mouseUp, this); 
        this.doJump(); 
        this.time.events.remove(this.timer); 
        this.power = 0; 
        this.powerBar.width = 0; 
        //this.input.onDown.add(this.mouseDown, this); 
        player.animations.play("jump"); 
    }, 

    increasePower: function() { 
        this.power++; 
        this.powerBar.width = this.power;
        if (this.power > 50) {
            this.power = 50;
        }
    },

    doJump: function() {
    	console.log(this.power)
        player.body.velocity.y = -this.power * 12;

    },

	update: function(game) {

		//this.physics.arcade.collide(player, vida, this.algumaCena, null, this);
		game.physics.arcade.collide(player, this.ground, this.onGround, null, this);

		game.physics.arcade.collide(player, this.plataforma)

		game.physics.arcade.collide(this.roda, this.ground)


		game.physics.arcade.collide(player, this.lava, this.resetPlayer, null, this);
		game.physics.arcade.collide(player, this.roda, this.resetPlayer, null, this);

		game.physics.arcade.collide(player, this.meta, this.nextLevel, null, this);

		game.physics.arcade.collide(player, this.stars, this.addStar, null, this);

		game.physics.arcade.collide(player, this.checkpoint, this.checkpointVerifica, null, this);

		game.physics.arcade.collide(player, this.heart, this.addLife, null, this);

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

		if(star >= 1){
			game.input.onDown.add(this.mouseDown, this);
			star--
		}

	},


	nextLevel:function(){
		this.state.start('MainMenu');
	},

	checkpointVerifica:function(){
		checkpointBoolean = true
		this.checkpoint.body = false
	},

	resetPlayer:function(){
		if(vidaCount > 0 && checkpointBoolean ){
			player.reset(12*112,255);
			vidaCount -= 1
			console.log(vidaCount)
		}else{
			this.star.destroy();
			player.reset(100,400);
			this.star = this.add.sprite( 200, 300, "star");
			this.star.scale.setTo(0.5);
			this.physics.enable(this.star,Phaser.Physics.ARCADE);

			this.stars.add(this.star)
		}
	},
	addLife:function(){
		vidaCount += 1;
		this.heart.body = false
		this.heart.kill();
		console.log(vidaCount)
	},

	addStar:function(){
		star ++
		this.star.destroy()
	},

	getCoin:function(){
		map.putTile(-1, layer.getTileX(player.x), layer.getTileY(player.y));
	}

	}

