class Pipes {
	constructor( graphics, x, y ) {

		this.x = x;
		this.y = y;
		this.graphics = graphics;
	}

	show() { 
//  	Lower pipe		
		image(this.graphics, this.x, this.y, 66, 400);

// 		Upper pipe
		push();
		translate(this.x, this.y);
		rotate(180);
		image(this.graphics, -66, 150 , 66, 400);
		pop();
	}

	move() {

		this.x -= 2;
	}
}