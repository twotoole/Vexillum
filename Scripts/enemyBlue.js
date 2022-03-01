class EnemyBlue extends Enemy {

    constructor(_x, _y, _health, _speed){
        super(_x, _y, _health, _speed);
        this.sprite.addAnimation('walking', 'Assets/Fish/NewFish2.png')

    }

    move(){
        let vec = createVector(player.pos.x - this.pos.x, player.pos.y - this.pos.y);
        vec.normalize();
        this.pos.x += vec.x;
        this.pos.y += vec.y;
        this.sprite.position = this.pos;
        if(vec.x<0){
        this.sprite.mirrorX(-1);
        }
        else{
            this.sprite.mirrorX(1);
        }
    }

    
}