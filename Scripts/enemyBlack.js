class EnemyBlack extends Enemy {

    constructor(_x, _y, _health, _speed){
        super(_x, _y, _health, _speed)
        this.shootSpeed = 100;
        this.sprite.addAnimation('walking', 'Assets/Crow/Crow1.png', 'Assets/Crow/Crow2.png', 'Assets/Crow/Crow3.png', 'Assets/Crow/Crow2.png')
    }

        move(){
            let vec = createVector(player.pos.x - this.pos.x, player.pos.y - this.pos.y);
            let distance = dist(player.pos.x, player.pos.y, this.pos.x, this.pos.y);
            distance = distance * distance;
            distance = distance/width;
            //vec.normalize();
            vec.div(distance);
            if(distance <50){
            this.pos.x -= vec.x;
            this.pos.y -= vec.y;
            }
            if(distance>150){
                vec.normalize();
                this.pos.x += vec.x;
                this.pos.y += vec.y;
            }
            
            if(this.sprite.getDirection() > -90 && this.sprite.getDirection() < 90){
                this.sprite.mirrorX(1);
            }
            else{
                this.sprite.mirrorX(-1);
            }
            this.sprite.position = this.pos;

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

            

        }

        shoot(){
            let vec = createVector(player.pos.x - this.pos.x, player.pos.y - this.pos.y);
            vec.normalize();
            this.shootSpeed--;
            if(this.shootSpeed <= 0){
                enemyBulletsFired.push(new Bullet(this.pos.x, this.pos.y, vec.x,vec.y, 5, 5));
                this.shootSpeed = 100;
            }
        }

        
}