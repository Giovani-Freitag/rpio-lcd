import RPIO from "rpio";
import LCD from "./cmds.js";

export default class LCDController{

    constructor(conf){

        this.address = conf.address;
    }

    poweron(){

        RPIO.i2cBegin();
        RPIO.i2cSetSlaveAddress(this.address);
        RPIO.i2cSetBaudRate(9600);

        this.init();
        return this;
    }

    poweroff(){
        this.off();
        RPIO.i2cEnd();

        return this;
    }

    init(){

        this.write4(0x33, LCD.CMD); //initialization
        this.write4(0x32, LCD.CMD); //initialization
        this.write4(0x06, LCD.CMD); //initialization
        this.write4(0x28, LCD.CMD); //initialization
        this.write4(0x01, LCD.CMD); //initialization

        this.write4(LCD.FUNCTIONSET | LCD._4BITMODE | LCD._2LINE | LCD._5x10DOTS, LCD.CMD); //4 bit - 2 line 5x7 matrix

        this.write(LCD.DISPLAYCONTROL | LCD.DISPLAYON, LCD.CMD); //turn cursor off 0x0E to enable cursor
        this.write(LCD.ENTRYMODESET | LCD.ENTRYLEFT, LCD.CMD); //shift cursor right
        this.write(LCD.CLEARDISPLAY, LCD.CMD); // LCD clear
        this.write(LCD.BACKLIGHT, LCD.CHR); //Turn on backlight.

    }

    init2(){

        [0x30, 0x30, 0x30, 0x02, 0x28, 0x0c, 0x01, 0x06]
            .forEach(n => this.write(n, LCD.CMD));
    }


    write4(data, mode){
        let n = (data & 0xF0);
        RPIO.i2cWrite(Buffer.from([(n | LCD.BACKLIGHT | mode)]));
        RPIO.i2cWrite(Buffer.from([(n | LCD.ENABLE | LCD.BACKLIGHT | mode)]));
        RPIO.i2cWrite(Buffer.from([(n | LCD.BACKLIGHT | mode)]));
    }

    write(data, mode){
        this.write4(data, mode);
        this.write4((data << 4), mode);
    }

    on() {
        LCD.BACKLIGHT = 0x08;
        this.write(LCD.DISPLAYCONTROL | LCD.DISPLAYON, LCD.CMD);
        return this;
    }

    off() {
        LCD.BACKLIGHT = 0x00;
        this.write(LCD.DISPLAYCONTROL | LCD.DISPLAYOFF, LCD.CMD);
        return this;
    }

    clear(){
        this.write(LCD.CLEARDISPLAY, LCD.CMD);
        return this;
    }

    home() {
        this.write(LCD.SETDDRAMADDR | 0x00, LCD.CMD);
        return this;
    }

    cursorAt(x, y) {
        var l = [0x00, 0x40, 0x14, 0x54];
        this.write(LCD.SETDDRAMADDR | (l[y] + x), LCD.CMD);
        return this;
    }

    
    cursorFull() {
        return this.write(LCD.DISPLAYCONTROL | LCD.DISPLAYON | LCD.CURSORON | LCD.BLINKON, LCD.CMD);
    };

    cursorUnder() {
        return this.write(LCD.DISPLAYCONTROL | LCD.DISPLAYON | LCD.CURSORON | LCD.BLINKOFF, LCD.CMD);
    }

    blinkOff() {
        return this.write(LCD.DISPLAYCONTROL | LCD.DISPLAYON | LCD.CURSOROFF | LCD.BLINKOFF, LCD.CMD);
    }

    blinkOn() {
        return this.write(LCD.DISPLAYCONTROL | LCD.DISPLAYON | LCD.CURSORON | LCD.BLINKOFF, LCD.CMD);
    }

    cursorOff() {
        return this.write(LCD.DISPLAYCONTROL | LCD.DISPLAYON | LCD.CURSOROFF | LCD.BLINKON, LCD.CMD);
    }

    cursorOn() {
        return this.write(LCD.DISPLAYCONTROL | LCD.DISPLAYON | LCD.CURSORON | LCD.BLINKON, LCD.CMD);
    }

    print(str, line) {

        this.write(LCD.LINEADDRESS[line-1], LCD.CMD);

        str.split('')
            .forEach(c => this.write(c.charCodeAt(), LCD.CHR));

        return this;
    }
}