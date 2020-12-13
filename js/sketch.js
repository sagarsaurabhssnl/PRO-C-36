//Create variables here
var dogImg, dogimg, dogHappyImg, dog, milkImg, stock = [], lastFed = "not fed";
var dogImgNum = 0;
var database;
var reffoodtime, refmoney, reffood;
var foodtime = "loading...", money = "loading...", food = "loading...", foodtimetext = "loading...";
var date = new Date();
var hours = date.getHours();
var minutes = date.getMinutes();
var sec = date.getSeconds();
var time;
var timer = 100;
var eventlistener = sec;
var keypress = 0;
var latFed;
var x = 500;
var y = 103;
var foodExist = 0;
var feedMilk;
var refMilkStock;
var button1, button2;

function preload() {
  dogimg = loadImage("images/dog.png");
  dogHappyImg = loadImage("images/happydog.png");
  milkImg = loadImage("images/milk.png");
}

function setup() {
  translate(0, 0);
  database = firebase.database();
  createCanvas(800, 600);
  dogImg = dogimg;
  dog = createSprite(200, 300);
  dog.scale = 0.5;
  reffood = new Feed();
  reffoodtime = new Foodtime();
  refmoney = new Money();
  reffood.config();
  reffoodtime.config();
  refmoney.config();
  reffoodtime.change(1);
  button1 = createButton('FEED');
  button1.position(750, displayHeight * 0.025);
  button2 = createButton('ADD FOOD');
  button2.position(650, displayHeight * 0.025);
}

function draw() {
  background("cyan");
  date = new Date();
  hours = date.getHours();
  minutes = date.getMinutes();  
  sec = date.getSeconds();
  time=hours+":"+minutes+":"+sec;
  if (eventlistener !== sec) {
    timer = timer - 1
  }
  eventlistener = sec;
  dog.addImage(dogImg);
  fill("#730016");
  rect(480, 70, 310, 470);
  drawSprites();
  push();
  stroke(5);
  textSize(20);
  text("Press FEED button to feed the dog", 250, 20);
  if (money === 0) {
    text("You have no money to buy, Wait for pocket money!", 200, 590);
  } else if (food < 100) {
    text("Press ADD FOOD button to buy some food", 220, 590);
  }
  if (food === 100) {
    text("You are out of space!", 500, 560);
  }
  text("Food left: " + food, 320, 50);
  text("Money left: " + money, 600, 50);
  text("Food time: " + foodtimetext, 10, 50);
  text("Last Fed: " + lastFed, 10, 80);
  text("Pockey Money Time: " + timer, 10, 20);
  pop();
  text("Press R to reload the page", 20, 570);
  text("Press C to get the code", 20, 590);
  dogImgnum();
  foodTime();
  resetTimer();
  button1.mousePressed(() => {
    if (foodtime === 1 && food > 0) {
      if (keypress === 0) {
        lastFed=time;
        keypress = 1;
        upKey(-1);
      }
    }
  });
  button2.mousePressed(() => {
    if (money > 0) {
      downKey(1);
    }
  });
}

function keyPressed() {
  if (keyCode === 67) {
    codelink();
  }
  if (keyCode === 82) {
    reload();
  }
}

function dogImgnum() {
  if (dogImgNum === 0) {
    dogImg = dogimg;
  } else if (dogImgNum === 1) {
    dogImg = dogHappyImg;
  }
}

function foodTime() {
  reffoodtime.config();
  if (foodtime === 1) {
    foodtimetext = "yes";
  } else if (foodtime === 0) {
    foodtimetext = "no";
  }
}

function upKey(l) {
  if (food % 1 === 0) {
    if (l !== 1) {
      feedMilk = createSprite(80, 400);
      feedMilk.addImage(milkImg);
      feedMilk.scale = 0.1;
      foodExist = 0;
      dogImgNum = 1;
      food = food + l;
      reffood.change(food);
      reffoodtime.change(0);
      setTimeout(function () {
        dogImgNum = 0;
        reffoodtime.change(1);
        feedMilk.destroy();
        keypress = 0;
      }, 5000);
      console.log("timer1");
    }
  }
}

function downKey(l) {
  if (food % 1 === 0 && food < 100) {
    if (l === 1) {
      foodExist = 0;
      food = food + l;
      money = money - 1;
      reffood.change(food);
      refmoney.change(money);
    }
  }
}

function codelink() {
  window.location.href = "https://github.com/sagarsaurabhssnl/PRO-C-36";
}

function reload() {
  window.location.reload(false);
}

function resetTimer() {
  if (timer <= 0) {
    timer = 100;
    money = money + 5;
    refmoney.change(money);
  }
}
