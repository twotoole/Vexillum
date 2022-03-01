class EnemyWhite extends Enemy {

    constructor(_x, _y, _health, _speed){
        super(_x, _y, _health, _speed)
        
        
        this.sprite.addAnimation('walking', 'Assets/Headless/Headless1.png', 'Assets/Headless/Headless2.png', 'Assets/Headless/Headless3.png', 'Assets/Headless/Headless4.png', 'Assets/Headless/Headless5.png')
    }

    move(){
        this.sprite.attractionPoint(0.05, player.pos.x, player.pos.y);
        this.sprite.limitSpeed(2);
        
        this.sprite.position.x++
        
        if(this.sprite.position.x > width){
            this.sprite.position.x = 0;    
        }
        if(this.sprite.position.x < 0){
            this.sprite.position.x = width;    
        }
        if(this.sprite.position.y < 0){
            this.sprite.position.y = height;    

        }
        if(this.sprite.position.y > height){
            this.sprite.position.y = 0;
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