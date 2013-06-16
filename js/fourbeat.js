

var FourBeat = {
    FB_EVENT_PRESS : "PRESS",
    FB_EVENT_RELEASE : "RELEASE",
    FB_COLOR_RED : "RED",
    FB_COLOR_BLUE : "BLUE",
    FB_COLOR_YELLOW : "YELLOW",
    FB_COLOR_GREEN : "GREEN",
    FB_COLORS : ["RED", "BLUE", "YELLOW", "GREEN"],
    connected : false,

    finishActivity : function() {
        if (typeof FbNativeInterface === 'undefined') {
        } else {
            console.log("finishActivity");
            FbNativeInterface.finishActivity();
        }
    },
    preloadSound : function(game, uri, callback) {
        if (typeof FbNativeInterface === 'undefined') {
            game.preload(uri);
        } else {
            FbNativeInterface.preloadSound(uri);
            this.preloadSoundCallback = callback;
        }
    },
    loadSound : function(uri, callback) {
        FbNativeInterface.loadSound(uri);
        this.loadSoundCallback = callback;
    },
    setButtonEventListener : function(listener) {
        this.buttonListener = listener;
    },
    setArrowKeyEmulation : function(enable) {
        this.arrowKeyEmulation = enable;
    },
    playSound : function(id) {

    },
    playMusic2 : function(filePath) {
        if (typeof FbNativeInterface === 'undefined') {
            console.log("playMusic() on Android");
        } else {
            FbNativeInterface.playMusic2(filePath);
        }
    },
    playMusic : function(id) {
        if (typeof FbNativeInterface === 'undefined') {
            console.log("playMusic() on Android");
        } else {
            FbNativeInterface.playMusic(id);
        }
    },
    stopMusic : function() {
        if (typeof FbNativeInterface === 'undefined') {
            console.log("stopMusic() on Android");
        } else {
            FbNativeInterface.stopMusic();
        }
    }
}


//
// Call by Java
//
function nativeFourBeatEvent(fbEvent) {
    switch (fbEvent.eventType) {
    case 'button':
        FourBeat.buttonListener(fbEvent.state, fbEvent.color);
        break;
    case 'callback':
        switch (fbEvent.functionName) {
        case 'preloadSound':
            FourBeat.preloadSoundCallback(fbEvent.result);
            FourBeat.preloadSoundCallback = null;
            break;
        case 'loadSound':
            FourBeat.loadSoundCallback(fbEvent.result);
            FourBeat.loadSoundCallback = null;
            break;
        }
    }
}


//
// Arrow key FourBeat emulation
//
document.onkeydown = function(e) {
    if (FourBeat.arrowKeyEmulation) {
        e = e || window.event;

        if (e.keyCode == '38') {
            nativeFourBeatEvent('PRESS', 'RED');
        } else if (e.keyCode == '37') {
            nativeFourBeatEvent('PRESS', 'BLUE');
        } else if (e.keyCode == '39') {
            nativeFourBeatEvent('PRESS', 'YELLOW');
        } else if (e.keyCode == '40') {
            nativeFourBeatEvent('PRESS', 'GREEN');
        }
    }
}

