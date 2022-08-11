var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"
var score = 0;

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;

  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();
  
  ghost=createSprite(200,350,60,60)
  ghost.addImage("ghostStand",ghostImg)
  ghost.scale=.45
}

function draw() {
  background(200);

  if(gameState == "play"){
 


  if(tower.y > 400){
      tower.y = 300
    }
    if(keyDown("left_arrow")){
     ghost.x=ghost.x-3
    }
    if(keyDown("right_arrow")){
      ghost.x=ghost.x+3
     }
     if(keyDown("space")){
      ghost.velocityY =-10
     }
     ghost.velocityY = ghost.velocityY + 0.8

     if(climbersGroup.isTouching(ghost)){
      ghost.velocityY = 0;
    }

    if(invisibleBlockGroup.isTouching(ghost) || ghost.y > 600){
      ghost.destroy();
      gameState = "end"
    }
    drawSprites();

       
    fill("white")
    text("Score:"+score,300,50)

    if(frameCount%1==0){
      score += 1
    }
    spawnDoors()
  }

    if(gameState == "end"){
      //spookySound.play();
      stroke("red");
      fill("orange");
      textSize(30);
      text("Game Over", 230,250)
    }
  
  
   
  }

  function spawnDoors(){
    if (frameCount % 360 === 0){
      var door = createSprite(200,-50)
var climber = createSprite(200,10)
door.x = Math.round(random(120,400))
var invisibleBlock = createSprite(200,15);

invisibleBlock.width = climber.width;
invisibleBlock.height = 2;
invisibleBlock.velocityY=1
invisibleBlock.visible= false
climber.x = door.x
invisibleBlock.x = door.x;
door.addImage(doorImg);
climber.addImage(climberImg);

door.velocityY=1
climber.velocityY=1

ghost.depth = door.depth;
ghost.depth +=1;
   
  //assign lifetime to the variable
  door.lifetime = 800;
  climber.lifetime = 800;
  invisibleBlock.lifetime = 800;
  //add each door to the group
  doorsGroup.add(door);
  invisibleBlock.debug = true;
  climbersGroup.add(climber);
  invisibleBlockGroup.add(invisibleBlock);
  
    }
  }

    