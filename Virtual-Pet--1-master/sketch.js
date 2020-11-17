//Create variables here
var foodS,databse,dogImg,HappyDogImg,dog,foodStock,dogHappy;
var addFood,lastFed,feed,fedTime,foodObj,hour;
var ground;


function preload()
{
	//load images here
  dogImg = loadImage("images/dogImg.png");
  HappyDogImg = loadImage("images/dogHappy.png");

}

function setup() {
	createCanvas(800, 600);
  dog = createSprite(400,500,50,50);
  dog.scale = 0.15;
  dog.addImage("dogImg",dogImg);
  dogHappy = createSprite(400,500,50,50);
  dogHappy.scale = 0.15;
  dogHappy.addImage("HappyDogImg",HappyDogImg);
  dogHappy.visible = false;
  database = firebase.database();
  foodObj = new Food();
  foodObj.getFoodStock();
  
  feed = createButton('FEED');
  feed.position(400,100);

  addFood = createButton('add food');
  addFood.position(450,100);
  
  ground = createSprite(400,560,800,10);
  ground.visible = false;

  fedTime = database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed = data.val()
  })
  
}


function draw() {  
  background(rgb(46,139,87));

  dogHappy.velocityY = dogHappy.velocityY =0.8;
  dogHappy.collide(ground);



  feed.mousePressed(()=>{
    feedDog()
  })
  addFood.mousePressed(()=>{
    foodObj.foodStock = foodObj.foodStock + 1,
    foodObj.OFF(),
    foodObj.display()
  })
  
  foodObj.display();
  drawSprites();
  //console.log(foodObj.foodStock)
  textSize(15);
  fill('white')
  text("NOTE: 1 bottle = 2 foodStock",350,30)
  text("Cuurent FoodStock: "+ foodObj.foodStock,350,60)

  if(lastFed>=12){
    text("Last Fed: "+lastFed%12+"PM",350,90)
  }else if(lastFed==0){
    text("Last Fed: 12 AM",350,90)
  }else{
    text("Last Fed: "+lastFed+"AM",350,90)
  }


}
 

function readStock(data){
  foodS= data.val();
  foodObj.updateFoodStock(foodS);
  foodObj.foodStock = foodS;
}
async function getTime(){
    var response = await fetch("https://worldtimeapi.org/api/timezone/Asia/Delhi"); 
    var responseJSON = await response.json();
    var dateTime = responseJSON.datetime;
    
    
}
function feedDog(){
  foodObj.deductFood();
  foodObj.ON();
  database.ref('/').update({
    FeedTime:hour()
  })
}

