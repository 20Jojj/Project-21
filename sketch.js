var backImg, back;
var venomImg, venom, venomGroup;
var spidermanImg, spidermanImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"



function preload(){

    backImg = loadImage("back.png");
    venomImg = loadImage("venom.png");
    spidermanImg = loadImage("2.png");
    music = loadSound("music.wav");

}

function setup() {
    createCanvas(windowWidth, windowHeight); 
    music.loop();
    back = createSprite(300,300);
    back.addImage("back",backImg);
    back.velocityY = 1;


    venomGroup = new Group();
    invisibleBlockGroup = new Group();

    spiderman = createSprite(200,200,25,25);
    spiderman.scale = 0.6;
    spiderman.addImage("spiderman", spidermanImg);
 
}

function draw() {
  background(225);

  if(gameState === "play") {
    
     if(back.y > 400 ){
         back.y = 300
     }

  if(keyDown("left_arrow")){
      spiderman.x = spiderman.x - 3;
  }

   if(keyDown("right_arrow")){
       spiderman.x = spiderman.x + 3;
   }

   if(keyDown("space")){
  
    spiderman.velocityY = -10;
 
    }

    spiderman.velocityY = spiderman.velocityY + 0.8;

    spawnVenom();

    if(venomGroup.isTouching(spiderman)){
        spiderman.velocityY = 0;
      }
      if(invisibleBlockGroup.isTouching(spiderman) || spiderman.y > 800){
        spiderman.destroy();
        gameState = "end"
      }
      
      drawSprites();
  }
 
  if (gameState === "end"){
    stroke("red");
    fill("red");
    textSize(30);
    text("Game Over", 250,400)
  }
}


function spawnVenom(){
    if(frameCount % 240 === 0){
        var venom = createSprite(200,-40);
        venom.scale = 0.8;
        var invisibleBlock = createSprite(200,-35);
        invisibleBlock.visible = false;
        invisibleBlock.debug = false;
        invisibleBlock.width = venom.width;
        invisibleBlock.height = 170,-35;
        venom.x = Math.round(random(120,400))
        invisibleBlock.x = venom.x
        venom.addImage(venomImg);

        venom.velocityY = 1;
        invisibleBlock.velocityY = 1;

        
        spiderman.depth = venom.depth;
        spiderman.depth += 1;

        venom.lifetime = 800;
        invisibleBlock.lifetime = 800;


        venomGroup.add(venom);
        invisibleBlockGroup.add(invisibleBlock);
    }
}
