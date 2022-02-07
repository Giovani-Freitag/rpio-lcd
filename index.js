import REPL from "repl";
import LCDController from "./src/lcd-controller.js";

let lcd = new LCDController();
lcd.print('Node.js i2c LCD', LCDController.CONST.LINEADDRESS[0]);
lcd.print('npm install rpio ', LCDController.CONST.LINEADDRESS[1]);

let repl = REPL.start('> ');
repl.context.lcd = lcd;