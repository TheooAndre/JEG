Game.AstronautaEndless = function(game){};

var score=0;
var ScoreString = '';
var ScoreText;
var controls = {};
var star = 1

makeArray = function(start, end, posX, posY) {
        
        for (var i = start; i < end; i++) { 
            myArray.push({x: posX*i, y: posY}); 
        } 
        return myArray;
    }

Game.AstronautaEndless.prototype = { 
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
        

        this.player = this.add.sprite(100,380,'astronauta');
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
        //game.physics.arcade.gravity.y = 100;
        this.player.body.gravity.y = 1000;
        this.player.body.collideWorldBounds = true;
        //player.body.bounce.set(0, .2);
        //record the initial position
        this.startY = this.player.y;
        //set listeners
        game.input.onDown.add(this.mouseDown, this);
        this.blocks = game.add.group();
        this.birds = game.add.group();
        this.makeBird(game);

        scoreString = 'Score : ';
        scoreText = this.add.text(this.world.width - 200,50, scoreString + score, { font: '34px Arial', fill: '#fff' });
        scoreText.fixedToCamera = true;

         controls = {
            right: this.input.keyboard.addKey(Phaser.Keyboard.D),
            left: this.input.keyboard.addKey(Phaser.Keyboard.A),
            up: this.input.keyboard.addKey(Phaser.Keyboard.W),
        };

        var laser_data = makeArray(0, 6, 100, 10)
        var laser_data = makeArray(0, 13, 200, 1120)
        //var laser_data = makeArray(13, 14, 100, 300)
            
        this.laser = game.add.group();
        this.laser.enableBody = true;
        
        laser_data.forEach(function(item){
            var laser_chunk = this.laser.create(item.x, item.y, 'laser');
        }, this);        
        this.laser.setAll('body.immovable', true);
        this.laser.setAll('body.allowGravity', false);
        this.laser.scale.set(0.5)


        myArray = []
    },


    mouseDown: function() { 
       
       this.player.body.velocity.y = -35 * 12;
     },
    
    makeBird: function(game) {
        //if the bird already exists 
        //destory it

        this.birds.removeAll();
        //pick a number at the top of the screen7
        //between 10 percent and 40 percent of the height of the screen
        for(let i = 0; i < Math.round(score/50 +1); i++){
            var birdY = game.rnd.integerInRange(game.height * .15, game.height * .85);
            //add the bird sprite to the game
            bird = game.add.sprite(game.width, birdY, "missil");

            //enable the sprite for physics
            game.physics.enable(bird, Phaser.Physics.ARCADE);
            //set the x velocity at -200 which is a little faster than the blocks
            bird.body.velocity.x = - game.rnd.integerInRange(200,400) * (score/100 + 1);
            //this.bird.body.velocity.y = game.rnd.integerInRange(1,70);    
            bird.body.bounce.set(2, 2);

            this.birds.add(bird)
        }
    },
   
    update: function(game) {

        game.physics.arcade.collide(this.player, this.laser, this.delayOver, null, this);

        
        game.physics.arcade.collide(this.player, this.blocks, this.delayOver, null, this);
        //
        //collide the blocks with the ground
        //
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