class EnemyRed extends Enemy {

    constructor(_x, _y, _health, _speed){
        super(_x, _y, _health, _speed)
        
        this.shootSpeed = 100;
        
        this.sprite.addAnimation('walking', 'Assets/Lava/NewLava1.png', 'Assets/Lava/NewLava2.png')
    }   

    shoot(){

        this.shootSpeed--;
        if(this.shootSpeed <= 0){
            enemyBulletsFired.push(new Bullet(this.pos.x, this.pos.y, 1, 0, 5, 5));
            enemyBulletsFired.push(new Bullet(this.pos.x, this.pos.y, -1, 0, 5, 5));
            enemyBulletsFired.push(new Bullet(this.pos.x, this.pos.y, 0, 1, 5, 5));
            enemyBulletsFired.push(new Bullet(this.pos.x, this.pos.y, 0, -1, 5, 5));
            
            this.shootSpeed = 100;
        }

    }
}