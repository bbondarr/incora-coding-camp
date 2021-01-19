const validate = require('./Validation')


class User {
    constructor(name, money) {
        this.name = validate.name(name)
        this.money = validate.positiveNumber(money)
    }

    play(casino, money) {
        validate.withdrawMoney(money, this.money)
        this.money -= money
        // Always playing gm with the most money to make NotEnoughMoneyError more rare
        const gm = casino.gameMachines.sort((a, b) => {
            return b.getMoney() - a.getMoney()
        })[0]
        this.money += gm.play(money)
    }
}
module.exports = User