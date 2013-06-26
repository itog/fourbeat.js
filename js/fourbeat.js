

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
            console.log('Warning : calling finishActivity() not on Android');
        } else {
            console.log("finishActivity");
            FbNativeInterface.finishActivity();
        }
    },
    preloadSound : function(game, uri, callback) {
        if (typeof FbNativeInterface === 'undefined') {
            console.log('Warning : calling preloadSound() not on Android');
        } else {
            FbNativeInterface.preloadSound(uri);
            this.preloadSoundCallback = callback;
        }
    },
    setButtonEventListener : function(listener) {
        this.buttonListener = listener;
    },
    setArrowKeyEmulation : function(enable) {
        this.arrowKeyEmulation = enable;
    },
    playSound : function(id) {
        if (typeof FbNativeInterface === 'undefined') {
            console.log('Warning : calling playSound() not on Android');
        } else {
            FbNativeInterface.playSound(id);
        }
    },
    playMusic : function(id) {
        if (typeof FbNativeInterface === 'undefined') {
            console.log('Warning : calling playMusic() not on Android');
        } else {
            FbNativeInterface.playMusic(id);
        }
    },
    playMusic2 : function(filePath) {
        if (typeof FbNativeInterface === 'undefined') {
            console.log('Warning : calling playMusic2() not on Android');
        } else {
            FbNativeInterface.playMusic2(filePath);
        }
    },
    stopMusic : function() {
        if (typeof FbNativeInterface === 'undefined') {
            console.log('Warning : calling stopMusic() not on Android');
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
            if (fbEvent.result === "ok") {
                FourBeat.preloadSoundCallback(fbEvent.id);
            }
            break;
    default:
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

