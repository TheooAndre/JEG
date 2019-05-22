Game.PescadorEndless = function(game){};

Game.PescadorEndless.prototype = { 

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

    	game.scale.setGameSize(400,700);
    	
		initalPosX = game.width/2;
		initalPosY = game.height;

    	this.velocity = 0;
		this.shootable = true;
		this.courseScore = 0;
		this.maxHeight = 0;
		this.hookStuck = false;

		game.stage.backgroundColor = "#ffcc66";

    	game.physics.startSystem(Phaser.Physics.ARCADE);
		
		plataforma = this.game.add.sprite(initalPosX-150,initalPosY+140	,'doca');
		plataforma.scale.set(0.2,0.2);
		game.physics.enable(plataforma, Phaser.Physics.ARCADE);
		plataforma.body.setSize(1250, plataforma.body.height, plataforma.height+100, (plataforma.width/2)+25);
		

		plataforma.body.immovable = true;

		game.world.setBounds(0, 0, game.world.width, 1000);
		game.camera.y = 250;

		this.platforms = game.add.group();
		this.platforms.enableBody = true;
		this.platforms.inputEnabled = true;
		this.platforms.createMultiple(6, 'nuvem');
		this.platforms.scale.set(0.7,0.7);

		for (var i = 1; i < 6; i++) {
			var platform = this.platforms.getFirstDead();
			
			
			platform.reset(Math.floor(Math.random()*350), i*200-150);
			platform.scale.y = 0.15;
			platform.scale.x = 0.15;

			platform.checkWorldBounds = true;
			platform.outOfBoundsKill = true;

			platform.events.onKilled.add(this.platformDied, this);

		}
		

		this.player = this.game.add.sprite(200, 800, 'pescador');
		this.player.scale.set(1);
		game.physics.arcade.enable(this.player);
		

		this.player.animations.add('idle',[2],5, true);   
        this.player.animations.add('jump',[0],5, true);
        this.player.animations.add('run',[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14],20, true);
		this.player.animations.play('idle'); 
		this.player.body.collideWorldBounds = true;
		this.player.body.bounce.setTo(0.5,0.5);


		this.ground = game.add.sprite(-200,900, "waves");
		
		game.physics.enable(this.ground, Phaser.Physics.ARCADE);
		this.ground.body.immovable = true;
		this.ground.scale.set(5,1);
	
		this.ground.animations.add('idle',[0,1,2,3],1, true);   
		this.ground.animations.play('idle', 5, true); 

		 controls = {
            right: this.input.keyboard.addKey(Phaser.Keyboard.D),
            left: this.input.keyboard.addKey(Phaser.Keyboard.A),
            up: this.input.keyboard.addKey(Phaser.Keyboard.W),
        };
        //this.camera.follow(this.player);

        this.hook = this.game.add.sprite(1000, 1000, 'gancho');
		game.physics.arcade.enable(this.hook);
		this.hook.body.collideWorldBounds = false;
		this.hook.body.bounce.setTo(1,1);
		this.hook.inputEnabled = true;
		this.hook.kill();
   		
   		this.webs = game.add.group();
   		this.webs.scale.set(1)
		this.webs.enableBody = true;
		this.webs.inputEnabled = true;
		this.webs.createMultiple(60, 'corda');

		scoreString = 'Score : ';
        scoreText = this.add.text(this.world.width - 200,20, scoreString + score, { font: '34px Arial', fill: '#fff' });
        scoreText.fixedToCamera = true;

    },


    update: function(game){
    	game.physics.arcade.collide(this.player, this.ground, this.restartGame, null, this);

    	game.physics.arcade.collide(this.player, plataforma, this.onGround, null, this);

    	game.input.onDown.add(this.clickHandler, this);

    	if(this.player.position.y > this.webs.position || this.hook.position.y > 800){
    		this.hook.kill();
			this.hookStuck = false;
			this.webs.forEach(function(web) {
			web.kill();
		})
    	}


		this.game.physics.arcade.overlap(this.platforms, this.hook, this.hookPlatformCollisionHandler, null, this);
		this.game.physics.arcade.overlap(this.hook, this.player, this.hookPlayerCollisionHandler, null, this);
		this.game.physics.arcade.overlap(this.webs, this.player, this.webPlayerCollisionHandler, null, this);

		if (this.phase === "beforeFly") {
			this.hook.body.velocity.y = this.velocity/2;
			this.maxHeight = 700 - this.player.position.y;
			
			if (this.player.position.y <= this.bottomPlatformY) {
				this.phase = "fly";
				this.hook.kill();
				this.velocity = -this.player.body.velocity.y;
				this.propogateVelocity();
				this.player.body.velocity.y = 0;
				
				this.maxHeight = 700 - this.bottomPlatformY;
				
				
			}
		}
		if (this.phase === "fly") {
			this.courseScore += this.velocity;
			this.shootable = true;
			this.gameStarted = true;
			this.velocity -= 15;			

			this.velocity = Math.max(this.velocity, 0);
			this.propogateVelocity();
				if (this.velocity == 0) {
					this.player.body.velocity.y = 0;
					this.phase = "afterFly";
					this.hookStuck = false;
				}
		}
		if (this.phase == "afterFly") {
			this.player.body.velocity.y += 15;
			this.hookStuck = false;
			
		}

		if (this.hook.position.y <= -1 || this.hook.position.y >= 950 || this.hook.position.x <= 0 || this.hook.position.x >= game.world.width) {
			this.shootable = false;
			this.hookStuck = false;
			this.hook.kill();
			this.shootable = true;
		}
		this.points()
     
    },
   
    addOnePlatform: function(x, y) {
		var platform = this.platforms.getFirstDead();

		platform.reset(x, y);
		platform.body.velocity.Y = this.velocity;

		platform.checkWorldBounds = true;
		platform.outOfBoundsKill = true;
  	},

  	hookPlayerCollisionHandler: function() {
		this.hook.kill();
		this.hookStuck = false;
		this.webs.forEach(function(web) {
			web.kill();
		})
	},
	webPlayerCollisionHandler: function(a, b) {
		b.kill();
	},
  	shoot: function() {

		if (this.hook.alive == false) {
			this.hook.reset(this.player.position.x + 12.5, this.player.position.y);
			var x = this.game.input.activePointer.x - (this.player.position.x + 12.5);
			var y = this.game.input.activePointer.y - this.player.position.y;
			this.hookNorm = Math.sqrt(Math.pow(x, 2) +  Math.pow(y, 2));
			this.hook.body.velocity.x = x / this.hookNorm * 1700;
			this.hook.body.velocity.y = y / this.hookNorm * 1700;
			this.shootable = false;
			this.shootHeight = this.player.position.y;
    	}
	},

  	score: function() {
		return Math.floor((this.courseScore + this.maxHeight)/1000);
	},

    platformDied: function() {
		this.addOnePlatform(Math.floor(Math.random()*350), 125);
    },

    clickHandler: function() {
		if (this.shootable && this.player.position.y > this.game.input.mousePointer.y) {
			this.shoot();
			plataforma.destroy();	
			//shootSound.play();
		}
	},

    hookPlatformCollisionHandler: function() {
		if (this.hook.position.y < this.shootHeight - 10 && !this.hookStuck) {
			this.phase = "beforeFly";
			this.bottomPlatformY = this.hook.position.y;
			var deltaX = this.player.position.x + 25 - this.hook.position.x;
			var deltaY = this.player.position.y - this.hook.position.y-20;
			var norm = Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));
			//altera a velocidade do swing do player, encontrar uma boa !!
			this.player.body.velocity.x = -deltaX*4;
			this.player.body.velocity.y = -deltaY*6;
			this.hook.body.velocity.x = 0;
			this.hook.body.velocity.y = 0;
			this.hookStuck = true;

			for (var i = 1; i < Math.floor(norm / 10)+1; i++) {
				web = this.webs.getFirstDead();

				if (web == null){
					console.log('null');
					web = this.webs.getFirstDead();
				}
				else{
					web.scale.x = 0.15;
					web.scale.y = 0.15;
					var x = 30 + -i * deltaX / Math.floor(norm / 10) + this.player.position.x;
					var y = -(i+1.5) * deltaY / Math.floor(norm / 10) + this.player.position.y;

					web.reset(x, y);
				}
			}
		}
	},
	accelerate: function() {
	    this.velocity += 20;
	    this.propogateVelocity();
  },
  	decelerate: function() {
    	this.velocity -= 20;
    	this.propogateVelocity();
  },
  	propogateVelocity: function() {
    	this.platforms.forEach(function(platform, i) {
      		platform.body.velocity.y = this.velocity;
    	}.bind(this));
  	},
     restartGame: function() {
	  	this.hook.destroy();
	  	this.webs.destroy();
	  	this.phase = null;
	  	this.gameStarted = false;
	  	this.player.body.velocity.x = 0;
	    this.player.body.velocity.y = 0;

	  	this.webs.enableBody = false;
	    this.velocity = 0;
	    this.shootable = true;
	    
	    this.maxHeight = 0;
	    this.hookStuck = false;
	    
	    this.velocity = 0;
	   
	  	
	    this.state.restart();
  },
  points: function(){
            scoreText.text = scoreString + this.score()
       
    }
}
