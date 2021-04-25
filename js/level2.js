var score = 0;
var backgroundIce, backgroundIceImage;

var iceFrameCount;

var iceLevel = 0;
var iceSprites;
var iceImage1, iceImage2, iceImage3, iceImage4, iceImage5;

var lightningboltCount = 0;
var lightningbolt1, lightningbolt2, lightningboltImage;


function level2preload() {
	backgroundIceImage = loadImage("assets/backgrounds/ice.png");

	iceImage1 = loadImage("assets/ice/ice1.png");
	iceImage2 = loadImage("assets/ice/ice2.png");
	iceImage3 = loadImage("assets/ice/ice3.png");
	iceImage4 = loadImage("assets/ice/ice4.png");
	iceImage5 = loadImage("assets/ice/ice5.png");

	lightningboltImage = loadImage("assets/lightningbolt.png")
}

function level2setup() {
	iceFrameCount = 0;

	level2over = false;

	player = createSprite(30, 200, 32, 64);
  player.addImage(playerRightImage[0]);
	
	lightningbolt1 = createSprite(Math.round(random(10, 960)), Math.round(random(10, 350)), 32, 32);
	lightningbolt2 = createSprite(Math.round(random(10, 960)), Math.round(random(10, 350)), 32, 32);

	lightningbolt1.addImage(lightningboltImage);
	lightningbolt2.addImage(lightningboltImage);
  
	iceSprites = createSprite(480, 389, 32, 960);
	changeIce();

	backgroundIce = createSprite(480, 190, 480, 960);
  backgroundIce.addImage(backgroundIceImage);

	player.y = 200;
}

function drawLevel2() {
	background(0,0,0);
  if (!level2over) {

		//iceFrameCount++;

		if(backgroundIce.x <= backgroundIce.width/2 ) {
			background.x = 0;
		}

		player.depth = 2;
		backgroundIce.depth = 1;
		moveBackground();
		fly();

		if ( frameCount%60 /*450*/ == 0 ) {
			//console.log(iceFrameCount);
			changeIce();
		}

		if ( player.overlap(lightningbolt1) ) {
			resetBolt(1);
		}

		if ( player.overlap(lightningbolt2) ) {
			resetBolt(2);
		}
		drawSprites();
		text(`Level 2\nScore: ${lightningboltCount}\nFlap your way through this energy saving level\n before time runs out`, 20, 40)
	} else {
		//drawSprites();
    background(backgroundIceImage);
		player.lifetime = 0;
		backgroundIce.lifetime = 0;
		iceSprites.lifetime = 0;
		lightningbolt1.lifetime = 0;
		lightningbolt2.lifetime = 0;
		textAlign(CENTER);
		textSize(21);
		fill(255);
		text(`Nice! You didn't waste the energy and prevented the ice caps from melting.\nYour Score: ${lightningboltCount}\n(You will be moving to the next level soon)`, width/2, height/2 - 20);
    text.depth = 3;
		mode = 3;
		
		//location.href = "game.html?l=3";
	}
	
}

function moveBackground() {
	if ( (keyDown("a") || keyDown("left")) ) {
		if ( player.x <= 480 && backgroundIce.x < 480 ) {
      backgroundIce.x += 5;
			player.x += 5;

			lightningbolt1.x += 5;
			lightningbolt2.x += 5;

      iceSprites.x += 5;
		}
	}

	if ( keyDown("d") || keyDown("right") ) {
		if ( player.x >= 240 && backgroundIce.x > 240 ) {
      backgroundIce.x -= 5;
      player.x -= 5;

			lightningbolt1.x -= 5;
			lightningbolt2.x -= 5;

      iceSprites.x -= 5;
		}
	}
}

  
function changeIce() {
	iceLevel++;
	if (iceLevel == 1) {
		img = iceImage1;
	} else if (iceLevel == 2) {
		img = iceImage2;
	} else if (iceLevel == 3) {
		img = iceImage3;
	} else if (iceLevel == 4) {
		img = iceImage4;
	} else if (iceLevel == 5) {
		img = iceImage5;
	} else {
		img = undefined;
	}

	try {
		iceSprites.addImage(img);
	} catch (err) {
		console.log(`iceLevel = ${iceLevel}; ${err.message}`)
		iceSprites.lifetime = 0;
		level2over = true;
	}
}

function fly() {
	playerMove = false;
	g = 341;

	player.y += playerVerticalSpeed;
  playerVerticalSpeed += gravity;

  if ( player.y >= g ) {
  	playerVerticalSpeed = 0;
  	player.y = g;
  }

  if ( keyDown("w") || keyDown("up") || keyDown("space") ) {
		playerMove = true;
		playerFrame = 0;
    playerVerticalSpeed = -10;
	}

	if (keyDown("a") || keyDown("left")) {
		playerMove = true;
		changePlayerFrame();
		playerLookRight = false;
    player.x -= 5;
	}

	if ( keyDown("d") || keyDown("right") ) {
		playerMove = true;
		changePlayerFrame();
		playerLookRight = true;
		player.x += 5;
	}

	if (!playerMove) {
		playerFrame = 0;
	}

	if (playerLookRight) {
		player.addImage(playerRightImage[playerFrame])
	} else {
		player.addImage(playerLeftImage[playerFrame])
	}

  if (player.x <= 10) {player.x = 10;}

  if (player.x >= 710) {player.x = 710;}
}

function resetBolt(a) {
	if ( iceSprites.lifetime != 0 ) {
		if (a == 1) {
			lightningbolt1.x = Math.round(random(backgroundIce.x - 470, backgroundIce.x + 480));
  		lightningbolt1.y = Math.round(random(backgroundIce.y - 180, backgroundIce.y + 160));
		} else {
			lightningbolt2.x = Math.round(random(backgroundIce.x - 470, backgroundIce.x + 480));
  		lightningbolt2.y = Math.round(random(backgroundIce.y - 180, backgroundIce.y + 160));
		}
		lightningboltCount++;
		console.log(lightningboltCount)
	} else {
		level2over = true;
	}
}