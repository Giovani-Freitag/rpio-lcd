import RPIO from "rpio";
import LCD from "./cmds.js";

export default class LCDController{

    static CONST = LCD;

    constructor(){

        RPIO.i2cBegin();
        RPIO.i2cSetSlaveAddress(0x27);
        RPIO.i2cSetBaudRate(10000);
    }

    clear(){

        this.write(LCD.CLEARDISPLAY, LCD.CMD);
    }


    write4(data){
        RPIO.i2cWrite(Buffer.from([(data | LCD.BACKLIGHT)]));
        RPIO.i2cWrite(Buffer.from([(data | LCD.ENABLE | LCD.BACKLIGHT)]));
        RPIO.i2cWrite(Buffer.from([((data & ~LCD.ENABLE) | LCD.BACKLIGHT)]));
    }

    write(data, mode){
        this.write4(mode | (data & 0xF0));
        this.write4(mode | ((data << 4) & 0xF0));
    }

    off() {
        LCD.BACKLIGHT = 0x00;
        this.write(LCD.DISPLAYCONTROL | LCD.DISPLAYOFF, LCD.CMD);
    }

    on() {
        LCD.BACKLIGHT = 0x08;
        this.write(LCD.DISPLAYCONTROL | LCD.DISPLAYON, LCD.CMD);
    }

    print(str, line) {

        this.write(line, LCD.CMD);

        str.split('').forEach((c) => {
            this.write(c.charCodeAt(0), LCD.CHR);
        });
    }
}