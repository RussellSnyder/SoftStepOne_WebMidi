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
