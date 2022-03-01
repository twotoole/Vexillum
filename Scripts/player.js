let playerSprite;

class Player{

    constructor(_x,_y, _w, _h, _s){
        this.pos = createVector(_x, _y);
        this.animationArrayIndex = 0;
        this.animSpeed = 0.1;
        this.movementSpeed = _s;
    }

    draw(){
        this.spriteSelection;

        if(this.spriteSelection === undefined)
        {
            this.spriteSelection = 0;
        }
        //w key
        else if (keyIsDown(87) || keyIsDown(UP_ARROW )){    
            let releventFrames = [10, 11];   
            this.spriteSelection = releventFrames[this.iterateAnimations()];   
        }
        //a key
        else if (keyIsDown(65) || keyIsDown(LEFT_ARROW)){ 
            let releventFrames = [7, 8];   
            this.spriteSelection = releventFrames[this.iterateAnimations()];  
        }
        //s key
        else if (keyIsDown(83) || keyIsDown(DOWN_ARROW)){ 
            let releventFrames = [1, 2];   
            this.spriteSelection = releventFrames[this.iterateAnimations()];  
        }
        //d key
        else if (keyIsDown(68) || keyIsDown(RIGHT_ARROW)){
            let releventFrames = [4, 5];   
            this.spriteSelection = releventFrames[this.iterateAnimations()];        
        }

        playerSprite = playerSpriteSheet.get(playerSpriteArray[this.spriteSelection].x, 
                                            playerSpriteArray[this.spriteSelection].y,
                                            playerSpriteArray[this.spriteSelection].w,
                                            playerSpriteArray[this.spriteSelection].h);                              
        image(playerSprite, this.pos.x, this.pos.y);
    }


    move(){
        this.moveVector = createVector(0, 0);
        //w key
        if (keyIsDown(87) || keyIsDown(UP_ARROW)){ 
            this.moveVector.y += -1;
        }
        //a key
        if (keyIsDown(65) || keyIsDown(LEFT_ARROW) ){ 
            this.moveVector.x += -1;
        }
        //s key
        if (keyIsDown(83) || keyIsDown(DOWN_ARROW)){ 
            this.moveVector.y += 1;
        }
        //d key
        if (keyIsDown(68) || keyIsDown(RIGHT_ARROW)){
            this.moveVector.x += 1;
        }
        if(keyIsPressed === false){
            this.moveVector.x = 0;
            this.moveVector.y = 0;
        }
        this.moveVector.normalize();
        this.pos.x +=this.moveVector.x * this.movementSpeed;
        this.pos.y += this.moveVector.y * this.movementSpeed;

        if(this.pos.x > width){
            this.pos.x = 0;    
        }
        if(this.pos.x < 0){
            this.pos.x = width;    
        }
        if(this.pos.y < 0){
            this.pos.y = height;    

        }
        if(this.pos.y > height){
            this.pos.y = 0;
        }

        
    }


    iterateAnimations(){
        if (keyIsPressed === true) {
        this.animationArrayIndex += this.animSpeed;
        return int(this.animationArrayIndex) % 2;
        }
        this.animationArrayIndex = 0;
    }

    hitDetect(){
        for(var i=0; i<enemyBulletsFired.length; i++)
        {
            let hit =  collideRectCircle(this.pos.x, this.pos.y, playerSprite.width, playerSprite.height, enemyBulletsFired[i].x, enemyBulletsFired[i].y, 5);
            // rect(this.pos.x, this.pos.y, playerSprite.width, playerSprite.height);
            if(hit === true)
            {
                enemyBulletsFired.splice(i,1);
                health -= 1;
                return true;
            }
        }
        for(var j=0;j<enemies.length;j++){
            let hit2 = collideRectCircle(this.pos.x, this.pos.y, playerSprite.width, playerSprite.height, enemies[j].pos.x, enemies[j].pos.y, (enemies[j].sprite.width + enemies[j].sprite.height)/2);
            if(hit2 === true){                
                enemies[j].sprite.remove();
                enemies[j].isDead = true;
                enemies.splice(j, 1);
                health -= 1;    
            }
        }

    }

}