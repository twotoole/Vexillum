//credit to kobo164 @ https://www.youtube.com/watch?v=5xrzDfFUNNs&list=PLNJ4HelF6jHYIxjEj4GfgIQeeG7Q1wweo&index=12
//for the sweet Chopin 8bit remix

//flagcdn does not include every independant country.

var countryIndex = [];
var index;
var flagImg;
var flagImages = [];

var level;
var maxHealth = 3;
var health;

var minEnemies = 5;
var maxEnemies = 10;

var heartSprite;


//Pixilate Stuff
var size = 7 // element size
var startx = 0 // starting x coordinate
var starty = 0

var playerSpriteSheet;
var playerSpriteData;
var playerSpriteArray = [];
var player;

var bulletsFired = [];
var enemyBulletsFired = []

//shoot runs in setup
var shootInvterval = 100;
var shootSound;
var enemyDeathSound;
var hitSound;

var BackgroundAudio;

var enemies = [];

var gameState = 0;
var tombstone;

var bitFont;

function preload()
{
    //create array of all flag images
    for(var i = 0;i<countryCode.length;i++){
        flagImages[i] = loadImage(src="https://flagcdn.com/w640/"+countryCode[i]+".png");
    }
    //create array to index all flag codes
    for(var i=0; i<countryCode.length;i++)
    {
        countryIndex[i] = i;
    }
    //preload all spriteSheets for player
    playerSpriteData = loadJSON('json/PlayerSprite.JSON');
    playerSpriteSheet = loadImage('Assets/PlayerSprite/playerSpriteSheet.png');

    BackgroundAudio = loadSound('Assets/sounds/Torrent.mp3');

    heartSprite = loadImage('Assets/Heart/heart.png');

    tombstone = loadImage('Assets/Tombstone.png');

    bitFont = loadFont('Assets/C&C Red Alert [INET].ttf');

}

function setup() {
    //create first flag screen
    index = floor(random(0, countryCode.length));
    var code = countryCode[index];
    var name = countryName[index];
    flagImg = flagImages[index];
    //remove country that's been used
    countryCode.splice(index, 1);
    countryName.splice(index, 1);
    countryIndex.splice(index, 1);
    flagImages.splice(index, 1);

    createCanvas(flagImg.width, flagImg.height);
    
    level = 0;
    
    player = new Player(width/2, height/2, 25, 25, 5);
    health = 3;
    
    for(var i=0; i<playerSpriteData.frames.length; i++)
    {
        playerSpriteArray[i] = playerSpriteData.frames[i].position;
    }
    setInterval(shoot, shootInvterval);
    
    BackgroundAudio.loop(0, 1, 0.2);
  }

function draw()
{
    if(gameState === 0)
    {
    if(level >= 1 && enemies.length === 0){
        newLevel();
    }
    
    resizeCanvas(flagImg.width, flagImg.height);
    frameRate(60);
    background(255);
    flagImg.loadPixels();
    image(flagImg,0, 0, flagImg.width, flagImg.height);

    
    if(enemies.length === 0){
        level++
        generateEnemies(minEnemies, maxEnemies);
    }

//    Pixelate(flagImg); 

    player.draw();
    player.move();
    player.iterateAnimations();
    player.hitDetect();

    for(let i=0; i<enemies.length; i++){
        enemies[i].move();
        enemies[i].hitDetect();
        enemies[i].shoot();
    }
    checkEnemyDead();
    bullets();
    enemyBullets();
    drawSprites();

    Progression();

}
if(gameState === 1){
    gameOver();
}
    

}

function Pixelate(_img) //https://editor.p5js.org/Andrew_Sink/sketches/YM-Ply_cD
{
    let size  =  8; 
  
    for (var starty = 0; starty < flagImg.height; starty++) 
    { 
      for (var startx = 0; startx < flagImg.width; startx++) 
      {
        var index = (startx + starty * flagImg.width) * 4;
        var r = flagImg.pixels[index + 0];
        var g = flagImg.pixels[index + 1];
        var b = flagImg.pixels[index + 2];
  
        noStroke(); 
        fill(r,g,b) 
        rect(startx, starty, size, size)
        startx = startx + size -1 // set new startx value
      }
      starty = starty + size -1 // set new starty value
    }
}



//https://editor.p5js.org/carrefinho/sketches/Sk7ZvoMn7
function shoot(){
		if (mouseIsPressed){
			let mouseVector = getMouseVector();
			oneBullet = new Bullet(player.pos.x + 8, player.pos.y + 12, mouseVector.x, mouseVector.y, 5, 5);
			bulletsFired.push(oneBullet);
		}
}

//https://editor.p5js.org/carrefinho/sketches/Sk7ZvoMn7
function getMouseVector(){
	let mouseXalt = mouseX - player.pos.x;
	let mouseYalt = mouseY - player.pos.y;
	let mouseDir = createVector(mouseXalt, mouseYalt);
	mouseDir.normalize();
	return mouseDir;
}

function bullets(){
    for (var i = 0; i < bulletsFired.length; i++){
		bulletsFired[i].draw();
		bulletsFired[i].update();
        if (bulletsFired[i].outOfBounds()){
            bulletsFired.splice(i,1);
        }
    }
}

function enemyBullets(){
    for(var i=0; i<enemyBulletsFired.length; i++){
        enemyBulletsFired[i].draw();
        enemyBulletsFired[i].update();
        if (enemyBulletsFired[i].outOfBounds()){
            enemyBulletsFired.splice(i,1);
        }
    }
}


function checkEnemyDead(){
    for(var i=0; i<enemies.length; i++){
        if(enemies[i].isDead === true){
            enemies.splice(i,1);
        }
    }
}

function newLevel(){
    if(enemies.length === 0){
        index = floor(random(0, countryCode.length))
        var code = countryCode[index];
        var name = countryName[index];
        flagImg = flagImages[index];

        countryCode.splice(index, 1);
        countryName.splice(index, 1);
        countryIndex.splice(index, 1);
        flagImages.splice(index, 1);

        if(health<maxHealth){
            health++
        }
        if(level % 10 === 0){
            maxHealth++;
            health = maxHealth;
        }
        if(level % 5 ===0){
            minEnemies++
            maxEnemies++
        }

    }
}

function generateEnemies(_min, _max){
    let n = int(random(_min, _max))

    // pushes polled colours into enemeies array
    for(var i=0; i< n; i++){
        //poll random pixel in flag
        let p = createVector(random(width), random(height));
        //assign pixel location
        let c = get(p.x, p.y);
        //if polled pixel is black
        if(brightness(c) <20)
        {
            enemies.push(new EnemyBlack(p.x, p.y, 1, random(1, 3)));
            //  console.log('black Polled  ' + '@   ' + p + '  for  ' + i + "  hue:" + hue(c));
        }
        //if pixel is blue
        else if(hue(c) <= 290 && hue(c) > 170 )
        {
            enemies.push(new EnemyBlue(p.x, p.y, 1, random(1, 3)));
            //  console.log('blue Polled  ' + '@   ' + p + '  for  ' + i + "  hue:" + hue(c));
        }
        //if pixel is green
        else if(hue(c) <= 170 && hue(c) >80 )
        {
            enemies.push(new EnemyGreen(p.x, p.y, 1, random(1, 3)));
            //  console.log('green Polled  ' + '@   ' +p + '  for  ' + i + "  hue:" + hue(c));
        }
        //if pixel is yellow
        else if(hue(c) <= 80 && hue(c) >20 )
        {
            enemies.push(new EnemyYellow(p.x, p.y, 1, random(1, 3)));
            //  console.log('yellow Polled  ' + '@   ' + p + '  for  ' + i + "  hue:" + hue(c));
        }
        //if pixel is red
        else if(hue(c) <= 360 && hue(c) > 290 || hue(c) > 0 && hue(c) <= 20)
        {
            enemies.push(new EnemyRed(p.x, p.y, 1, random(1, 3)));
            // console.log('red Polled  ' + '@   ' + p + '  for  ' + i + "  hue:" + hue(c));
        }
        //if pixel is white
        else if(brightness(c) > 90 && hue(c) <= 5)
        {
            enemies.push(new EnemyWhite(p.x, p.y, 1, random(1, 3)));
            // console.log('white Polled  ' + '@   ' + p + '  for  ' + i + "  hue:" + hue(c));
        }
        // else{
        //     console.log('nothing polled  ' + '@   ' + p + '  for  ' + i);

        // }
        
    }
}


function Progression(){
    for(var i=0;i<health;i++){
        image(heartSprite, (width-heartSprite.width) - i * heartSprite.width, 10);
    }

    if(health === 0 ){
        gameState = 1;
    }

}

function gameOver(){
    BackgroundAudio.pause();
    background(0);    
    image(tombstone, 0, 0);
    textSize(30);
    textFont(bitFont);
    fill(0)

    text(level, 330, 232);
}
