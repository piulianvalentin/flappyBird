var groundImage;
var backgroundImage;
var birdImage;
var pipeImage;
var bird, ground, pipes = [];
var counter = 0;
var start = 110;
var scoreImages = [];
var score;
var sound = {};
var soundScoreTrigger = 0;
var gameStart = false;
var flappyBirdTextImage;

function preload() {
	
	frameRate(60); 

//	Sound
	sound.hit = loadSound('sound/sfx_hit.wav');
	sound.wing = loadSound('sound/sfx_wing.wav');
	sound.point = loadSound('sound/sfx_point.wav');

//	Images
	for (var i = 0; i < 10; i++) {
		scoreImages.push(loadImage("images/score/" + i + ".png"));
	}
	birdImage = loadImage("images/yellowBird.png");
	backgroundImage = loadImage("images/background.png")
	groundImage = loadImage("images/ground.png");
	pipeImage = loadImage("images/pipe.png");
	flappyBirdTextImage = loadImage("images/flappyBirdText.png");
}

function setup() {
	
	createCanvas(400, 600);
	angleMode(DEGREES);
	bird = new Bird(birdImage);
	ground = new Ground(groundImage);
	image(backgroundImage, 0, 0, width + 5, height);
	bird.show();
	ground.show();
	image(flappyBirdTextImage, 75, 100, 250, 100);
	bird.crash = true;
	textSize(30);
	fill(255);
	text('Press SPACE to play', 70, 350);
}

function draw() {
	
// 	Game playing if there is no collision
	if( !bird.collide() ) {
		
		image(backgroundImage, 0, 0, width + 5, height);
		counter++;

		if(counter > start) {
			for(var i = 0; i < pipes.length; i++) {
				pipes[i].show();
				pipes[i].move();
				bird.collide(pipes[i].x, pipes[i].y);
			}			
		}

		if(counter % 100  == 0) {
			pipes.push(new Pipes(pipeImage, width, random(250, 450)));
//			Keep a maximum of three pipes
			if(pipes.length >= 4) {
				pipes.shift(); 
			}
	}
	ground.show();
	ground.move();
	bird.show();   
	bird.move();

	//	For keeping the score. Counter will be divided by 100 after we substract the start
		score = parseInt( ( counter - start - 70 ) / 100 );
		
		if( score < 0)
			score = 0;

		if ( score != soundScoreTrigger ) {
			soundScoreTrigger++;
			sound.point.play();
		}

		score = score + "";
		for( var i = 0; i < score.length; i++ ) {
			image( scoreImages[ score[i] ], 200 + i * 25, 80, 25, 40 ); 
		}	  
	}


}

function keyPressed() {
	
	if( !gameStart ) {
		gameStart = true;
		bird.crash = false;
	}

	if(keyCode  === 32)
		bird.jump();

	if( !bird.collide() ) {
		sound.wing.play();
	}
}





