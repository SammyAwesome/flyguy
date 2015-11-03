///////////////////////////////////////////////////////////////
//                                                           //
//                    CONSTANT STATE                         //

// TODO: DECLARE and INTIALIZE your constants here

var finger  = loadImage("http://www.psdgraphics.com/file/hand-pointer-icon.jpg")

///////////////////////////////////////////////////////////////
//                                                           //
//                     MUTABLE STATE    
                     //

//2 = chef, 3 = army, 4 = scientist, 5 = football, 6 = fireman, 7 = superman, 8 = SPY
// TODO: DECLARE your variables here
var lastKeyCode;
var xx;
var editmode;
var yy;
var moving;
var speed;
var flyspeed;
var bugMove;
var fx;
var fy;
var currentKEY;
var flymoving;
var flystate
//var FunY;
//var FunX;
var SCORE;
var LOSE;
var bgColor;
var selectedBlock;
var lilypads;
var names;
var colors;
var spawnFly;


///////////////////////////////////////////////////////////////
//                                                           //
//                      EVENT RULES                          //

// When setup happens...
function onSetup() {
	
	spawnFly = {x:200, y:200}
	xx = 200;
	
	yy = 200;
	editmode = false;
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
	lilypads = makeArray(0);
	names = ["Regular Lilypad", "Fire Lilypad", "Mobile Lilypad", "Ghost Lilypad", "Teleportation Lilypad", "Fly Spawnpoint", "Frog", "Revise Mode", "Delete Mode"]
	
	
}


// When a key is pushed
function onKeyStart(key) {
	currentKEY = key;
	
    lastKeyCode = key;
	if(key == 27){
		if(editmode == true){
			editmode = false
		}else			{
			editmode = true
		}
	}
	if(key > 48 && key < 59){
		selectedBlock = key - 48
	}

	
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
			newx = newx - flyspeed;
			flystate = 1;
		}
		if(key == 68){
			newx = newx + flyspeed;
			flystate = 2;
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
		
		for(var i = 0; i < lilypads.length; i += 1){
			var lp = lilypads[i];
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
	if(editmode == true){
		if(selectedBlock > 6){
			return;
		}
		if(selectedBlock == 6){
			spawnFly.x = x;
			spawnFly.y = y;
		}/* else if(selectedBlock == 5){
				insertBack(lilypads, {x:x, y:y, color:colors[selectedBlock - 1], solid:selectedBlock != 4, fire:selectedBlock == 2})
		
		}*/ else {
			
			insertBack(lilypads, {x:x, y:y, color:colors[selectedBlock - 1], solid:selectedBlock != 4, fire:selectedBlock == 2})
		}
	}
}
function onTouchMove(x, y, id){ 
	onTouchStart(x, y, id);
}


function nocollision(lily, newx, newy){
	if (lily.solid){
		return newy > lily.y + 100  || newy < lily.y - 100 || newx > lily.x + 100 || newx < lily.x - 100
		
	}else{
		return true
	}
}
function epicLilyPads(lily){
	fillCircle(lily.x, lily.y, 50, lily.color)
	fillPolygon([lily.x - 10, lily.y - 50, lily.x + 10, lily.y - 50, lily.x, lily.y], bgColor)
}
function bugDude(bugX, bugY) {
	
	if(flystate == 1 && editmode == false){
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
	
	if(flystate == 2 && editmode == false){
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
	if(flystate == 3 && editmode == false){
		
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
	if(flystate == 4 && editmode == false){
		
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
	if(editmode == true){
		bgColor = makeColor(.2, .2, .2)
		fx = spawnFly.x
		fy = spawnFly.y
		flystate = 1
	}else{
		bgColor = makeColor(0, 0, .8)
	}
	
}
function onTick() {
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
	processKEY(currentKEY)
	editMode()
    // Some sample drawing 
	clearRectangle(0, 0, screenWidth, screenHeight);
	fillRectangle(0, 0, screenWidth, screenHeight, bgColor);
	
	
	for(var i = 0; i < lilypads.length; i += 1) {
		var lp = lilypads[i];
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

  
			if(editmode == true){
				bugY = 1190
				bugX = 1175
				x = 1325
				y = 1125
				fillCircle(spawnFly.x, spawnFly.y, 20, makeColor(1, 1, 1))
				strokeRectangle((2 * selectedBlock - 1) * 100, 1100, 150, 150, makeColor(.6, .6, .6), 25, 30)
			fillRectangle(100, 1100, 150, 150, makeColor(1, 1, 1), 30)
				fillCircle(175, 1175, 50, makeColor(0, .6, 0))
				fillPolygon([165, 1125, 185, 1125, 175, 1175], makeColor(1, 1, 1))
			fillRectangle(300, 1100, 150, 150, makeColor(1, 1, 1), 30)
				fillCircle(375, 1175, 50, makeColor(.9, .5, 0)) 
				//fire lily
				fillPolygon([365, 1125, 385, 1125, 375, 1175], makeColor(1, 1, 1))
			fillRectangle(500, 1100, 150, 150, makeColor(1, 1, 1), 30)
				fillCircle(575, 1175, 50, makeColor( .7, 0, .7))
				// moving lily
				fillPolygon([565, 1125, 585, 1125, 575, 1175], makeColor(1, 1, 1))
				
			fillRectangle(700, 1100, 150, 150, makeColor(1, 1, 1), 30)
				fillCircle(775, 1175, 50, makeColor(.7, .7, .9))
				//ghost lily
				fillPolygon([765, 1125, 785, 1125, 775, 1175], makeColor(1, 1, 1))
			fillRectangle(900, 1100, 150, 150, makeColor(1, 1, 1), 30)
				fillCircle(975, 1175, 50, makeColor(.9, .9, 0))
				
				fillPolygon([965, 1125, 985, 1125, 975, 1175], makeColor(1, 1, 1))
			fillRectangle(1100, 1100, 150, 150, makeColor(1, 1, 1), 30)
			
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
				
				
			fillRectangle(1300, 1100, 150, 150, makeColor(1, 1, 1), 30)
				fillRectangle(x, y, 100, 100, makeColor(0, .4, 0), 30);

					fillCircle(x + 28, y - 4, 15, makeColor(0, .4, 0));
					fillCircle(x + 72, y  - 4, 15, makeColor(0, .4, 0));

					fillCircle(x + 28, y - 2, 8, makeColor(1, 1, 1));
				   	fillCircle(x + 72, y - 2, 8, makeColor(1, 1, 1));
					fillCircle(x + 72, y - 4, 2, makeColor(0, 0, 0));

					fillCircle(x + 28, y - 4, 2, makeColor(0, 0, 0));
					fillCircle(x + 50, y + 60, 30, makeColor(0, 0, 0));
					fillRectangle(x + 20, y + 30, 60, 27, makeColor(0, .4, 0));
					
			fillRectangle(1500, 1100, 150, 150, makeColor(1, 1, 1), 30)
				drawImage(finger, 1520, 1120, 100, 120)
			fillRectangle(1700, 1100, 150, 150, makeColor(1, 1, 1), 30)
				strokeLine(1720, 1120, 1830, 1230, makeColor(1, 0, 0), 15)
				strokeLine(1720, 1230, 1830, 1120, makeColor(1, 0, 0), 15)
					fillText(names[selectedBlock - 1], screenWidth / 2, 1000, makeColor(.8, .8, .8), "100px sans-serif", "center", "middle")
				
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
///////////////////////////////////////////////////////////////
//                                                           //
//                      HELPER RULES                         //
