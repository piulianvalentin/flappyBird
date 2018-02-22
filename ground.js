class Ground {
	constructor( graphics ) {

		this.graphics = graphics;
		this.x = 0;
	}

	show() {
		image(this.graphics, this.x, height * 0.83, width + 50, height * 0.2);
	}

	move(){

// 	Ground pattern repeats every 30 px
		if( this.x > -30 )
			this.x -= 2;
		else
			this.x = 0;
	}
}