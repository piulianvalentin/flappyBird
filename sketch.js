var groundImage;
var backgroundImage;
var birdImage;
var pipeImage;
var bird, ground, pipes = [];
var counter = 0;
var start = 110;

function preload() {
	
	frameRate(60); 
	birdImage = loadImage("images/yellowBird.png");
	backgroundImage = loadImage("images/background.png")
	groundImage = loadImage("images/ground.png");
	pipeImage = loadImage("images/pipe.png");
}

function setup() {
	
	createCanvas(400, 600);
	angleMode(DEGREES);
	bird = new Bird(birdImage);
	ground = new Ground(groundImage);


}

function draw() {
	
	if(!bird.collide()) {
		
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
			if(pipes.length >= 4) {
				pipes.shift(); 
			}
	}
	ground.show();
	ground.move();
	bird.move();
	bird.show();	  
	}		
}

function keyPressed() {
	if(keyCode  === 32)
		bird.jump();
}





