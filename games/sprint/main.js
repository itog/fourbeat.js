enchant();

Runner = enchant.Class.create(Sprite, {
    initialize: function(image) {
        var game = enchant.Game.instance;
        Sprite.call(this, 150, 150);
        this.image = game.assets[image];
        this.ONE_STEP = 6;
    },
    step: function() {
        this.x += this.ONE_STEP;
        if (this.frame < 7) {
            this.frame += 1;
        } else {
            this.frame = 0;
        }
    }
});

Player = enchant.Class.create(Runner, {
    initialize: function(image) {
        Runner.call(this, image);
    }
});

var gPlayers;
var gScores = [0,0,0,0];

window.onload = function() {
	var game = new Game(640, 480);
    console.log('load resources');
    game.preload(FIXED_BACKGROUND, MOVING_BACKGROUND,
       'runner_red.png', 'runner_blue.png', 'runner_yellow.png', 'runner_green.png', 'icon0.png');
	game.preload(FourBeat.IMAGE_RESOURCES);
	
	FourBeat.SelectNumPlayersScene.show(function(numPlayer) {
		changeToGameScene(numPlayer);
	});
};


//-------------------------------------

var SCREEN_WIDTH = 640;
var SCREEN_HEIGHT = 480;
var MOVING_BACKGROUND_WIDTH    = 1280;
var MOVING_BACKGROUND_HEIGHT   = 480;
var SCROLL_SPEED        = 4;
var FIXED_BACKGROUND    = "bg0.png";
var MOVING_BACKGROUND    = "bg1.png";
//-------------------------------------
var changeToGameScene = function(playerNum)
{
	console.log('start game with ' + playerNum + ' players');
    var game = Game.instance;

    game.addEventListener(Event.UP_BUTTON_DOWN, move);
	game.addEventListener(Event.DOWN_BUTTON_DOWN, move);
	game.addEventListener(Event.RIGHT_BUTTON_DOWN, move);
	game.addEventListener(Event.LEFT_BUTTON_DOWN, move);

    game.gameStatus = 0;
        
    game.onload = function() {

        var bg = new Sprite(SCREEN_WIDTH, SCREEN_HEIGHT);
        bg.image = game.assets[FIXED_BACKGROUND];
        game.rootScene.addChild(bg);

        //
        // Scroll background
        //
        var background = new Sprite(MOVING_BACKGROUND_WIDTH, MOVING_BACKGROUND_HEIGHT);
        background.image = game.assets[MOVING_BACKGROUND];
        background.frame = 0;
        background.moveTo(0, 0);
        background.onenterframe = function() {
            if (!game.gameRunning) {
                return ;
            }
            this.x -= SCROLL_SPEED;
            if (this.x <= -(background.width - game.width)) {
                background.moveTo(0, 0);
            }
        };
        game.rootScene.addChild(background);

        var info = new Label('');
        game.rootScene.addChild(info);

        var players = new Array(new Player('runner_red.png'), new Player('runner_blue.png'), new Player('runner_yellow.png'), new Player('runner_green.png'));
        gPlayers = players;

        players[0].y = 80;
        players[1].y = 140;
        players[1].frame = 5;
        players[1].frameOffset = 5;
        players[2].y = 200;
        players[2].frame = 10;
        players[2].frameOffset = 10;
        players[3].y = 300;
        players[3].frame = 15;
        players[3].frameOffset = 15;
        for (i = 0; i < playerNum; i++) {
            game.rootScene.addChild(players[i]);
        }

        var goal = new Sprite(10, 450);
        goal.backgroundColor = 'red';
        goal.x = 600;
        goal.y = 10;
        game.rootScene.addChild(goal);

        var countDown = new Sprite(16, 16);
        countDown.image = game.assets['icon0.png'];
        countDown.frame = 2;
        countDown.scale(4, 4);
        countDown.x = SCREEN_WIDTH / 2;
        countDown.y = SCREEN_HEIGHT / 2;
        game.rootScene.addChild(countDown);

        game.frameCount = 0;
        game.gameRunning = false;
        game.addEventListener('enterframe', function(e) {
//          console.log(e.elapsed);
            game.frameCount++;
            if (game.frameCount == 30) {
                countDown.frame = 1;
            } else if (game.frameCount == 60) {
                countDown.frame = 0;
            } else if (game.frameCount == 90) {
//                game.rootScene.removeChild(countDown);
                countDown.frame = 79;
                game.gameRunning = true;
            }
        });

        for (var i = 0; i < players.length; i++) {
            var j = i;
            players[i].addEventListener('enterframe', function() {
                // nothing to do
            });
        }

        goal.addEventListener('enterframe', function() {
            for (var i = 0; i < players.length; i++) {
                if (this.intersect(players[i])) {
                    gScores[i] += 1;
                    FourBeat.stopMusic();
                    FourBeat.GameOverScene.show(i, function() {
                        // reset the game status
                        console.log('reset the status');
                        game.frameCount = 0;
                        countDown.frame = 2;
                        game.gameRunning = false;

                        FourBeat.playMusic(1);
                        for (var j = 0; j < players.length; j++) {
                            players[j].x = 0;
                        }
                        FourBeat.enableFourBeatOnScene(game.rootScene, fourbeatCallbackGame);
                    });
                }
            }
        });

        game.rootScene.addEventListener('enterframe', function() {
            info.text = 'red: ' + gScores[0] + '<br/>' +
                'blue: ' + gScores[1] + '<br/>' +
                'yellow: ' + gScores[2] + '<br/>' +
                'green: ' + gScores[3];
        });

        FourBeat.enableFourBeatOnScene(game.rootScene, fourbeatCallbackGame);
    };

    game.start();
    FourBeat.playMusic(1);
}

fourbeatCallbackGame = function(event, color) {
    if (!Core.instance.gameRunning) {
        return;
    }
    if (event == FourBeat.FB_EVENT_PRESS) {
        switch (color) {
        case FourBeat.FB_COLOR_RED:
            gPlayers[0].step();
            break;
        case FourBeat.FB_COLOR_BLUE:
            gPlayers[1].step();
            break
        case FourBeat.FB_COLOR_YELLOW:
            gPlayers[2].step();
            break
        case FourBeat.FB_COLOR_GREEN:
            gPlayers[3].step();
            break;
        default:
            break;
        }
    }
}

function move(e){
	switch(e.type){
		case Event.UP_BUTTON_DOWN:
            fourbeatCallbackGame(null, 'RED');            
			break;		
		case Event.RIGHT_BUTTON_DOWN:
            fourbeatCallbackGame(null, 'BLUE');
			break;		
		case Event.LEFT_BUTTON_DOWN:
            fourbeatCallbackGame(null, 'YELLOW');
			break;	
        case Event.DOWN_BUTTON_DOWN:
            fourbeatCallbackGame(null, 'GREEN');
            break;      
		default:
			error("move()に不明なイベント" + e.type + "が渡されました。");
			break;		
	}
}




