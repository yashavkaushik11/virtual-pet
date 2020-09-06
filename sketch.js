//Create variables here
var dog, dogimg, happyDog;
var database;
var foodS, foodStock;

function preload()
{
  //load images here
  dogimg = loadImage("images/dogImg.png");
  happyDog = loadImage("images/dogImg1.png");
}

function setup() {
  createCanvas(500, 500);
  dog = createSprite(250,300);
  dog.addImage(dogimg);
  dog.scale = 0.15;

  database = firebase.database();
  foodStock = database.ref('Food');
  foodStock.on('value', readStock);
  
}


function draw() {  
  background(46, 139, 87);

  if(keyWentDown(UP_ARROW)) {
    
    writeStock(foodS);
    dog.addImage(happyDog);
  }
  
  drawSprites();
  //add styles here
  textSize(15);
  fill(0,0,255);
  stroke(10);
  text("Note : Press UP_ARROW to feed the dog", 125, 50);

  textSize(15);
  fill(0,0,255);
  stroke(10);
  text("Food Remaining :" + foodS, 175, 200);


}

function readStock(data) {
  foodS = data.val();
}

function writeStock(x) {

  if(x <= 0) {
    x = 0;
  } else {
    x = x + 1;
  }

  database.ref('/').update({
    Food:x
  })

}

