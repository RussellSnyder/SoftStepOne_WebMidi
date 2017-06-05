import CONSTANTS from './components/constants.js'
import requestMidiAcess from './components/requestMidiAccess'
import SS_State from './components/initialState.js'
import initializationRoutine from './components/initializationRoutine.js'
import translateLightMessages from './components/translateLightMessages.js'
import translateSSInput from './components/translateSSInput.js'

const MAPPING_MODE_CONTROL = 5


var midi, data, SS_I, SS2_I, SS_O, SS2_O;

requestMidiAcess(onMIDISuccess, onMIDIFailure)

function onMIDIMessage(e) {
    var translatedMessage = translateSSInput(e.data, CONSTANTS)
    if (translatedMessage) {
        modifyButtonStates(translatedMessage)
        modifyExpressionStateValues(translatedMessage)
        modifyLights(translatedMessage)
    }
}

function modifyExpressionStateValues(translatedMessage) {
    if (translatedMessage.key === "expression") {
        SS_State.expression = translatedMessage.value
        Object.keys(SS_State).forEach((entry) => {
            if (SS_State[entry].mappedToExpression) {
                SS_State[entry].value = translatedMessage.value
            }
        })
    }
}

function modifyLights(translatedMessage) {
    if (SS_State.mappingModeActive && !SS_State.backlightOn) {
        SS_O.send(CONSTANTS.BACKLIGHT_ON)
        SS_State.backlightOn = true
    }
    if (!SS_State.mappingModeActive && SS_State.backlightOn) {
        SS_O.send(CONSTANTS.BACKLIGHT_OFF)
        SS_State.backlightOn = false
    }
    if (SS_State[translatedMessage.key].active) {
        if (SS_State[translatedMessage.key].mappedToExpression) {
            SS_O.send(translateLightMessages(translatedMessage.key, 'red', 2))
        }
    }
    if (SS_State[translatedMessage.key].active && !SS_State[translatedMessage.key].mappedToExpression) {
        SS_O.send(translateLightMessages(translatedMessage.key, 'red', 1))
    }
}


function modifyButtonStates(m) {
    if (Number.isInteger(parseInt(m.key))) {
        if (!SS_State.mappingModeActive && m.key !== MAPPING_MODE_CONTROL) {
            SS_State[m.key].active = !SS_State[m.key].active
        }
        if (SS_State.mappingModeActive && m.key !== MAPPING_MODE_CONTROL) {
            SS_State[m.key].mappedToExpression = !SS_State[m.key].mappedToExpression
            SS_State[m.key].active = true
            SS_State.mappingModeActive = false
        }
        if (m.key === MAPPING_MODE_CONTROL) {
            SS_State.mappingModeActive = !SS_State.mappingModeActive
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
            initializationRoutine(SS_O, translateLightMessages, CONSTANTS)
        }
        if (output.value.name === "MIDIOUT2 (SSCOM)") {
            SS2_O = output.value
        }
    }

}

function onMIDIFailure(error) {
    console.log("No access to MIDI devices or your browser doesn't support WebMIDI API. Please use WebMIDIAPIShim " + error);
}

