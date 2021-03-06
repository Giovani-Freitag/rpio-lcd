export default {

    CHR: 1,
    CMD: 0,

    ENABLE: 0x04,
    BACKLIGHT: 0x08,

    // Commands
    CLEARDISPLAY: 0x01,
    RETURNHOME: 0x02,
    ENTRYMODESET: 0x04,
    DISPLAYCONTROL: 0x08,
    CURSORSHIFT: 0x10,
    FUNCTIONSET: 0x20,
    SETCGRAMADDR: 0x40,
    SETDDRAMADDR: 0x80,

    // display entry mode
    ENTRYRIGHT: 0x00,
    ENTRYLEFT: 0x02,
    ENTRYSHIFTINCREMENT: 0x01,
    ENTRYSHIFTDECREMENT: 0x00,

    // Display state
    DISPLAYON: 0x04,
    DISPLAYOFF: 0x00,
    CURSORON: 0x02,
    CURSOROFF: 0x00,
    BLINKON: 0x01,
    BLINKOFF: 0x00,

    LINEADDRESS: [0x80, 0xC0, 0x94, 0xD4],

    _8BITMODE: 0x10,
    _4BITMODE: 0x00,
    _2LINE: 0x08,
    _1LINE: 0x00,
    _5x10DOTS: 0x04,
    _5x8DOTS: 0x00,
}