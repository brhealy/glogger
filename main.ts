enum RadioMessage {
    message1 = 49434,
    start = 56380,
    reset = 40993,
    next = 26510
}
radio.onReceivedMessage(RadioMessage.reset, function () {
    music.playMelody("F F E E D D C C ", 400)
    basic.showString("A")
    datalogger.deleteLog()
    logging = false
    launch = 1
    datalogger.setColumnTitles(
    "launch",
    "g"
    )
    music.stopMelody(MelodyStopOptions.All)
    radio.sendNumber(launch)
})
radio.onReceivedMessage(RadioMessage.start, function () {
    basic.showNumber(launch)
    logging = !(logging)
    if (logging) {
        basic.showIcon(IconNames.Heart)
        radio.sendValue("launch", launch)
    } else {
        basic.clearScreen()
    }
})
datalogger.onLogFull(function () {
    logging = false
    basic.showIcon(IconNames.Sad)
})
radio.onReceivedMessage(RadioMessage.next, function () {
    launch += 1
    logging = !(logging)
    basic.showIcon(IconNames.No)
    music.stopAllSounds()
})
let g = 0
let launch = 0
let logging = false
radio.setGroup(1)
logging = false
launch = 1
radio.sendNumber(launch)
input.setAccelerometerRange(AcceleratorRange.EightG)
datalogger.setColumnTitles(
"launch",
"g"
)
basic.showString("A")
basic.forever(function () {
    g = input.acceleration(Dimension.Strength)
    if (logging) {
        music.ringTone(262)
        datalogger.log(
        datalogger.createCV("launch", launch),
        datalogger.createCV("g", g)
        )
        radio.sendValue("g", g)
        radio.sendValue("launch", launch)
    }
})
