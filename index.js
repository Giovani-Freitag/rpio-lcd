import REPL from "repl";
import LCDController from "./src/lcd-controller.js";

let lcd = new LCDController({address: 0x27});

lcd.poweron()
    .print('Node.js i2c LCD', 1)
    .print('npm install rpio', 2);

let repl = REPL.start('> ');
repl.context.lcd = lcd;