const validate = require('./Validation')


class GameMachine {
    constructor(money) {
        this.money = validate.positiveNumber(money)
    }

    getMoney() {
        return this.money
    }

    withdrawMoney(money) {
        validate.withdrawMoney(money, this.money)
        this.money = this.money - money
        return money
    }

    placeMoney(money) {
        validate.positiveNumber(money)
        this.money += money
    }

    play(money) {
        validate.withdrawMoney(money, this.money, 3)

        this.money += money
        console.log(`You entered the game with ${money}$, good luck!`)
        let roll = Math.floor(100 + (Math.random() * 900))
        console.log(`Your roll is... 🎰`)
        console.log(roll)
        let digits = new Set()
        while (roll > 0) {
            let digit = roll % 10
            digits.add(digit)
            roll = Math.floor(roll / 10)
        }
        const coef = digits.size === 3 ? 0 : 4 - digits.size 
        
        this.money -= money * coef
        return money * coef
    }
}
module.exports = GameMachine