//https://console.firebase.google.com/u/0/project/air-balloon-92d62/database/air-balloon-92d62-default-rtdb/data

var balloon,bgimage,balloonImage2,balloonImage3,balloonImage4;
var database,balloonPosition;

function preload(){
bgimage=loadImage("Hot Air Ballon-01.png");
balloonImage2=loadAnimation("Hot Air Ballon-02.png")
balloonImage3=loadAnimation("Hot Air Ballon-03.png")
balloonImage4=loadAnimation("Hot Air Ballon-04.png")
}

function setup() {
  createCanvas(1000,500);

  
 database=firebase.database();
 balloon=createSprite(400, 500, 50, 50);
 //add animation here and change the scale
 balloon.addAnimation("hotAirBalloon",balloonImage4);
 balloon.scale=0.5
 balloonPosition=database.ref('balloon/height');
 balloonPosition.on("value",readPosition,showError);
 


  

}

function draw() {
  background(bgimage);
  
  if(keyDown(LEFT_ARROW)){
    updateHeight(-10,0);
     //add animation  
     balloon.addAnimation("hotAirBalloon",balloonImage4) 
  }
  else if(keyDown(RIGHT_ARROW)){
    updateHeight(10,0);
    //add animation 
    balloon.addAnimation("hotAirBalloon",balloonImage4);
 }
 else if(keyDown(UP_ARROW)){
  updateHeight(0,-10);
  balloon.addAnimation("hotAirBalloon",balloonImage2)
  balloon.scale=balloon.scale-0.005
  
  }
else if(keyDown(DOWN_ARROW)){
  updateHeight(0,10);
  balloon.addAnimation("hotAirBalloon",balloonImage3)
  balloon.scale=balloon.scale+0.005
 }
drawSprites();
textSize(20);
fill("black");
text("Use Arrow Keys To Move The Hot Air Balloon",100,100);


}
// pass data as an argument in this function
function readPosition(data){
  height=data.val();
  balloon.x=height.x
  balloon.y=height.y
}

function showError(){
  console.log("Error is writting to the database")
}

function updateHeight(x,y){
  database.ref('balloon/position').set({
    'x': height.x + x,
    'y': height.y + y
  })
}
