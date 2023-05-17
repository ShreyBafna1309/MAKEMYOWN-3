var gameState = "play"
var score;
var invisibleBlock;

function preload(){
    spaceImg = loadImage("space.jpg");
    player = loadImage("shooter.png");
    meteorImg = loadImage("meteor.png");
}

function setup() {
    createCanvas(400,400);

    space = createSprite(200,200);
    space.addImage(spaceImg);
    space.velocityY = 1;
    
    shooter = createSprite(200,350);
    shooter.addImage(player);

    bulletGroup = new Group();
    meteorGroup = new Group();
    invisibleBlockGroup = new Group();

    score = 0;
}

function draw(){
    background(200);
    text("Score: " + score,190,50);
    if(gameState === "play"){
        if(space.y > 200){
            space.y = 100; 
        }

        if(keyDown("right_arrow")){
            shooter.x += 3
        }

        if(keyDown("left_arrow")){
            shooter.x -= 3
        }

        if(keyDown("space")){
            var bullet = createSprite(shooter.x,shooter.y,10,20);
            bullet.velocityY = -2;
            bulletGroup.add(bullet);
        }

        if(invisibleBlockGroup.isTouching(bulletGroup)){
            meteorGroup.destroyEach();
            bulletGroup.destroyEach();
            invisibleBlockGroup.destroyEach();
            score += 5;
        }

        if(invisibleBlockGroup.isTouching(shooter)){
            gameState = "end";
        }
        spawn_meteor();
      }
        drawSprites();
        if(gameState === "end"){
            background("black");
            meteorGroup.destroyEach();
            bulletGroup.destroyEach();
            invisibleBlockGroup.destroyEach();
            space.velocityY = 0;
            shooter.destroy();
            fill("white");
            textSize(20);
            text("You have lost the game!",100,200);
            text("Score: " + score,160,250)
        }
    }

function spawn_meteor(){
    if(frameCount % 200 === 0){
        meteor = createSprite(200,-50);
        meteor.addImage(meteorImg);
        meteor.scale = 0.2;
        meteor.velocityY = 2;
        meteor.lifetime = 500;
        meteor.position.x = Math.round(random(50,350));
        meteorGroup.add(meteor);

        invisibleBlock = createSprite(meteor.x,15,100,2);
        invisibleBlock.velocityY = 2;
        invisibleBlock.lifetime = 500;
        invisibleBlock.visible = false;
        invisibleBlockGroup.add(invisibleBlock);

        shooter.depth = meteor.depth
        shooter.depth += 1
    }
}