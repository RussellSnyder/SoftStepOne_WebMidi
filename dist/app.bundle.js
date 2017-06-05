/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

// - Buttons Cntrl# 40
// -- 0-9
// - Color Cntrl# 41
// -- 0 green
// -- 1 red
// -- 2 orange?
// - State Cntrl# 42
// -- 0 off
// -- 1 on
// -- 2 blink
// -- 3 rapid blink
// -- 4 blink once (flash)

// Orange is  equivalent to sending a "Green On" message and a "Red On" message at the same time. This can lead to some funkiness if you aren't keeping track of what state you're sending.
//
// - "Orange Off" will always turn off an LED no matter what the color is.
//
// - If you turn on Orange and turn off Red the LED will be Green.
//
// - If Orange is on and you send a "Red On" message nothing will happen because Red is already on.
//
// - You can have intermediate flashing states.  For example Green On while Flashing Orange.  Do this by sending an"Orange On" message followed by a "Red Blink Slow" message.
//
// - etc... experiement for more

module.exports = (buttonNumber, color, state) => {
    var modifiedButtonNumber = buttonNumber
    if (buttonNumber === 0) {
        modifiedButtonNumber = 10
    }
    var colorInts = {
        'green': 0,
        'red': 1,
        'orange': 2
    }
    return [176, 40, modifiedButtonNumber - 1, 176, 41, colorInts[color], 176, 42, state]
}

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = {
    BUTTON_CHANNEL: 153,
    EXPRESSION_CHANNEL: 185,
    EXPRESSION_NOTE: 120,
    KEY_MAP: {
        60: 1,
        61: 2,
        62: 3,
        63: 4,
        64: 5,
        65: 6,
        66: 7,
        67: 8,
        68: 9,
        69: 0,
        120: 'expression'
    },
    BACKLIGHT_ON: [240, 0, 27, 72, 122, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 4, 0, 5, 8, 37, 1, 32, 0, 0, 123, 44, 0, 0, 0, 12, 247],
    BACKLIGHT_OFF: [240, 0, 27, 72, 122, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 4, 0, 5, 8, 37, 0, 32, 0, 0, 76, 28, 0, 0, 0, 12, 247],

}

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = {
    1: { active: false, value: 1, mappedToExpression: false},
    2: { active: false, value: 1, mappedToExpression: false},
    3: { active: false, value: 1, mappedToExpression: false},
    4: { active: false, value: 1, mappedToExpression: false},
    5: { active: false, value: 1, mappedToExpression: false},
    6: { active: false, value: 1, mappedToExpression: false},
    7: { active: false, value: 1, mappedToExpression: false},
    8: { active: false, value: 1, mappedToExpression: false},
    9: { active: false, value: 1, mappedToExpression: false},
    0: { active: false, value: 1, mappedToExpression: false},
    mappingModeActive: false,
    backlightOn: false,
    expression: 0
}


/***/ }),
/* 3 */,
/* 4 */
/***/ (function(module, exports) {

module.exports = (onMIDISuccess, onMIDIFailure) => {
    if (navigator.requestMIDIAccess) {
        navigator.requestMIDIAccess({
            sysex: true
        }).then(onMIDISuccess, onMIDIFailure);
    } else {
        alert("No MIDI support in your browser.");
    }
}

/***/ }),
/* 5 */,
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_constants_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_constants_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__components_constants_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_requestMidiAccess__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_requestMidiAccess___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__components_requestMidiAccess__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_initialState_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_initialState_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__components_initialState_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_initializationRoutine_js__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_initializationRoutine_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__components_initializationRoutine_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_translateLightMessages_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_translateLightMessages_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__components_translateLightMessages_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_translateSSInput_js__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_translateSSInput_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__components_translateSSInput_js__);







const MAPPING_MODE_CONTROL = 5


var midi, data, SS_I, SS2_I, SS_O, SS2_O;

__WEBPACK_IMPORTED_MODULE_1__components_requestMidiAccess___default()(onMIDISuccess, onMIDIFailure)

function onMIDIMessage(e) {
    var translatedMessage = __WEBPACK_IMPORTED_MODULE_5__components_translateSSInput_js___default()(e.data, __WEBPACK_IMPORTED_MODULE_0__components_constants_js___default.a)
    if (translatedMessage) {
        modifyButtonStates(translatedMessage)
        modifyExpressionStateValues(translatedMessage)
        modifyLights(translatedMessage)
    }
}

function modifyExpressionStateValues(translatedMessage) {
    if (translatedMessage.key === "expression") {
        __WEBPACK_IMPORTED_MODULE_2__components_initialState_js___default.a.expression = translatedMessage.value
        Object.keys(__WEBPACK_IMPORTED_MODULE_2__components_initialState_js___default.a).forEach((entry) => {
            if (__WEBPACK_IMPORTED_MODULE_2__components_initialState_js___default.a[entry].mappedToExpression) {
                __WEBPACK_IMPORTED_MODULE_2__components_initialState_js___default.a[entry].value = translatedMessage.value
            }
        })
    }
}

function modifyLights(translatedMessage) {
    if (__WEBPACK_IMPORTED_MODULE_2__components_initialState_js___default.a.mappingModeActive && !__WEBPACK_IMPORTED_MODULE_2__components_initialState_js___default.a.backlightOn) {
        SS_O.send(__WEBPACK_IMPORTED_MODULE_0__components_constants_js___default.a.BACKLIGHT_ON)
        __WEBPACK_IMPORTED_MODULE_2__components_initialState_js___default.a.backlightOn = true
    }
    if (!__WEBPACK_IMPORTED_MODULE_2__components_initialState_js___default.a.mappingModeActive && __WEBPACK_IMPORTED_MODULE_2__components_initialState_js___default.a.backlightOn) {
        SS_O.send(__WEBPACK_IMPORTED_MODULE_0__components_constants_js___default.a.BACKLIGHT_OFF)
        __WEBPACK_IMPORTED_MODULE_2__components_initialState_js___default.a.backlightOn = false
    }
    if (__WEBPACK_IMPORTED_MODULE_2__components_initialState_js___default.a[translatedMessage.key].active) {
        if (__WEBPACK_IMPORTED_MODULE_2__components_initialState_js___default.a[translatedMessage.key].mappedToExpression) {
            SS_O.send(__WEBPACK_IMPORTED_MODULE_4__components_translateLightMessages_js___default()(translatedMessage.key, 'red', 2))
        }
    }
    if (__WEBPACK_IMPORTED_MODULE_2__components_initialState_js___default.a[translatedMessage.key].active && !__WEBPACK_IMPORTED_MODULE_2__components_initialState_js___default.a[translatedMessage.key].mappedToExpression) {
        SS_O.send(__WEBPACK_IMPORTED_MODULE_4__components_translateLightMessages_js___default()(translatedMessage.key, 'red', 1))
    }
}


function modifyButtonStates(m) {
    if (Number.isInteger(parseInt(m.key))) {
        if (!__WEBPACK_IMPORTED_MODULE_2__components_initialState_js___default.a.mappingModeActive && m.key !== MAPPING_MODE_CONTROL) {
            __WEBPACK_IMPORTED_MODULE_2__components_initialState_js___default.a[m.key].active = !__WEBPACK_IMPORTED_MODULE_2__components_initialState_js___default.a[m.key].active
        }
        if (__WEBPACK_IMPORTED_MODULE_2__components_initialState_js___default.a.mappingModeActive && m.key !== MAPPING_MODE_CONTROL) {
            __WEBPACK_IMPORTED_MODULE_2__components_initialState_js___default.a[m.key].mappedToExpression = !__WEBPACK_IMPORTED_MODULE_2__components_initialState_js___default.a[m.key].mappedToExpression
            __WEBPACK_IMPORTED_MODULE_2__components_initialState_js___default.a[m.key].active = true
            __WEBPACK_IMPORTED_MODULE_2__components_initialState_js___default.a.mappingModeActive = false
        }
        if (m.key === MAPPING_MODE_CONTROL) {
            __WEBPACK_IMPORTED_MODULE_2__components_initialState_js___default.a.mappingModeActive = !__WEBPACK_IMPORTED_MODULE_2__components_initialState_js___default.a.mappingModeActive
        }
    }
}


// midi functions
function onMIDISuccess(midiAccess) {
    console.log('midi connected')
    midi = midiAccess; // this is our raw MIDI data, inputs, outputs, and sysex status

    var inputs = midi.inputs.values();
    // loop over all available inputs and listen for any MIDI input
    for (var input = inputs.next(); input && !input.done; input = inputs.next()) {
        // each time there is a midi message call the onMIDIMessage function
        if (input.name === "SSCOM") {
            SS_I = input;
            console.log('SSCOM input registered')
        }
        if (input.name === "MIDIIN2 (SSCOM)") {
            SS2_I = input;
        }
        input.value.onmidimessage = onMIDIMessage;
    }

    var outputs = midi.outputs.values();
    for (var output = outputs.next(); output && !output.done; output = outputs.next()) {
        if (output.value.name === "SSCOM") {
            SS_O = output.value
            console.log('SSCOM output registered')
            __WEBPACK_IMPORTED_MODULE_3__components_initializationRoutine_js___default()(SS_O, __WEBPACK_IMPORTED_MODULE_4__components_translateLightMessages_js___default.a, __WEBPACK_IMPORTED_MODULE_0__components_constants_js___default.a)
        }
        if (output.value.name === "MIDIOUT2 (SSCOM)") {
            SS2_O = output.value
        }
    }

}

function onMIDIFailure(error) {
    console.log("No access to MIDI devices or your browser doesn't support WebMIDI API. Please use WebMIDIAPIShim " + error);
}



/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = (array, CONSTANTS) => {
    var channel = array[0];
    var note = array[1];
    var value = array[2] / 127;

    if (channel === CONSTANTS.BUTTON_CHANNEL) {
        // ignore off messages (0) so more like a toggle
        if (value) {
            return {
                key: CONSTANTS.KEY_MAP[note],
                value: value
            }
        } else if (value === 0) {
            return null
        } else {
            console.log(note + ' could not be translated')
        }
    }
    if (channel === CONSTANTS.EXPRESSION_CHANNEL && note === CONSTANTS.EXPRESSION_NOTE) {
        return {
            key: 'expression',
            value: value
        }
    }
}


/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = (SS_O, translateLightMessages, CONSTANTS) => {
    SS_O.send(CONSTANTS.BACKLIGHT_OFF)

    '    '.split("").forEach((letter, index) => {
        SS_O.send(getLetterCode(letter, index))
    })
    'Bad Ass MoFo    Ru55'.split("").forEach((letter, index) => {
        var clippedIndex = index % 4
        setTimeout(() => {
            SS_O.send(getLetterCode(letter, clippedIndex))
        }, index * 100)
    })
    for (var i = 1; i <= 10; i++ ) {
        let speed = 30;
        sendLightMessageWithTimeout(i, 'green', 2, speed, speed * 10, SS_O, translateLightMessages)
        sendLightMessageWithTimeout(i, 'red', 2, speed, speed * 20, SS_O, translateLightMessages)
        sendLightMessageWithTimeout(i, 'orange', 2, speed, speed * 30, SS_O, translateLightMessages)
        sendLightMessageWithTimeout(i, 'orange', 0, speed, speed * 40, SS_O, translateLightMessages)
        sendLightMessageWithTimeout(i, 'green', 0, speed, speed * 40, SS_O, translateLightMessages)
        sendLightMessageWithTimeout(i, 'red', 0, speed, speed * 40, SS_O, translateLightMessages)
    }
}

function sendLightMessageWithTimeout(i, color, value, speed, time_offset, SS_O, translateLightMessages) {
    setTimeout(() => {
        SS_O.send(translateLightMessages(i, color, value))
    }, i * speed + time_offset)
}

function getLetterCode(letter, placement) {
    return [176, 50 + placement, letter.charCodeAt(0)]
}


/***/ })
/******/ ]);