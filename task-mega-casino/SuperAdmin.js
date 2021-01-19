const User = require('./User')
const Casino = require('./Casino')
const GameMachine = require('./GameMachine')
const validate = require('./Validation')


class SuperAdmin extends User {
    constructor(name, money) {
        super(name, money)

        this.casino = undefined
    }

    createCasino(casinoName) {
        this.casino = new Casino(casinoName)
    }

    createGameMachine(money) {
        validate.withdrawMoney(money, this.money)

        this.casino.gameMachines.push(new GameMachine(money))
        this.casino.gameMachines.sort((a, b) => {
            return b.getMoney() - a.getMoney()
        })
        this.money -= money
    }

    withdrawCasinoMoney(money) {
        let sum = 0
        for (const gm of this.casino.gameMachines) {
            if (sum !== money) {
                const moneyToWithdraw = gm.getMoney() >= money-sum ? money-sum : gm.getMoney()
                sum += gm.withdrawMoney(moneyToWithdraw)
            }
        }
        return sum
    }

    addMoney(index, money) {
        validate.intInRange(index, 0, this.casino.getMachineCount())
        validate.withdrawMoney(money, this.money)

        this.casino.gameMachines.sort((a, b) => {
            return b.getMoney() - a.getMoney()
        })
        this.casino.gameMachines[index].placeMoney(money)
    }

    deleteGameMachine(index) {
        validate.intInRange(index, 0, this.casino.getMachineCount())

        const money = this.casino.gameMachines[index].getMoney()
        this.casino.gameMachines.slice(index, index+1)
        if (money !== 0) {
            const splitMoney = money / this.casino.getMachineCount()
            this.casino.gameMachines.forEach(gm => gm.placeMoney(splitMoney))
        }
    }
}
module.exports = SuperAdmin