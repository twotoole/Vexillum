//https://editor.p5js.org/carrefinho/sketches/Sk7ZvoMn7
class Bullet{

	constructor(_posX, _posY, _vectorX, _vectorY, _speed, _size){
		this.x = _posX
		this.y = _posY;
		this.xSpd = _vectorX;
		this.ySpd = _vectorY;
		this.speed = _speed;
		this.size = _size;
	}

	update(){
		this.x += this.xSpd * this.speed;
		this.y += this.ySpd * this.speed;
	}

	draw(){
			push();
			stroke(0);
			strokeWeight(1);
			fill(255);
			ellipse(this.x, this.y, this.size);
			pop();
	}

	outOfBounds(){
		return(this.x > width+10 || this.x < -10 || this.y > height+10 || this.y < -10);
	}

}