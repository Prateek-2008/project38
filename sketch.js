//to create variable
var PLAY = 1;
var END = 0;
var gameState = 1;


var monkey,monkeyImage,monkeyCollided,monkeyImage2;
var obstacle,obstacleImage,obstacleGroup;
var banana,bananaImage,bananaGroup;
var ground;
var Lives = 2;
var survivalTime=0;
var score = 0;
var background,backgroundImage;

function preload(){
  
  //to load images
  monkeyImage = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  monkeyImage2 = loadImage("sprite_3.png");
  
  backgroundImage = loadImage("jungle.png")
  monkeyCollided = loadAnimation("sprite_0.png");
  
  obstacleImage = loadImage("obstacle.png");
  bananaImage = loadImage("banana.png");

 
}



function setup() {
  
  //to create canvas
  createCanvas(400,400);

  camera.position.x=100;
  camera.position.y=height/2;
  
  
  
  survivalTime = 0;
  score = 0;
  
  background = createSprite(200,200,600*100,600);
  background.addImage(backgroundImage)
  //background.velocityX = -(3+3*score/10);
  background.x = background.width/2;

  //to create monkey sprite
  monkey = createSprite(camera.position.x,camera.position.y,20,20);
  monkey.addImage("standing",monkeyImage2);
  monkey.addAnimation("running",monkeyImage);
  monkey.addAnimation("monkey",monkeyCollided);
  monkey.scale = 0.1;
  
  
  
  
  
  //to create ground sprite
  ground = createSprite(400,380,1100,20);
  //ground.velocityX = -(3+3*score/10);
  ground.x = ground.width/2;
  
  //to create group 
  bananaGroup = createGroup();
  obstacleGroup = createGroup();
  
  
  
}


function draw() {
  
  //to clear te background
  //background("blue");
  
  
  
  if (gameState === PLAY){
    
    if(keyIsDown(RIGHT_ARROW)){
      camera.position.x+=10;
      monkey.x+=10;
      monkey.changeAnimation("running",monkeyImage);
    }
    
    if (camera.x < 0){
      camera.x = 200;
    }

    console.log(camera.position.x);
    
    if(bananaGroup.isTouching(monkey)){
      bananaGroup.destroyEach();
      score = score+2;
    }
    
    survivalTime=Math.ceil(frameCount/frameRate());
    
    bananas();
    obstacles();
    
    //jump the monkey when space is press
    //if(keyDown("space")&& monkey.y >=100) {
      //monkey.velocityY = -13
    //}
    
    // to give gravity to the monkey
    //monkey.velocityY = monkey.velocityY + 0.8;

    
    
    switch(score){
       case 10: monkey.scale = 0.12;
           break;
       case 20: monkey.scale = 0.14;
           break;
       case 30: monkey.scale = 0.16;
           break; 
       case 40: monkey.scale = 0.18;
           break;      
       case 50: monkey.scale = 0.20;
           break;
       case 60: monkey.scale = 0.22;
           break;
       case 70: monkey.scale = 0.24;
           break; 
       case 80: monkey.scale = 0.26;
           break;
       default: break;       
    }
    
    if(obstacleGroup.isTouching(monkey)){
      Lives = Lives-1;
      obstacleGroup.destroyEach();
      monkey.scale = 0.1;
    }
    
    if(monkey.x=600){
      gameState = END;
    }
     
  }
  if(gameState === END){
    ground.velocityX = 0;
    background.velocityX = 0;
    
    monkey.velocityY = 0;
    monkey.changeAnimation("monkey",monkeyCollided)
    
    obstacleGroup.setVelocityXEach(0);
     bananaGroup.setVelocityXEach(0);
    
    bananaGroup.setLifetimeEach(-3)
    obstacleGroup.setLifetimeEach(-3);
    
    monkey.y = 345;
    
  }
  
  //to collide the monkey with the ground
  monkey.collide(ground);
  
  ground.visible = false;
  
  //to draw the sprites
  drawSprites();
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Lives: "+Lives,165,90);
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Survival Time: "+ survivalTime,140,50);
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score,165,70);
  
}

function bananas(){
  if (frameCount % 80 === 0){
    banana = createSprite(400,150,20,20);
    banana.addImage("banana",bananaImage);
    banana.y = Math.round(random(120,200));
    banana.velocityX = -(3+3*score/50);
    banana.lifetime = 200;
    banana.scale = 0.1
    bananaGroup.add(banana);
  }
}

function obstacles(){
  if(frameCount % 300 === 0){
    obstacle = createSprite(400,350,25,25);
    obstacle.addImage("obstacle",obstacleImage);
    obstacle.velocityX = -(3+3*score/50);
    obstacle.lifetime = 200;
    obstacleGroup.add(obstacle);
    obstacle.scale = 0.1;
  }
}