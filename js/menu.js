var level1Button = '<button class="center">Level 1</button>'

var level2Button = '<button class="center2">Level 2</button>'

var level3Button = '<button class="center3">Level 3</button>'

var buttons;



window.onload = function () {
	loadCookies();
	try {
		buttons = document.getElementById("buttons");
		displayButtons();
	} catch (err) {}
};

function displayButtons() {
	if (!level1lock) {
		var a1 = document.createElement("a");

		var b1 = document.createElement("button");
		b1.innerHTML = "Level 1";

		var classAtt = document.createAttribute("class");
		classAtt.value = "center"

		var att = document.createAttribute("href");
		att.value = "game.html?l=1"

		a1.setAttributeNode(att);
		b1.setAttributeNode(classAtt);

		a1.appendChild(b1);
		buttons.appendChild(a1);
	}

	if (!level2lock) {
		var a2 = document.createElement("a");

		var b2 = document.createElement("button");
		b2.innerHTML = "Level 2";

		var classAtt = document.createAttribute("class");
		classAtt.value = "center2"

		var att = document.createAttribute("href");
		att.value = "game.html?l=2"

		a2.setAttributeNode(att);
		b2.setAttributeNode(classAtt);

		a2.appendChild(b2);
		buttons.appendChild(a2);
	}

	if (!level3lock) {
		var a3 = document.createElement("a");

		var b3 = document.createElement("button");
		b3.innerHTML = "Level 3";

		var classAtt = document.createAttribute("class");
		classAtt.value = "center3"

		var att = document.createAttribute("href");
		att.value = "game.html?l=3"

		a3.setAttributeNode(att);
		b3.setAttributeNode(classAtt);

		a3.appendChild(b3);
		buttons.appendChild(a3);
	}
}

function loadCookies() {
	var cookies = document.cookie.split(';');

	console.log(cookies);

	for (var i = 0; i < cookies.length; i++) {
		var c = cookies[i].split("=");
		try {
			vals = [c[0].trim(), c[1].trim()]
		} catch (err) {
			vals = [" ", " "];
		}

		if (vals[0] == "level1lock") {
			level1lock = vals[1] == 'true';
		} else if (vals[0] == "level2lock") {
			level2lock = vals[1] == 'true';
		} else if (vals[0] == "level3lock") {
			level3lock = vals[1] == 'true';
		}
	}
}

function saveCookies() {
	document.cookie = `level1lock=${level1lock}; expires=Fri, 01 Jan 9999 00:00:00 GMT`
	document.cookie = `level2lock=${level2lock}; expires=Fri, 01 Jan 9999 00:00:00 GMT`
	document.cookie = `level3lock=${level3lock}; expires=Fri, 01 Jan 9999 00:00:00 GMT`
	document.cookie = `path=; expires=Fri, 01 Jan 9999 00:00:00 GMT`
}