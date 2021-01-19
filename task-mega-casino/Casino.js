const validate = require('./Validation')


class Casino {
    constructor(name) {
        this.name = validate.name(name)
        this.gameMachines = []
    }

    getMoney() {
        const money = this.gameMachines.reduce((sum, curr) => {
            sum + curr.getMoney()
        }, 0)
        return money
    }

    getMachineCount() {
        return this.gameMachines.length
    }
}
module.exports = Casino