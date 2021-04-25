var forestImage;

var bagValue = 0;
var bagLimit = 5;

var trashCount = 0;
var trashSpeed = 2;

var trash, trashImage;
var trashcan, trashcanImage;

function level1preload() {
	forestImage = loadImage('assets/backgrounds/forest.png');
	trashImage = loadImage('assets/trash/trash.png');
	trashcanImage = loadImage('assets/trash/trashcan.png');
}

function level1setup() {
	player = createSprite(30, ground, 32, 64);
  player.addImage(playerRightImage[0]);
	
  trash = createSprite(200, 0, 32, 32)
	trash.addImage(trashImage)
  trash.scale = 0.75;

	trashcan = createSprite(640, 330, 32, 40)
	trashcan.addImage(trashcanImage)
	trashcan.scale = 1.75;

  
}

function drawLevel1() {
	background(forestImage)
	if (!level1over) {
		text(`Level 1\nScore: ${score}\nBag: ${bagValue}/${bagLimit}`, 20, 40)
		
		trash.y += trashSpeed;

		if (player.overlap(trash)) {
			if (bagValue != bagLimit) {
				bagValue++;
				resetTrash();
			}
		}
		
		if (player.overlap(trashcan)) {
			score += bagValue;
			bagValue = 0;
		}

		if(trash.y >= 350) {
			if (score > 0) {
				score--;
			}
			resetTrash();
		}
		
		move(10, 606);
	} else {
		player.lifetime = 0;
		trash.lifetime = 0;
		trashcan.lifetime = 0;
    textAlign(CENTER);
		textSize(21);
		fill(255, 255, 255);
		text(`Well done!!\nYour final score for level 1: ${score}/15\n51 billion pieces of litter are released\non American roadways each year. Can you help\nby picking up trash in your neighborhood?\n(You will go to the next level soon!)`, width/2, height/2 - 60);
		level2lock = false;
		saveCookies();
		// mode = 2;
    setInterval(() => {window.location = "game.html?l=2";}, 5000);
	}
}

function resetTrash() {
	if (trashCount != 15) {
		trash.x = Math.round(random(20,640));
  	trash.y = -20;
    if (trashCount >= 10) {
			trashSpeed = 4;
    } else if (trashCount >= 5) {
			trashSpeed = 3;
    }
		trashCount++;
	} else {
		score += bagValue;
		bagValue = 0;
		level1over = true;
	}
}
