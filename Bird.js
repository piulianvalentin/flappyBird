class Bird {
	
	constructor( graphics ) {
		
		this.graphics = graphics;
		this.x = 80;
		this.y = 260;
		this.speedY = -2;
		this.crash = false;
		this.angleRotation;
	}

	show() {
		
		push();
		imageMode(CENTER);
		translate(this.x, this.y);
	
//      Bird rotation by speed
		switch( true ) {
			case ( this.speedY > 3 ):
				this.angleRotation = -30;
					break;
			case ( this.speedY > 2.5 ):
				this.angleRotation = -23;
					break;
			case ( this.speedY > 2 ):
				this.angleRotation = -15;
					break;
			case ( this.speedY > 1.5 ):
				this.angleRotation = 7;
					break;
			case ( this.speedY > -3 ):
				this.angleRotation = 0;
					break;
			case ( this.speedY > -5 ):
				this.angleRotation = 7;
					break;
			case ( this.speedY > -5.5 ):
				this.angleRotation = 15;
					break;
			case ( this.speedY > -6 ):
				this.angleRotation = 22;
					break;
			case ( this.speedY > -6.5 ):
				this.angleRotation = 30;
					break; 		
		}		
		rotate(this.angleRotation);
		image(this.graphics, 0, 0, 40, 40 );
		pop();

	}

	move() {	
		
		if( this.speedY > -8  )
			this.speedY -= 0.5;

//		Stop the bird when it hits top
		if( this.y <= 0 ) {
			this.y = 0;	
			this.speedY = -0.5;			
		}

		this.y -= this.speedY;		
	}

	jump() {
		
		this.speedY = 9;
	}

	collide( pipeX, pipeY ) {
		
		
//		Ground collide
		if( this.y + 20 >= height * 0.845 ) {
			( this.crash ? '' : sound.hit.play() );
			this.crash = true;
		}

// 		Pipes collide assuming the bird it's circle shaped 
		if( pipeX != undefined ) {

//			Bird near pipes
			if( this.x + 20 >= pipeX && this.x - 20 <= pipeX + 66 ) {

//				Collide with the left side of the pipes and right corner
				if( this.x < pipeX || this.x >= pipeX + 66 ) {

//					Create collide points every 2px 
					var cnt = 0;
					for( var point = pipeY; point <= height * 0.815; point+=2 ) {

//  					Heads of the pipes are 3px longer and have a height of 20px 					
						cnt++;
						if( cnt == 10 )
							pipeX += 3;
//						Collide with the lower pipe
						if( dist( this.x, this.y, pipeX, point ) <= 14) {
							this.crash = true;
							sound.hit.play();
						}
//						Collide with the upper pipe
						if( dist( this.x, this.y, pipeX, pipeY - 150 - ( point - pipeY ) ) <= 14 ) {
							this.crash = true;
							sound.hit.play();
						}
					}
//					Collide right corner of the pipe 
					if( dist( this.x, this.y, pipeX + 66, pipeY ) <= 18 ) {
							this.crash = true;
							sound.hit.play();
						}
					if(dist(this.x, this.y, pipeX + 66, pipeY - 150) <= 13 ) {
							this.crash = true;
							sound.hit.play();
						}
				}
//				Bird is between the pipes
				else {
					if( this.y + 19 >= pipeY || this.y - 12 <= pipeY - 150 ) {
						this.crash = true;
						sound.hit.play();
					}
				}				
			}
		}

		return this.crash;
	}

}