class EnemyGreen extends Enemy {

    constructor(_x, _y, _health, _speed){
        super(_x, _y, _health, _speed);
        this.sprite.setSpeed(this.movementSpeed, random(0, 360));
        this.sprite.addAnimation('walking', 'Assets/Frog/Frog1.png', 'Assets/Frog/Frog2.png', 'Assets/Frog/Frog3.png', 'Assets/Frog/Frog4.png', 'Assets/Frog/Frog5.png')
    }

    move(){
        if(this.sprite.position.x > width){
            this.sprite.setSpeed(this.movementSpeed, random(90, 360));    
        }
        if(this.sprite.position.x < 0){
            this.sprite.setSpeed(this.movementSpeed, random(-90, 90));    
        }
        if(this.sprite.position.y < 0){
            this.sprite.setSpeed(this.movementSpeed, random(0, 180));    
        }
        if(this.sprite.position.y > height){
            this.sprite.setSpeed(this.movementSpeed, random(180, 360));    
        }

        if(this.sprite.getDirection() > -90 && this.sprite.getDirection() < 90){
            this.sprite.mirrorX(1);
        }
        else{
            this.sprite.mirrorX(-1);
        }
        this.pos = this.sprite.position;

        
        
        
    }

    
}