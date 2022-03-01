class Enemy {

    constructor(_x, _y, _health, _speed){
        this.pos = createVector(_x, _y);
        this.movementSpeed = _speed;
        this.health = _health;
        this.sprite = createSprite(this.pos.x, this.pos.y, 50);
        this.isDead = false;
    }

    move(){

    }

  

    hitDetect(){
        for(var i=0; i<bulletsFired.length; i++)
        {
            let hit =  collideRectCircle(this.pos.x - (this.sprite.width/2), 
                                        this.pos.y - (this.sprite.height/2), 
                                        this.sprite.width, 
                                        this.sprite.height, 
                                        bulletsFired[i].x, 
                                        bulletsFired[i].y,
                                        5);
            if(hit === true)
            {
                bulletsFired.splice(i,1);
                this.health -= 1;
                return true;
            }
            if(this.health <= 0){
                this.sprite.remove();
                this.isDead = true;
            }
        }
    }

    shoot(){
    }

}