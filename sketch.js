var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score=0;
var survivalTime=0;
var backGround,bbgg;
 var PLAY=1,END=0;
var gameState=PLAY;
var monkeyCollided;

function preload(){
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
  bbgg=loadImage("forest.png");
  monkeyCollided=loadImage("sprite_5.png");
}

function setup() {
  createCanvas(450,400);
  
 ground=createSprite(312,400,628,20);

 
  monkey=createSprite(80,150,20,40);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale=0.1;
  
  FoodGroup = new Group();
  obstacleGroup = new Group();

  backGround=createSprite(200,200,555,470);
  backGround.depth=monkey.depth;
  backGround.depth=backGround.depth-1;
  backGround.addImage(bbgg);
  backGround.velocityX=-5
}


function draw() {
  background("skyblue");
   console.log(frameCount);
  monkey.collide(ground);
 
  monkey.velocityY =monkey.velocityY + 0.8;
  switch(score){
    case 10:monkey.scale=0.12;
            break;
    case 20:monkey.scale=0.14;
            break;
    case 30:monkey.scale=0.16;
            break;
    case 40:monkey.scale=0.18;
            break;
    case 50:monkey.sacle=0.2;
            break;
    case 60:monkey.scale=0.22;
             break;
    default: break;
            
  }
  
 drawSprites();
  
  if(gameState===PLAY){
    when_the_gameState_is_play();
}else if(gameState===END){
    when_the_gameState_is_end();
}
  
  fruits();
   obstacles()

  
  
  stroke("white");
  textSize(20);
  fill("black");
  strokeWeight(5);
  text("TOTAL BANANAS :  "+score,30,50);
  
  
  stroke("white");
  textSize(20);
  fill("black");
  textStyle(BOLD); 
  strokeWeight(5);
  text("SURVIVAL TIME :  "+survivalTime,30,80);
}

function fruits(){
  if(frameCount%80===0){
    banana=createSprite(500,100,20,20);
    banana.y=Math.round(random(220,300));
    banana.addImage(bananaImage);
    banana.velocityX=-5;
    banana.lifeTime=90;
    banana.scale = 0.1;
    FoodGroup.add(banana);
  }
  
}
  function obstacles(){
    if (frameCount % 300 === 0) {
    obstacle = createSprite(500,363, 10, 10);
    obstacle.addImage("obstacle", obstaceImage);
    obstacle.velocityX = -10
    obstacle.scale = 0.15;
    obstacle.lifetime=45;
   obstacle.depth=monkey.depth;
      obstacle.depth=obstacle.depth-1;
    obstacleGroup.add(obstacle);
  }
  } 
  function when_the_gameState_is_play(){
    if(FoodGroup.isTouching(monkey)){
    FoodGroup.destroyEach()
    score=score+1;
  }
     while (backGround.x <190){
      backGround.x = backGround.width/2;
    }
  if(keyDown("space")&& monkey.y >= 250) {
        monkey.velocityY = -12;
     
    }
    survivalTime=Math.ceil(Math.round(frameCount)/10);
    if(obstacleGroup.isTouching(monkey)){
      gameState=END;
     
    }
  }
function when_the_gameState_is_end(){
       backGround.velocityX=0;
  obstacleGroup.setVelocityXEach(0);
  FoodGroup.setVelocityXEach(0);
  FoodGroup.destroyEach();
  textSize(40);
  fill("black");
    strokeWeight(5);
  text("GAME OVER !!",100,200);
  obstacleGroup.setLifetimeEach(-1);
  FoodGroup.setLifetimeEach(-1);    
    monkey.scale=0.1;
    }