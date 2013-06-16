
fbConnected = false;
FourBeat.IMAGE_RESOURCES = ['winner.png'];

FourBeat.enableFourBeatOnScene = function(scene, listener) {
    this.buttonListener = listener;

	//TODO check if fourbeat is connected
	if (!fbConnected) {
		addDummyfourbeatButton(scene, 'RED');
		addDummyfourbeatButton(scene, 'BLUE');
		addDummyfourbeatButton(scene, 'YELLOW');
		addDummyfourbeatButton(scene, 'GREEN');
	}
}


function addDummyfourbeatButton(scene, color) {

    var theme = 'dark';    
    var x = 0;    
    var xUnit = scene.width / 5;

    var y = scene.height - 50;
    if (y < 0 ) {
    	y = 0;
    }

	switch (color) {
	case 'RED':
	    x = xUnit;
	    theme = 'red';
		break;
	case 'BLUE':
	    x = xUnit * 2;
	    theme = 'blue';	    
		break
	case 'YELLOW':
	    x = xUnit * 3;
	    theme = 'yellow';	    	    
		break
    case 'GREEN':
	    x = xUnit * 4;
	    theme = 'green';	    	    	    
        break;
	default:
		break;
	}

    var button = new Button('', FourBeat.BUTTON_THEMES[theme]);
    button.moveTo(x, y);

    button.addEventListener("touchstart", function() {
            nativeFourBeatEvent({"eventType":"button", "color" : color, "state" : FourBeat.FB_EVENT_PRESS});
        }
    )
    
    button.addEventListener("touchend", function() {
            nativeFourBeatEvent({"eventType":"button", "color" : color, "state" : FourBeat.FB_EVENT_RELEASE});
        }
    )

    scene.addChild(button);
}

FourBeat.BUTTON_THEMES  = {
    blue: {
        normal: {
            color: '#fff',
            background: { type: 'linear-gradient', start: '#04f', end: '#04c' },
            border: { color: '#026', width: 1, type: 'solid' },
            textShadow: { offsetX: 0, offsetY: 1, blur: 0, color: '#666' },
            boxShadow: { offsetX: 0, offsetY: 1, blur: 0, color: 'rgba(0, 0, 0, 0.5)' }
        },
        active: {
            color: '#ccc',
            background: { type: 'linear-gradient', start: '#029', end: '#026' },
            border: { color: '#026', width: 1, type: 'solid' },
            textShadow: { offsetX: 0, offsetY: 1, blur: 0, color: '#000' },
            boxShadow: 'none'
        }
    },
	red: {
        normal: {
            color: '#fff',
            background: { type: 'linear-gradient', start: '#f00', end: '#f00' },
            border: { color: '#026', width: 1, type: 'solid' },
            textShadow: { offsetX: 0, offsetY: 1, blur: 0, color: '#666' },
            boxShadow: { offsetX: 0, offsetY: 1, blur: 0, color: 'rgba(0, 0, 0, 0.5)' }
        },
        active: {
            color: '#ccc',
            background: { type: 'linear-gradient', start: '#029', end: '#026' },
            border: { color: '#026', width: 1, type: 'solid' },
            textShadow: { offsetX: 0, offsetY: 1, blur: 0, color: '#000' },
            boxShadow: 'none'
        }
    },
    yellow: {
        normal: {
            color: '#fff',
            background: { type: 'linear-gradient', start: '#ff0', end: '#ff0' },
            border: { color: '#026', width: 1, type: 'solid' },
            textShadow: { offsetX: 0, offsetY: 1, blur: 0, color: '#666' },
            boxShadow: { offsetX: 0, offsetY: 1, blur: 0, color: 'rgba(0, 0, 0, 0.5)' }
        },
        active: {
            color: '#ccc',
            background: { type: 'linear-gradient', start: '#029', end: '#026' },
            border: { color: '#026', width: 1, type: 'solid' },
            textShadow: { offsetX: 0, offsetY: 1, blur: 0, color: '#000' },
            boxShadow: 'none'
        }
    },
    green: {
        normal: {
            color: '#fff',
            background: { type: 'linear-gradient', start: '#0c0', end: '#0c0' },
            border: { color: '#026', width: 1, type: 'solid' },
            textShadow: { offsetX: 0, offsetY: 1, blur: 0, color: '#666' },
            boxShadow: { offsetX: 0, offsetY: 1, blur: 0, color: 'rgba(0, 0, 0, 0.5)' }
        },
        active: {
            color: '#ccc',
            background: { type: 'linear-gradient', start: '#029', end: '#026' },
            border: { color: '#026', width: 1, type: 'solid' },
            textShadow: { offsetX: 0, offsetY: 1, blur: 0, color: '#000' },
            boxShadow: 'none'
        }
    }
}


//-------------------------------------

FourBeat.SelectNumPlayersScene = {
	numPlayer : 4,
	musicId : 0,
	numPlayerLabel : null,
	finishCallback : null,
	upAction : function() {
	    this.numPlayer = this.numPlayer + 1;
	    if (this.numPlayer > 4) {
	        this.numPlayer = 4;
	    }
	    numPlayerLabel.text = this.numPlayer;
	},

	downAction : function() {
	    this.numPlayer = this.numPlayer - 1;
	    if (this.numPlayer < 1) {
	         this.numPlayer = 1;
	    }
	    numPlayerLabel.text = this.numPlayer;
	},
	okAction : function() {
		var game = Game.instance;
	    game.popScene();
	    this.finishCallback(this.numPlayer);
	},
	exitAction : function() {
		//history.back();
		FourBeat.finishActivity();
	},
	fourbeatListener : function(event, color) {
	    console.log(event + ", " + color);
		if (event != 'RELEASE') {
			return;
		}
		switch (color) {
		case 'RED':
			this.SelectNumPlayersScene.okAction();
			break;
		case 'BLUE':
		    this.SelectNumPlayersScene.downAction();
			break
		case 'YELLOW':
			this.SelectNumPlayersScene.upAction();
			break
	    case 'GREEN':
			this.SelectNumPlayersScene.exitAction();
	        break;
		default:
			break;
		}
	},
	show : function(callback) {
	    var game = Game.instance;
	    var self = this;
	    this.finishCallback = callback;

	    //
	    // Select player number screen
	    //   
	    var scene = new Scene();
	    scene.backgroundColor = 'rgba(0, 0, 0, 0)';
	    game.pushScene(scene);
	 
		//Game Name label
		var gameName_label = new Label("gameName");
	    gameName_label.color = "black";
	    gameName_label.font = "30px Palatino";
	    gameName_label.text = "100m走";
	    gameName_label.x = 175;
	    gameName_label.y = 50;
		scene.addChild(gameName_label);
	
		// Player Num label
		var playerNum_label = new Label("PlayerNum");
	    playerNum_label.color = "black";
	    playerNum_label.font = "30px Palatino";
	    playerNum_label.text = "Player Number";
	    playerNum_label.x = 75;
	    playerNum_label.y = 200;
		scene.addChild(playerNum_label);
	
		numPlayerLabel = new Label("Number");
	    numPlayerLabel.color = "black";
	    numPlayerLabel.font = "30px Palatino";
	    numPlayerLabel.x = 320;
	    numPlayerLabel.y = 200;
	    numPlayerLabel.text = this.numPlayer;
	    numPlayerLabel.id = "test";
	    scene.addChild(numPlayerLabel);
	
	    var button = new Button('Up', FourBeat.BUTTON_THEMES['yellow']);
	    button.moveTo(300, 150);
	    button.addEventListener("touchend", function() {
		    	self.upAction();
	        }
	    )
		scene.addChild(button);
	
	    var button = new Button('Down', FourBeat.BUTTON_THEMES['blue']);
	    button.moveTo(300, 250);
	    button.addEventListener("touchend", function() {
	    		self.downAction();
	        }
	    )
		scene.addChild(button);
		
	    var button = new Button('OK', FourBeat.BUTTON_THEMES['red']);
	    button.moveTo(100, 400);
	    button.addEventListener("touchend", function() {
	    		self.okAction();
	        }
	    )
		scene.addChild(button);
	
	    var button = new Button('Back', FourBeat.BUTTON_THEMES['green']);
	    button.moveTo(300, 400);
	    button.addEventListener("touchend", function() {
	    
	        }
	    )
		scene.addChild(button);
		
		FourBeat.enableFourBeatOnScene(scene, this.fourbeatListener);
	    FourBeat.playMusic(self.musicId);
	
	    game.start();
	}
}

//-------------------------------------

FourBeat.GameOverScene = {
	show : function(index, callback) {
	    var game = Game.instance;
	    var self = this;
	    
	    // シーン入れ替え
	    var scene = new Scene();
	
	    var bg = new Sprite(640, 400);
	    bg.image = game.assets["winner.png"];
	    bg.y = 40;
	    bg.frame = index;
	    scene.addChild(bg);
	    
	    game.pushScene(scene);
	
		//Game Name label
		var gameName_label = new Label("gameName");
	    gameName_label.color = "black";
	    gameName_label.font = "30px Palatino";
	    gameName_label.text = "Result";
	    gameName_label.x = 175;
	    gameName_label.y = 50;
	    scene.addChild(gameName_label);
	
	    // ゲームオーバーラベル
	    var winner_label = new Label("winner");
	    winner_label.color = "black";
	    winner_label.font = "30px Palatino";    
	    winner_label.text = FourBeat.FB_COLORS[index] + " Win!!" + '<br/>' + 
	    			FourBeat.FB_COLORS[0] + ': ' + gScores[0] + '<br/>' +
	                FourBeat.FB_COLORS[1] + ': ' + gScores[1] + '<br/>' +
	                FourBeat.FB_COLORS[2] + ': ' + gScores[2] + '<br/>' +
	                FourBeat.FB_COLORS[3] + ': ' + gScores[3];
	        
	    winner_label.x = 175;
	    winner_label.y = 150;
	    scene.addChild(winner_label);
	
		enableButton = false;		
	
		var button = null;
		setTimeout( function() {
		    button = new Button('Continue', FourBeat.BUTTON_THEMES['red']);
		    button.moveTo(100, 400);
		    button.addEventListener("touchend", function() {
		            self.continueAction(function() {
		            	callback();
		            })
		        }
		    )
			scene.addChild(button);
			
		    var button = new Button('Exit', FourBeat.BUTTON_THEMES['green']);
		    button.moveTo(300, 400);
		    button.addEventListener("touchend",  function() {
			    self.gameExitAction();
		    })
			scene.addChild(button);
			
			enableButton = true;		
		}, 1500);
		
		FourBeat.enableFourBeatOnScene(scene, function(event, color) {
			if (event != FourBeat.FB_EVENT_RELEASE) {
				return;
			}
			switch (color) {
			case FourBeat.FB_COLOR_RED:
				if (enableButton) {		
					self.continueAction(function() {
						callback();
					})
				}
				break;
			case FourBeat.FB_COLOR_BLUE:
				break;
			case FourBeat.FB_COLOR_YELLOW:
				break;
	 		case FourBeat.FB_COLOR_GREEN:
	 			if (enableButton) {
	 				self.gameExitAction();
	 			}
	   	   		break;
			default:
				break;
			}    
		});
		
	    FourBeat.playMusic(2);
	},
	enableButton : false,
	continueAction : function(callback) {
		var game = Game.instance;
	    game.popScene();
	    FourBeat.stopMusic();             	
	    callback();	    
	},
	gameExitAction : function() {
//	   	history.back();
	    FourBeat.stopMusic();
	    FourBeat.finishActivity();
	}
}


