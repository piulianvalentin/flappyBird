class Bird {
	
	constructor( graphics ) {
		
		this.graphics = graphics;
		this.x = 80;
		this.y = 260;
		this.speedY = -6;
		this.crash = false;
	}

	show() {
		
		push();
		imageMode(CENTER); 
		image(this.graphics, this.x, this.y, 40, 40 );
		pop();
		console.log(this.x, this.y);

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
		if( this.y + 20 >= height * 0.83 )
			this.crash = true;

// 		Pipes collide assuming the bird it's circle shaped
		if( pipeX != undefined ) {

//			Bird near pipes
			if( this.x + 20 >= pipeX && this.x - 20 <= pipeX + 66 ) {

//				Collide with the left side of the pipes and right corner
				if( this.x < pipeX || this.x >= pipeX + 66) {

//					Create collide points every 2px 
					var cnt = 0;
					for( var point = pipeY; point <= height * 0.815; point+=2 ) {

//  					Heads of the pipes are 3px longer and have a height of 20px 					
						cnt++;
						if(cnt == 10)
							pipeX += 3;
//						Collide with the lower pipe
						if(dist(this.x, this.y, pipeX, point) <= 19) {
							this.crash = true;
						}
//						Collide with the upper pipe
						if(dist(this.x, this.y, pipeX, pipeY - 150 - (point - pipeY)) <= 18) {
							this.crash = true;
						}
					}
//					Collide right corner of the pipe
					if(dist(this.x, this.y, pipeX + 66, pipeY) <= 21) {
							this.crash = true;
						}
				}
//				Bird is between the pipes
				else {
					if(this.y + 25 >= pipeY || this.y - 16 <= pipeY - 150) {
						this.crash = true;
					}
				}				
			}
		}

		return this.crash;
	}

}