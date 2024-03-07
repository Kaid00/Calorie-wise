import { genPassword } from "./gen_pwrd";

export  function genMultPassword(repeat: number = 2, number: Boolean = true, special: Boolean = true, length: number = 12, upper: Boolean = true  ) {
    for(let i = 0; i < repeat; i++) {
        genPassword(number,special, length, upper)
    }
}
