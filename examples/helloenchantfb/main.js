enchant();

var SCREEN_WIDTH = 640;
var SCREEN_HEIGHT = 480;

window.onload = function() {
    var game = new Core(SCREEN_WIDTH, SCREEN_HEIGHT);

    var label = new Label("test");
    label.x = 100;
    label.y = 200;
    game.rootScene.addChild(label)

    FourBeat.enableFourBeatOnScene(game.rootScene, function(event, color) {
        if (event == FourBeat.FB_EVENT_PRESS) {
            switch (color) {
            case FourBeat.FB_COLOR_RED:
		label.text = 'red';
                break;
            case FourBeat.FB_COLOR_BLUE:
		label.text = 'blue';
                break
            case FourBeat.FB_COLOR_YELLOW:
		label.text = 'yellow';
                break
            case FourBeat.FB_COLOR_GREEN:
		label.text = 'green';
                break;
            default:
                break;
            }
        }
    });
    game.start();
};





