var mode;
var score = 0;
var playIntro = true;

var level1over = false;
var level1lock = false;
var islevel1preloaded = false;
var islevel1setup = false;

var level2over = false;
var level2lock = true;
var islevel2preloaded = false;
var islevel2setup = false;

var level3over = false;
var level3lock = true;
var islevel3preloaded = false;
var islevel3setup = false;

const gravity = 0.9;
const ground = 330;

var player;
var playerMove = false;
var playerFrame = 0;
var playerLookRight = true;
var playerRightImage = [];
var playerLeftImage = [];
var playerVerticalSpeed = 0;
var ifchange = 0;

var musicIntro, musicLoop, musicEnd;



function preload() {
	mode = getMode();

	if (mode == undefined) {
		mode = 1;
	}

	musicIntro = loadSound('assets/music/soundtrack_intro.mp3');
	musicLoop = loadSound('assets/music/soundtrack_loop.mp3');
	musicEnd = loadSound('assets/music/soundtrack_ending.mp3');

	musicIntro.setVolume(0.05);
	musicLoop.setVolume(0.05);
	musicEnd.setVolume(0.05);

	playerRightImage.push(loadImage('assets/player/player_right.png'));
	playerLeftImage.push(loadImage('assets/player/player_left.png'));
	
	playerRightImage.push(loadImage('assets/player/player_walk_right.png'));
	playerLeftImage.push(loadImage('assets/player/player_walk_left.png'));

	if (mode == 1) {
		level1preload();
		islevel1preloaded = true;
		islevel2preloaded = islevel3preloaded = false;
	} else if (mode == 2) {
		level2preload();
		islevel2preloaded = true;
		islevel1preloaded = islevel3preloaded = false;
	} else if (mode == 3) {
		//level3preload();
		islevel3preloaded = true;
		islevel1preloaded = islevel2preloaded = false;
	}
}

function setup() {
	
	createCanvas(720 /*960*/, 405);

	if (mode == 1) {
		level1setup();
		islevel1setup = true;
		islevel2setup = islevel3setup = false;
	} else if (mode == 2) {
		level2setup();
		islevel2setup = true;
		islevel1setup = islevel3setup = false;
	} else if (mode == 3) {
		//level3setup();
		islevel3setup = true;
		islevel1setup = islevel2setup = false;
	}
	if (playIntro) {
		musicIntro.play();
		playIntro = false;
	}
  	
}

function draw() {
	if ( !musicIntro.isPlaying() && !musicLoop.isPlaying() ) {
		musicLoop.loop();
	}
	if (mode == 1) {
		if (!islevel1preloaded) {
			level1preload();
		}
		if (!islevel1setup) {
			setup();
		}
		drawLevel1();
	} else if (mode == 2) {
		if (!islevel2preloaded) {
			level2preload();
		}
		if (!islevel2setup) {
			setup();
		}
		drawLevel2();
	} else if (mode == 3) {
		if (!islevel3preloaded) {
			//level3preload();
		}
		if (!islevel3setup) {
			setup();
		}
		drawLevel3();
	} else if (mode == 4) {
		drawEnd();
	}

	drawSprites();
}

function move(leftLim, rightLim) {
	playerMove = false;

	player.y += playerVerticalSpeed;
  playerVerticalSpeed += gravity;

  if ( player.position.y >= ground ) {
    playerVerticalSpeed = 0;
    player.y = ground;
  }

  if ( keyDown("w") || keyDown("up") || keyDown("space") ) {
		playerMove = true;
		if ( player.y >= ground ) {
			playerFrame = 0;
      playerVerticalSpeed = -10;
    }
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

  if (player.x <= leftLim) {player.x = leftLim;}

  if (player.x >= rightLim) {player.x = rightLim;}
}

function changePlayerFrame() {
	if (ifchange == 0) {
		playerFrame = (playerFrame == 0) ? 1 : 0;
		ifchange = 3;
	} else {
		ifchange--;
	}
}

function removesprites() {
	player.lifetime = 0;
}

function getMode() {
  var level = window.location.search.substring(1).split('&')[0].split('=');
  return (level[0] == 'l') ? level[1] : undefined;
}

/*function random(min, max) {
  return Math.random() * (max - min) + min;
}*/