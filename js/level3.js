var plasticImg, plastic;
var crosshair;
var plastic;
var seaImage;
var score = 0;
var gameOver;
function level3preload() {
  seaImage = loadImage('assets/backgrounds/sea.jpg');
  plasticImg = loadImage('assets/water.png')
}

function level3setup() {
	createCanvas(720,405);
  crosshair = createSprite(0,0,5,5);
  spawnScrap();
}

function drawLevel3() {
  background(seaImage);
  text("Score: " + score, 20,20);
  if (mouseIsPressed) {
    if (mouseButton==LEFT) {
      if(crosshair.overlap(plastic)){
				plastic.lifetime = 0;
				spawnScrap();
				score++;
  		}
    }
  }
  if (plastic.y>=200) {
    plastic.lifetime = 0;
    if (score>0) {
      score--;
    }
    spawnScrap();
  }
  if(score >= 15){
    gameOver = true;
		textAlign(CENTER);
		textSize(21);
		
    text(`Nice! You recycled enough water bottles\nand saved the ocean from warming too much.\n`, width/2, height/2 - 20);

    setInterval(() => {window.location = "end.html";}, 5000);
  }
  movement();
  noCursor();
  drawSprites();
}

function movement(){
  crosshair.x=mouseX;
  crosshair.y=mouseY;
}
function spawnScrap(){
	if (!gameOver) {
		if (score<16) {
			plastic = createSprite(0,0,20,20);
			plastic.addImage(plasticImg);
			plastic.x = Math.round(random(20,720));
			plastic.y = -20;
			plastic.addImage(plasticImg);
			if (score<=5) {
				if (plastic.x>360) {
					plastic.setVelocity(Math.round(random(-1,-3)),Math.round(random(2,4)));
				}
				else {
					plastic.setVelocity(Math.round(random(1,3)),Math.round(random(2,4)));
				}
			}
			else if(score<=10) {
				if(plastic.x>360) {
					plastic.setVelocity(Math.round(random(-2,-4)),Math.round(random(3,5)));
				} else {
					plastic.setVelocity(Math.round(random(2,4)),Math.round(random(3,5)));
				}
			} else {
				if (plastic.x>360) {
					plastic.setVelocity(Math.round(random(-3,-5)),Math.round(random(4,6)));
				} else {
					plastic.setVelocity(Math.round(random(2,4)),Math.round(random(4,6)));
				}
			}
		}
	}
}