var win = false;
var score = 0;
var backgroundIce, backgroundIceImage;

var iceFrameCount;

var iceLevel = 0;
var iceSprites;
var iceImage1, iceImage2, iceImage3, iceImage4, iceImage5;

var fireCount = 0;
var fire1, fire2, fireImage;


function level2preload() {
	backgroundIceImage = loadImage("assets/backgrounds/ice.png");

	iceImage1 = loadImage("assets/ice/ice1.png");
	iceImage2 = loadImage("assets/ice/ice2.png");
	iceImage3 = loadImage("assets/ice/ice3.png");
	iceImage4 = loadImage("assets/ice/ice4.png");
	iceImage5 = loadImage("assets/ice/ice5.png");

	fireImage = loadImage("assets/fire.png")
}

function level2setup() {
	iceFrameCount = 0;
	level2setup = 0;

	player = createSprite(30, 200, 32, 64);
	player.addImage(playerRightImage[0]);
		
	fire1 = createSprite(Math.round(random(10, 960)), Math.round(random(10, 350)), 32, 32);
	fire2 = createSprite(Math.round(random(10, 960)), Math.round(random(10, 350)), 32, 32);

	fire1.addImage(fireImage);
	fire2.addImage(fireImage);
		
	iceSprites = createSprite(480, 389, 32, 960);
	changeIce();

	backgroundIce = createSprite(480, 190, 480, 960);
	backgroundIce.addImage(backgroundIceImage);

	player.y = 200;
}



function drawLevel2() {
	background(0,0,0);

	if (level2over == 0) {
		background(backgroundIceImage);
		backgroundIce.y = 2000;
    
		text.depth = 3;
		if ( keyDown("space") ) {
      level2over=1;
		}
		
		textAlign(CENTER);
		textSize(18);
		fill(255, 255, 255);
		text("Hello!!\n To play please press UP as many times as necesarry\nto get all the fire balls before the ice melts!!!\nPress SPACE to start!!", width/2, height/2 - 10);
		drawSprites();
	} else if ( level2over == 1 ) {

		backgroundIce.y = 190;

		if(backgroundIce.x <= backgroundIce.width/2 ) {
			background.x = 0;
		}

		player.depth = 2;
		backgroundIce.depth = 1;
		moveBackground();
		fly();

		if ( frameCount% 600 == 0 && level2over == 1) {
			//console.log(iceFrameCount);
			changeIce();
		}

		if ( player.overlap(fire1) ) {
			resetBolt(1);
		}

		if ( player.overlap(fire2) ) {
			resetBolt(2);
		}

		text(`Level 2\nScore: ${fireCount}`, 20, 40);
		
		drawSprites();
	
	} else if (level2over == 2) {
		//drawSprites();

    background(backgroundIceImage);
		player.lifetime = 0;
		backgroundIce.lifetime = 0;
		iceSprites.lifetime = 0;

		fire1.lifetime = 0;
		fire2.lifetime = 0;

		textAlign(CENTER);
		textSize(21);
		fill(255);

		if (win) {

			textSize(14)
			text(`Nice! You stopped the fires and prevented the ice caps from melting.\nYour Score: ${fireCount}\n Greenland lost an average of 279 billion tons of ice per year between 1993 and 2019\nThink about how YOU can save energy\nand prevent global warming.\n(You will be moving to the next level soon)`, width/2, height/2 - 20);
			level3lock = false;
			saveCookies();
			setInterval(() => {window.location = "game.html?l=3";}, 5000);
		} else {
			text(`Nooo! The fires melted the ice...\n*sad polarbear noises*\nYour Score: ${fireCount}\n(Level will be restarted soon)`, width/2, height/2 - 20);
		setInterval(() => {window.location = "game.html?l=2";}, 5000);
		}

    text.depth = 3;

		level2over = 2;
	}	
}

function moveBackground() {
	if ( (keyDown("a") || keyDown("left")) ) {
		if ( player.x <= 480 && backgroundIce.x < 480 ) {
      backgroundIce.x += 5;
			player.x += 5;

			fire1.x += 5;
			fire2.x += 5;

      iceSprites.x += 5;
		}
	}

	if ( keyDown("d") || keyDown("right") ) {
		if ( player.x >= 240 && backgroundIce.x > 240 ) {
      backgroundIce.x -= 5;
      player.x -= 5;

			fire1.x -= 5;
			fire2.x -= 5;

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
		iceSprites.lifetime = 0;
		level2over = 2;
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
	if ( fireCount < 19 ) {
		if (a == 1) {
			fire1.x = Math.round(random(backgroundIce.x - 470, backgroundIce.x + 480));
  		fire1.y = Math.round(random(backgroundIce.y - 180, backgroundIce.y + 160));
		} else {
			fire2.x = Math.round(random(backgroundIce.x - 470, backgroundIce.x + 480));
  		fire2.y = Math.round(random(backgroundIce.y - 180, backgroundIce.y + 160));
		}
		fireCount++;
		console.log(fireCount)
	} else if (fireCount == 19) {
		level2over = 2;
		win = true;
	}
	console.log(fireCount);
}