///////////////////////////////////////////////////////////////
//                                                           //
//                    CONSTANT STATE                         //

// TODO: DECLARE and INTIALIZE your constants here

var finger  = loadImage("http://www.psdgraphics.com/file/hand-pointer-icon.jpg")
var HOME = 1
var PLAY = 2
var EDIT = 3
var pixellily = loadImage("pixellilypad.png")
var pixelfly = loadImage("pixelfly.png")
var pixelfrog = loadImage("pixelfrog.png")
var pixelselected = loadImage("pixelselected.png")
var pixelfirelily = loadImage("firelily.png")
var pixelwater = loadImage("pixelwater.png")
var watermovex = 2;
var watermovey = .5;
var pixelmovinglily = loadImage("MOBILELILY.png")
var pixeltplily = loadImage("pixeltplily.png")
var pixelghostlily = loadImage("ghost.png")
///////////////////////////////////////////////////////////////
//                                                           //
//                     MUTABLE STATE    
                     //

//2 = chef, 3 = army, 4 = scientist, 5 = football, 6 = fireman, 7 = superman, 8 = SPY
// TODO: DECLARE your variables here
var lastKeyCode;
var currentScreen;
var xx;
var mode;
var yy;
var moving;
var speed;
var flyspeed;
var bugMove;
var fx;
var fy;
var currentKEY;
var flymoving;
var flystate;

//var FunY;
//var FunX;
var SCORE;
var LOSE;
var bgColor;
var selectedBlock;
var names;
var colors;
var spawnFly;
var waves;
var screens;

///////////////////////////////////////////////////////////////
//                                                           //
//                      EVENT RULES                          //

// When setup happens...
function onSetup() {
	console.log(screenHeight)
	spawnFly = {x:200, y:200}
	xx = 200;
	//waves = [{x:-200, y:100},{x:0, y:200}, {x:200, y:300}, {x:400, y:400}, {x:600, y:500}, {x:800, y:600}, {x:1000, y:700},{x:1200, y:800}, {x:1400, y:900}, {x:1600, y:1000}, {x:1800, y:1100}]
	waves = makeArray(0)
	for(var i = 0; i < 11; i++){
		//insertBack(waves, {x:i *200, y:i *50})
		for(var j = 0; j < 10; j++){
			insertBack(waves, {x:i *200, y:150 * j})
		}
	}
	yy = 200;
	mode = HOME;
	moving = 0;
	speed = 20;
	bugMove = 0;
	bgColor = makeColor(0, 0, .8); 
	fx = 800;
	fy = 500;
	flymoving = 0;
	//FunY =  10;
	//FunX = 10;
	currentKEY = undefined;
	SCORE = 0;
	flyspeed = 20;
    // TODO: INITIALIZE your variables here
    lastKeyCode = 0;
	LOSE = 0;
	flystate = 1;
	selectedBlock = 1;
	colors = [makeColor(0, .6, 0), makeColor(.9, .5, 0), makeColor( .7, 0, .7), makeColor(.7, .7, .9), makeColor(.9, .9, 0), makeColor(0, 0, 0)] 
	names = ["Regular Lilypad", "Fire Lilypad", "Mobile Lilypad", "Ghost Lilypad", "Teleportation Lilypad", "Fly Spawnpoint", "Frog", "Revise Mode", "Delete Mode"]
	screens = [{x:0,y:0,lily:[]}]
	currentScreen = 0;
}


// When a key is pushed
function onKeyStart(key) {
	currentKEY = key;
	
    lastKeyCode = key;
	if(key == 67){
		localStorage.lilypads = JSON.stringify(screens[currentScreen].lily)
		console.log(localStorage.lilypads)
	}
	if(key == 86){
		console.log(localStorage.lilypads)
		screens[currentScreen].lily = JSON.parse(localStorage.lilypads)
	}
	if(key == 32 && mode == PLAY || key == 32 && mode == EDIT){
		mode = HOME
	} else if(key == 32 && mode == HOME){
		mode = EDIT
	}
	if(key == 27){
		if(mode == EDIT){
			mode = PLAY
		}else if (mode == PLAY)	{
			mode = EDIT
			
		}
	}
	if(key > 48 && key < 59){
		selectedBlock = key - 48
	}
	if(mode == EDIT && key == 87){
		var s = screens[currentScreen]
		var i = screenChecker(s.x, s.y + 1)
		currentScreen = i
		
	}
	if(mode == EDIT && key == 83){
		var s = screens[currentScreen]
		var i = screenChecker(s.x, s.y - 1)
		currentScreen = i
		
	}
	if(mode == EDIT && key == 65){
		var s = screens[currentScreen]
		var i = screenChecker(s.x - 1, s.y)
		currentScreen = i
		
	}
	if(mode == EDIT && key == 68){
		var s = screens[currentScreen]
		var i = screenChecker(s.x + 1, s.y)
		currentScreen = i
		
	}
	
}
function screenChecker(x, y){
	for(var i = 0; i < screens.length; i++){
		if(screens[i].x == x && screens[i].y == y){
			return i
		}
	}
	insertBack(screens, {x:x, y:y, lily:[]})
	return screens.length - 1
}

function onKeyEnd(key){
	if(currentKEY == key){
		currentKEY = undefined
	}
}
function processKEY(key){
	var newx = fx;
	var newy = fy;
/*	if(key == 38 && yy > 199){
		yy = yy - 100
	}
	
	if(key == 40 &&	yy < screenHeight - 200){
		yy = yy + 100
	}
	
	if(key == 37 && xx > 199 && moving == 0){
		moving = -200
	}
	
	if(key == 39 && xx < screenWidth - 300 && moving == 0){
		moving = 200
	}*/
	
		if(key == 65){
			if(!newx <= 0){
			newx = newx - flyspeed;
			flystate = 1;
			}else{
				currentScreen = screenChecker(screens[currentScreen].x - 1, screens[currentScreen].y)
				newx = screenWidth
			}
		}
		if(key == 68){
			if(!newx >= screenWidth){
			newx = newx + flyspeed;
			flystate = 2;
			}else{
				currentScreen = screenChecker(screens[currentScreen].x + 1, screens[currentScreen].y)
				newx = 0
			}
		}
		if(key == 87){
			newy = newy - flyspeed;
			flystate = 4;
		}
		if(key == 83){
			newy = newy + flyspeed;
			flystate = 3;
		}
		
		var collidedwith = undefined;
		
		for(var i = 0; i < screens[currentScreen].lily.length; i += 1){
			var lp = screens[currentScreen].lily[i];
			if (!nocollision(lp, newx, newy)){
				collidedwith = lp;
			}
		}
		console.log(collidedwith)
		if(collidedwith == undefined){
			fx = newx;
			fy = newy;
		}else if(collidedwith.fire){
			fx = spawnFly.x
			fy = spawnFly.y
		}
		
		
		
}

function onTouchStart(x, y , id){
//	drawImage(pixelselected, x- 25, y, 52, 64)

	if(mode == EDIT){
		if(selectedBlock == 9){
			for(i = 0; i < screens[currentScreen].lily.length; i++){
				if(round(x/100) * 100 == screens[currentScreen].lily[i].x && round(y/100) * 100 == screens[currentScreen].lily[i].y){
					removeAt(screens[currentScreen].lily, i)
				
				}
			}
			
		}
		if(selectedBlock > 6){
			return
		}else if(selectedBlock == 6){
			spawnFly.x = x;
			spawnFly.y = y;
		}/* else if(selectedBlock == 5){
				insertBack(lilypads, {x:x, y:y, color:colors[selectedBlock - 1], solid:selectedBlock != 4, fire:selectedBlock == 2})
		
		}*/ else {
			var newX = round(x/100) * 100;
			var newY = round(y/100) * 100;
			if(!lilyat(newX, newY)){
				insertBack(screens[currentScreen].lily, {x:newX, y:newY, color:colors[selectedBlock - 1], solid:selectedBlock != 4, fire:selectedBlock == 2, mobile:selectedBlock == 3, tp:selectedBlock == 5})
			}
		}
	}
}
function lilyat(x, y){
	for(i = 0; i < screens[currentScreen].lily.length; i++){
		if(x == screens[currentScreen].lily[i].x && y == screens[currentScreen].lily[i].y){
			return true
		}
	} return false
}
function onTouchMove(x, y, id){ 
	onTouchStart(x, y, id);
}


function nocollision(lily, newx, newy){
	if (lily.solid){
		return newy > lily.y + 75  || newy < lily.y - 75 || newx > lily.x + 75 || newx < lily.x - 75
		
	}else{
		return true
	}
}
function epicLilyPads(lily){
//	fillCircle(lily.x, lily.y, 50, lily.color)
//	fillPolygon([lily.x - 10, lily.y - 50, lily.x + 10, lily.y - 50, lily.x, lily.y], bgColor)
	if(lily.fire){
		drawImage(pixelfirelily, lily.x -50, lily.y -50, 100, 100)
	}else if(lily.mobile){
		drawImage(pixelmovinglily, lily.x - 50, lily.y - 50, 100, 100)
	}else if(!lily.solid){
		drawImage(pixelghostlily, lily.x - 50, lily.y - 50, 100, 100)
	}else if(lily.tp){
		drawImage(pixeltplily, lily.x - 50, lily.y - 50, 100, 100)
	}else if(!lily.fire && !lily.mobile && !lily.tp){
		drawImage(pixellily, lily.x - 50, lily.y - 50, 100, 100)	
	}
}

function bugDude(bugX, bugY) {
	var angle;
	if(flystate == 1){
		angle = 1.5
	}else if(flystate == 2){
		angle = .5
	}else if(flystate == 3){
		angle = 1
	}else if(angle == 4){
		angle = 0
	}
	drawTransformedImage(pixelfly, bugX, bugY, angle * 3.14159, .25, .25)
				fillText("newx =" + newx, screenWidth - 200, screenHeight - 300, makeColor(1, 1, 1, 1.0), "bold 30px Comic Sans MS",  "center", "middle");

	
/*	
	if(flystate == 1 && mode == PLAY){
	//body
		fillCircle(bugX, bugY, 38, makeColor(0, 0, 0))
		fillCircle(bugX - 40, bugY, 30, makeColor(0, 0, 0))
	//eyes
		fillCircle(bugX - 50, bugY + 15, 10, makeColor(.5, 0, 0))
		fillCircle(bugX - 50, bugY - 15, 10, makeColor(.5, 0, 0))
	//wings
		fillCircle(bugX - 15, bugY - 5, 20, makeColor(.6, .8, .8))
		fillCircle(bugX - 15, bugY + 5, 20, makeColor(.6, .8, .8))
		fillCircle(bugX - 5, bugY - 10, 20, makeColor(.6, .8, .8))
		fillCircle(bugX - 5, bugY + 10, 20, makeColor(.6, .8, .8))
		fillCircle(bugX + 5, bugY - 15, 20, makeColor(.6, .8, .8))
		fillCircle(bugX + 5, bugY + 15, 20, makeColor(.6, .8, .8))
		fillCircle(bugX + 15, bugY - 20, 20, makeColor(.6, .8, .8))
		fillCircle(bugX + 15, bugY + 20, 20, makeColor(.6, .8, .8))
		
	}
	
	if(flystate == 2 && mode == PLAY){
		fillCircle(bugX, bugY, 38, makeColor(0, 0, 0))
		fillCircle(bugX + 40, bugY, 30, makeColor(0, 0, 0))
	//eyes
		fillCircle(bugX + 50, bugY + 15, 10, makeColor(.5, 0, 0))
		fillCircle(bugX + 50, bugY - 15, 10, makeColor(.5, 0, 0))
	//wings
		fillCircle(bugX + 15, bugY - 5, 20, makeColor(.6, .8, .8))
		fillCircle(bugX + 15, bugY + 5, 20, makeColor(.6, .8, .8))
		fillCircle(bugX + 5, bugY - 10, 20, makeColor(.6, .8, .8))
		fillCircle(bugX + 5, bugY + 10, 20, makeColor(.6, .8, .8))
		fillCircle(bugX - 5, bugY - 15, 20, makeColor(.6, .8, .8))
		fillCircle(bugX - 5, bugY + 15, 20, makeColor(.6, .8, .8))
		fillCircle(bugX - 15, bugY - 20, 20, makeColor(.6, .8, .8))
		fillCircle(bugX - 15, bugY + 20, 20, makeColor(.6, .8, .8))
	}
	if(flystate == 3 && mode == PLAY){
		
		//body
			fillCircle(bugX, bugY, 38, makeColor(0, 0, 0))
			fillCircle(bugX, bugY + 40, 30, makeColor(0, 0, 0))
		//eyes
			fillCircle(bugX + 15, bugY + 50, 10, makeColor(.5, 0, 0))
			fillCircle(bugX - 15, bugY + 50, 10, makeColor(.5, 0, 0))
		//wings
			fillCircle(bugX - 5, bugY + 15, 20, makeColor(.6, .8, .8))
			fillCircle(bugX + 5, bugY + 15, 20, makeColor(.6, .8, .8))
			fillCircle(bugX - 10, bugY + 5, 20, makeColor(.6, .8, .8))
			fillCircle(bugX + 10, bugY + 5, 20, makeColor(.6, .8, .8))
			fillCircle(bugX - 15, bugY - 5, 20, makeColor(.6, .8, .8))
			fillCircle(bugX + 15, bugY - 5, 20, makeColor(.6, .8, .8))
			fillCircle(bugX - 20, bugY - 15, 20, makeColor(.6, .8, .8))
			fillCircle(bugX + 20, bugY - 15, 20, makeColor(.6, .8, .8))
		
	}
	if(flystate == 4 && mode == PLAY){
		
		//body
			fillCircle(bugX, bugY, 38, makeColor(0, 0, 0))
			fillCircle(bugX, bugY - 40, 30, makeColor(0, 0, 0))
		//eyes
			fillCircle(bugX + 15, bugY - 50, 10, makeColor(.5, 0, 0))
			fillCircle(bugX - 15, bugY - 50, 10, makeColor(.5, 0, 0))
		//wings
			fillCircle(bugX - 5, bugY - 15, 20, makeColor(.6, .8, .8))
			fillCircle(bugX + 5, bugY - 15, 20, makeColor(.6, .8, .8))
			fillCircle(bugX - 10, bugY - 5, 20, makeColor(.6, .8, .8))
			fillCircle(bugX + 10, bugY - 5, 20, makeColor(.6, .8, .8))
			fillCircle(bugX - 15, bugY + 5, 20, makeColor(.6, .8, .8))
			fillCircle(bugX + 15, bugY + 5, 20, makeColor(.6, .8, .8))
			fillCircle(bugX - 20, bugY + 15, 20, makeColor(.6, .8, .8))
			fillCircle(bugX + 20, bugY + 15, 20, makeColor(.6, .8, .8))
		
	}
	*/
	//hat
	//FOR CHEF:
//	fillCircle(bugX - 47, bugY - 90, 35, makeColor(1, 1, 1))
//	fillRectangle(bugX- 70, bugY - 70, 50, 50, makeColor(1, 1, 1))
	
	//FOR ARMY DUDE:
	//fillSpline([bugX - 80, bugY - 30, bugX - 40, bugY - 70, bugX, bugY - 30], makeColor(0, .5, 0))
	
	
}

function frogMove(x, y) {


/*	fillRectangle(x, y, 100, 100, makeColor(0, .4, 0), 30);
	
	fillCircle(x + 28, y - 4, 15, makeColor(0, .4, 0));
	fillCircle(x + 72, y  - 4, 15, makeColor(0, .4, 0));

	fillCircle(x + 28, y - 2, 8, makeColor(1, 1, 1));
   	fillCircle(x + 72, y - 2, 8, makeColor(1, 1, 1));
	fillCircle(x + 72, y - 4, 2, makeColor(0, 0, 0));

	fillCircle(x + 28, y - 4, 2, makeColor(0, 0, 0));
	fillCircle(x + 50, y + 60, 30, makeColor(0, 0, 0));
	fillRectangle(x + 20, y + 30, 60, 27, makeColor(0, .4, 0));
*/	
	
	

 }
// Called 30 times or more per second
function editMode() {
	
	if(mode == EDIT){
		bgColor = makeColor(.4, .4, .4)
		fx = spawnFly.x
		fy = spawnFly.y
		flystate = 1
	}else{
		bgColor = makeColor(0, 0, .4)
	}
	
}
function gameTick() {
	if(mode == PLAY){
		
		for(i = 0; i < waves.length; i++){
	
			
			if(waves[i].x > 2000){
				waves[i].x = -200
		
			}else if(waves[i].y > screenHeight + 70){
		
					waves[i].y = -150
			}else {
				drawImage(pixelwater, waves[i].x, waves[i].y, 120, 30)
				waves[i].y = waves[i].y + watermovey
				waves[i].x = waves[i].x + watermovex
			}
		}
	}
	
	/*if(fy < 0){
		LOSE = 1
	}
	if(fy > screenHeight){
		LOSE = 1
	}
	if(fx < 0){
		LOSE = 1
	}
	if(fx > screenWidth){
		LOSE = 1
	}*/
	editMode()
    // Some sample drawing 
	
	
	for(var i = 0; i < screens[currentScreen].lily.length; i += 1) {
		var lp = screens[currentScreen].lily[i];
		epicLilyPads(lp)

	}

	bugDude(fx, fy)
  	frogMove(xx,yy)
	if(moving != 0){
		if(moving <= 100 && moving > 0 || moving < 0 && moving > -101) {
			yy = yy + 20
	    }
		if (moving >= 101 || moving <= -101) {
			yy = yy - 20
		} 
		
		if (moving < 0){
			xx = xx - speed
			moving = moving + speed
		}
		
		if (moving > 0){
			xx = xx + speed
			moving = moving - speed
		}
	}

  
			if(mode == EDIT){
				fillText("lilypad count:" + screens[currentScreen].lily.length, screenWidth - 200, screenHeight - 300, makeColor(1, 1, 1, 1.0), "bold 30px Comic Sans MS",  "center", "middle");
				
				bugY = 1190
				bugX = 1175
				x = 1325
				y = 1125
				fillCircle(spawnFly.x, spawnFly.y, 20, makeColor(1, 1, 1))
				strokeRectangle((2 * selectedBlock - 1) * 100, 1100, 150, 150, makeColor(.6, .6, .6), 25, 30)
			fillRectangle(100, 1100, 150, 150, makeColor(1, 1, 1), 30)
				drawImage(pixellily, 125, 1125, 100, 100)
			fillRectangle(300, 1100, 150, 150, makeColor(1, 1, 1), 30)
				drawImage(pixelfirelily, 325, 1125, 100, 100)
				//fire lily
			fillRectangle(500, 1100, 150, 150, makeColor(1, 1, 1), 30)
				drawImage(pixelmovinglily, 525, 1125, 100, 100)
			fillRectangle(700, 1100, 150, 150, makeColor(1, 1, 1), 30)
				drawImage(pixelghostlily, 725, 1125, 100, 100)
			fillRectangle(900, 1100, 150, 150, makeColor(1, 1, 1), 30)
				drawImage(pixeltplily, 925, 1125, 100, 100)
			fillRectangle(1100, 1100, 150, 150, makeColor(1, 1, 1), 30)
			
					drawImage(pixelfly, bugX - 50, bugY - 60, 100, 100)
				
			fillRectangle(1300, 1100, 150, 150, makeColor(1, 1, 1), 30)
			/*	fillRectangle(x, y, 100, 100, makeColor(0, .4, 0), 30);

					fillCircle(x + 28, y - 4, 15, makeColor(0, .4, 0));
					fillCircle(x + 72, y  - 4, 15, makeColor(0, .4, 0));

					fillCircle(x + 28, y - 2, 8, makeColor(1, 1, 1));
				   	fillCircle(x + 72, y - 2, 8, makeColor(1, 1, 1));
					fillCircle(x + 72, y - 4, 2, makeColor(0, 0, 0));

					fillCircle(x + 28, y - 4, 2, makeColor(0, 0, 0));
					fillCircle(x + 50, y + 60, 30, makeColor(0, 0, 0));
					fillRectangle(x + 20, y + 30, 60, 27, makeColor(0, .4, 0));
			*/
					drawImage(pixelfrog, x, y, 100, 100)
			fillRectangle(1500, 1100, 150, 150, makeColor(1, 1, 1), 30)
				drawImage(finger, 1520, 1120, 100, 120)
			fillRectangle(1700, 1100, 150, 150, makeColor(1, 1, 1), 30)
				strokeLine(1720, 1120, 1830, 1230, makeColor(1, 0, 0), 15)
				strokeLine(1720, 1230, 1830, 1120, makeColor(1, 0, 0), 15)
					fillText(names[selectedBlock - 1], screenWidth / 2, 1000, makeColor(.8, .8, .8), "100px Arial", "center", "middle")
				
		}
/*	if(LOSE == 1){
	
	 	fillText("YOU LOSE",
	             screenWidth / 2, 
	             screenHeight / 2,             
	             makeColor(0.5, 0, 0, 1.0), 
	             "300px Arial", 
	             "center", 
	             "middle");
		FunX = 0;
		FunY = 0;
	
		}*/
		
}
function homeTick(){
	
	bugX = screenWidth / 2
	bugY = screenHeight / 2
	bgColor = makeColor(0, 0, .4)

	
	
	drawTransformedImage(pixelfly, bugX, bugY, 0, 3, 3)
	
	fillText("FLY GUY", screenWidth / 2, screenHeight / 2 - 200, makeColor(1, 1, 1, 1.0), "bold 400px Comic Sans MS",  "center", "middle");
	fillText("SPACE TO BEGIN", screenWidth / 2, screenHeight / 2 + 100, makeColor(1, 1, 1, 1.0), "100px Comic Sans MS",  "center", "middle");
	


	
}
function onTick(){
	processKEY(currentKEY)
	clearRectangle(0, 0, screenWidth, screenHeight);
	fillRectangle(0, 0, screenWidth, screenHeight, bgColor);

	if (mode == HOME) {
		homeTick ();
	} else {
		gameTick();		
	}
}

///////////////////////////////////////////////////////////////
//                                                           //
//                      HELPER RULES                         //
