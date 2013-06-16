enchant();

var SCREEN_WIDTH = 640;
var SCREEN_HEIGHT = 480;

window.onload = function() {
	var game = new Core(SCREEN_WIDTH, SCREEN_HEIGHT);

    FourBeat.enableFourBeatOnScene(game.rootScene, function(event, color) {
        if (event == FourBeat.FB_EVENT_PRESS) {
            switch (color) {
            case FourBeat.FB_COLOR_RED:
                console.log('red');
                break;
            case FourBeat.FB_COLOR_BLUE:
                console.log('blue');
                break
            case FourBeat.FB_COLOR_YELLOW:
                console.log('yellow');
                break
            case FourBeat.FB_COLOR_GREEN:
                console.log('green');
                break;
            default:
                break;
            }
        }
    });
    game.start();
};





