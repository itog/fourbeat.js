#fourbeat.js

JavaScript library for FourBeat


Using enchant.js
https://github.com/wise9/enchant.js/


##使い方 (fourbeat.enchant.js)

###FourBeatを有効にする
enchant.jsのシーン上でFourBeatを有効にするにはenableFourBeatOnSceneを呼びます。FourBeatが接続されていない時は画面上にエミュレートボタンを表示するします。

    FourBeat.enableFourBeatOnScene(scene, listener); 

sceneはenchant.jsで定義されているシーンオブジェクト、listenerはFourBeatからのイベントを受けるリスナーです。

リスナーはevent, colorを引数にもつ関数です。

	listener = function(event, color) {
	    if (event == 'PRESS') {
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
	}


###よく使うシーン

####プレイヤー数選択画面
プレイヤー数を選択する画面です。決定するとコールバックにプレイヤー数が渡されます。
	FourBeat.SelectNumPlayersScene.show(function(num) {
			console.log('Start game with ' + num + 'players);
		}
	});

####ゲームオーバー画面
ゲームが終了したときの画面を表示します。第一引数で、勝利したプレーヤーのインデックスを渡します。第二引数はコンティニューが選択された場合のコールバックです。

	FourBeat.GameOverScene.show(i, function() {
    	console.log('continue the game');
    });


---
Copyright (C) 2013 PIGMAL LLC - http://pigmal.com

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
