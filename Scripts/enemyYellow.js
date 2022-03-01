class EnemyYellow extends Enemy {

    constructor(_x, _y, _health, _speed){
        super(_x, _y, _health, _speed)
        this.count = 0;
        this.sprite.addAnimation('walking', 'Assets/mummy/NewMummy2.png')

    }

        move(){
            this.count++;

            if( this.count<100){
                this.pos.x += this.movementSpeed;
            }
            else if( this.count>100 &&  this.count<200){
                this.pos.y-= this.movementSpeed;
            }
            else if( this.count>200 &&  this.count<300){
                this.pos.x-= this.movementSpeed;
            }
            else if( this.count>300 &&  this.count<400){
                this.pos.y+= this.movementSpeed;
            }
            if( this.count>400){
                this.count = 0;
            }
            
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
    

            this.sprite.position = this.pos;



        }

        
}