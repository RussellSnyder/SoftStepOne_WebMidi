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