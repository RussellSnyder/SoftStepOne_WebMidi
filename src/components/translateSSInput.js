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
