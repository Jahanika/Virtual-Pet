var dog;
var happyDog;
var database;
var foodS;
var foodStock;
var lastFeedTime;

function preload(){
  dogImg = loadImage("images/dogImg.png");
  dog2Img = loadImage("images/dogImg1.png");
}

function setup() {
  lastFeedTime= 0
  var canvas = createCanvas(500,500);  
  database=firebase.database()
  var ref=database.ref("food")
  ref.on("value",(data)=>{
    foodStock = data.val()
  })
  feed=createButton("Feed the dog");
  feed.position(400,95)
  feed.mousePressed(feedDog)

  addFood=createButton("Add Food");
  addFood.position(600,95);
  addFood.mousePressed(addFoods);
}


function draw() {  
  background("green")
  textSize(30)
  fill("white")
  text("Food Remaining:"+foodStock, 100,200)
  text("Last fed time:"+lastFeedTime, 100,400)
  console.log(foodStock)
  image(dogImg,100,200,150,150)
  drawSprites();
  //add styles here
  if(keyWentDown(UP_ARROW)){
    writeStock(foodStock-1);
  }
}

function writeStock(foodStock){
  var ref = database.ref("/")
  ref.update({food:foodStock})
}

function feedDog(){
  if(foodStock>0){
    writeStock(foodStock-1)
    var time = new Date().getHours()
    console.log(time)
    lastFeedTime=time 
  }
  
}

function addFoods(){
  writeStock(foodStock+1)
}
