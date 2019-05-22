Game.AtletaEndless = function(game){};

var score=0;
var ScoreString = '';
var ScoreText;
var controls = {};
var star = 1

Game.AtletaEndless.prototype = { 
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

        this.clickLock = false;
        this.power = 0;
        //turn the background sky blue
        game.stage.backgroundColor = "#00ffff";
        //add the ground
        this.ground = game.add.sprite(0,570, "groundAtleta");
        //this.ground.anchor.setTo(0.5,0.5);
        this.ground.animations.add('idle',[0,1,2],5, true);
        this.ground.animations.play('idle');
        //add the hero in 
        //     this.hero = game.add.sprite(game.width * .2, this.ground.y, "hero");
        //make animations


        this.player = this.add.sprite(100,380,'atleta');
        this.player.anchor.setTo(0.5,0.5);

        this.player.animations.add('idle',[2],5, true);    
        this.player.animations.add('jump',[0],5, true);
        this.player.animations.add('run',[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14],20, true);

        //this.player.animations.play("run");
        //this.player.width = game.width / 12;
        //this.player.scale.y = this.player.scale.x;
        //this.player.anchor.set(0.5, 1);
        //add the power bar just above the head of the player

        this.powerBar = game.add.sprite(this.player.x + this.player.width / 2, this.player.y - this.player.height / 2, "bar");


        this.powerBar.width = 0;
        //add the clouds
        //this.clouds = game.add.sprite(0, 0, "clouds");
        //this.clouds.width = game.width;
        //start the physics engine
        game.physics.startSystem(Phaser.Physics.ARCADE);
        //enable the player for physics
        game.physics.enable(this.player, Phaser.Physics.ARCADE);
        game.physics.enable(this.ground, Phaser.Physics.ARCADE);
        //game.physics.arcade.gravity.y = 100;
        this.player.body.gravity.y = 600;
        this.player.body.collideWorldBounds = true;
        //player.body.bounce.set(0, .2);
        this.ground.body.immovable = true;
        //record the initial position
        this.startY = this.player.y;
        //set listeners
        game.input.onDown.add(this.mouseDown, this);
        this.blocks = game.add.group();
        this.birds = game.add.group();
        this.makeBlocks(game);
        this.makeBird(game);

        scoreString = 'Score : ';
        scoreText = this.add.text(this.world.width - 200,50, scoreString + score, { font: '34px Arial', fill: '#fff' });
        scoreText.fixedToCamera = true;

         controls = {
            right: this.input.keyboard.addKey(Phaser.Keyboard.D),
            left: this.input.keyboard.addKey(Phaser.Keyboard.A),
            up: this.input.keyboard.addKey(Phaser.Keyboard.W),
        };
    },

    makeArray: function(start, end) {
        var myArray = [];
        for (var i = start; i < end; i++) { 
            myArray.push(i); 
        } 
        return myArray;
    },

    mouseDown: function() { 
        if(this.player.body.onFloor() || this.player.body.touching.down){
            if (this.clickLock == true) { 
                return;
            } 
            /*if (player.y != this.startY) { 
                return; 
            } */
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
        this.input.onDown.add(this.mouseDown, this); 
        this.player.animations.play("jump"); 
    }, 

    increasePower: function() { 
        this.power++; 
        this.powerBar.width = this.power; 
        if (this.power > 50) {
            this.power = 50;
        }
    },

    doJump: function() {
        this.player.body.velocity.y = -this.power * 12;
    },
    makeBlocks: function(game) {
        this.blocks.removeAll();
        var wallHeight = game.rnd.integerInRange(1, 4);

        for (var i = 0; i < wallHeight; i++) {
            var block = game.add.sprite(0, -i * 32, "block");
            this.blocks.add(block);
        }
        this.blocks.x = game.width - this.blocks.width 
        this.blocks.y = this.ground.y - 30;
        //
        //Loop through each block
        //and apply physics
        this.blocks.forEach(function(block) {
                //enable physics
                game.physics.enable(block, Phaser.Physics.ARCADE);
                //set the x velocity to -160
                block.body.velocity.x = -150 * (score/100 + 1);
                //apply some gravity to the block
                //not too much or the blocks will bounce
                //against each other
                //block.body.gravity.y = 4;
                //set the bounce so the blocks
                //will react to the runner
                block.body.bounce.set(1, 1);
            }
        );
    },
    makeBird: function(game) {
        //if the bird already exists 
        //destory it

        this.birds.removeAll();
        //pick a number at the top of the screen7
        //between 10 percent and 40 percent of the height of the screen
        for(let i = 0; i < Math.round(score/50 +1); i++){
            var birdY = game.rnd.integerInRange(game.height * .2, game.height * .6);
            //add the bird sprite to the game
            bird = game.add.sprite(game.width + 100, birdY, "missil");

            //enable the sprite for physics
            game.physics.enable(bird, Phaser.Physics.ARCADE);
            //set the x velocity at -200 which is a little faster than the blocks
            bird.body.velocity.x = - game.rnd.integerInRange(200,300) * (score/100 + 1);
            //this.bird.body.velocity.y = game.rnd.integerInRange(1,70);    
            bird.body.bounce.set(2, 2);

            this.birds.add(bird)
        }
    },
    onGround() {
        if(controls.up.isDown )//&& this.player.body.onFloor())
            {
                this.player.body.velocity.y = -400;
                this.player.animations.play('jump');
            }else if (this.player) {
            this.player.animations.play("run");
        }

    },
    update: function(game) {


        


        game.physics.arcade.collide(this.player, this.ground, this.onGround, null, this);
        //
        //collide the this.player with the blocks
        //
        game.physics.arcade.collide(this.player, this.blocks, this.delayOver, null, this);
        //
        //collide the blocks with the ground
        //
        game.physics.arcade.collide(this.ground, this.blocks);
        //
        //when only specifying one group, all children in that
        //group will collide with each other
        //
        game.physics.arcade.collide(this.blocks);
        //colide the this.player with the bird
        //
        game.physics.arcade.collide(this.player, this.birds, this.delayOver, null, this);
        //
        //get the first child
        var fchild = this.blocks.getChildAt(0);
        //if off the screen reset the blocks
        if (fchild.x < -game.width) {
            this.makeBlocks(game);
        }
        //if the bird has flown off screen
        //reset it
        var bchild = this.birds.getChildAt(0);
        if (bchild.x < -game.width) {
            this.makeBird(game);
        }
        if (this.player.y < this.player.height) {
            this.player.body.velocity.y = 200;
            this.delayOver();
        }
        this.points();


    },
    delayOver: function() {
        this.clickLock = true;
        if (this.player) {
            this.player.animations.play("die");
            this.player.body.velocity.y = 100;
            this.camera.shake(0.05, 500);
        }
        this.time.events.add(Phaser.Timer.SECOND, this.gameOver, this);
    },
    gameOver: function() {
        score = 0;
        scoreText.text = scoreString + score
        this.state.restart();
    },
    points: function(){
            score += 0.05;
            scoreText.text = scoreString + Math.floor(score)
       
    }
}