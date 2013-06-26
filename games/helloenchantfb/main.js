enchant();

var SCREEN_WIDTH = 640;
var SCREEN_HEIGHT = 480;

var CHARA_IMAGE_NAME = "http://enchantjs.com/assets/images/chara1.gif";
var BACKGROUND_IMG_1 = "fb1.jpg";
var BACKGROUND_IMG_2 = "fb2.jpg";

window.onload = function() {
    var game = new Core(SCREEN_WIDTH, SCREEN_HEIGHT);
    game.preload(CHARA_IMAGE_NAME, BACKGROUND_IMG_1, BACKGROUND_IMG_2);
    game.fps = 30;

    console.log('load sound');
    FourBeat.preloadSound(game, "nande.ogg", function(id) {
        console.log("loaded sound id = " + id);
        game.soundId = id;
    });

    game.onload = function() {
        var sprite = new Sprite(SCREEN_WIDTH, SCREEN_HEIGHT);
        sprite.image = game.assets[BACKGROUND_IMG_1];
        game.rootScene.addChild(sprite);

        var label = new Label("test");
        label.x = SCREEN_WIDTH / 2;
        label.y = SCREEN_HEIGHT / 2;
        game.rootScene.addChild(label);

        FourBeat.enableFourBeatOnScene(game.rootScene, function(event, color) {
            if (event == FourBeat.FB_EVENT_PRESS) {
                switch (color) {
                case FourBeat.FB_COLOR_RED:
                    label.text = 'scene1: red';
                    game.pushScene(game.scene2);
                    break;
                case FourBeat.FB_COLOR_BLUE:
                    label.text = 'scene1: blue';
                    console.log('play sound id = ' + game.soundId);
                    FourBeat.playSound(game.id);
                    break
                case FourBeat.FB_COLOR_YELLOW:
                    label.text = 'scene1: yellow';
                    break
                case FourBeat.FB_COLOR_GREEN:
                    label.text = 'scene1: green';
                    break;
                default:
                    break;
                }
            }
        });
        game.scene2 = function() {
            game = Core.instance;
            var scene = new Scene();
            
            var sprite = new Sprite(640, 480);
            sprite.image = game.assets[BACKGROUND_IMG_2];
            scene.addChild(sprite);

            var label = new Label("test");
            label.x = SCREEN_WIDTH / 2;
            label.y = SCREEN_HEIGHT;
            scene.addChild(label);

            var sprite = new Sprite(32, 32);
            sprite.image = game.assets[CHARA_IMAGE_NAME];
            scene.addChild(sprite);

            var movingStep = 0;
            game.addEventListener(Event.ENTER_FRAME, function() {
//                console.log('enterframe');
                sprite.x += movingStep;
            });

            FourBeat.enableFourBeatOnScene(scene, function(event, color) {
                if (event == FourBeat.FB_EVENT_PRESS) {
                    switch (color) {
                    case FourBeat.FB_COLOR_RED:
                        label.text = 'scene2: red';
                        movingStep = 0;
                        break;
                    case FourBeat.FB_COLOR_BLUE:
                        label.text = 'scene2: blue';
                        movingStep = -2;
                        break
                    case FourBeat.FB_COLOR_YELLOW:
                        label.text = 'scene2: yellow';
                        movingStep = 2;
                        break
                    case FourBeat.FB_COLOR_GREEN:
                        label.text = 'scene2: green';
                        movingStep = 0;
                        game.popScene();
                        break;
                    default:
                        break;
                    }
                }
            });
            return scene;
        }();
    }
    game.start();
};

