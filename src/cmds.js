export default {

    CHR: 1,
    CMD: 0,

    // Commands
    CLEARDISPLAY: 0x01,
    DISPLAYCONTROL: 0x08,
    ENABLE: 0x04,
    BACKLIGHT: 0x08,

    // Display state
    DISPLAYON: 0x04,
    DISPLAYOFF: 0x00,

    LINEADDRESS: [0x80, 0xC0, 0x94, 0xD4],
}