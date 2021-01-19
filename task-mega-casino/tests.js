const User = require('./User')
const SuperAdmin = require('./SuperAdmin')


let sa = new SuperAdmin('wu zi', 30000)
sa.createCasino('four dragons')
sa.createGameMachine(5000)
sa.createGameMachine(6500)
sa.createGameMachine(3000)
console.log('ADMIN: ', sa);
console.log('CASINO: ', sa.casino)


console.log('\n~~~~~~~~~~~~~~~~Play~~~~~~~~~~~~~~\n')
for (let i = 0; i < 5; i++) {
    sa.play(sa.casino, 100)
    console.log(`User money: ${sa.money}`, '\n~~~~~~~~~~~~~~')
}


console.log('\n~~~~~~~~~~Withdraw money~~~~~~~~~~\n')
console.log('CASINO: ', sa.casino)
let money = sa.withdrawCasinoMoney(5000)
console.log(sa.casino, '\nWITHDRAWN MONEY: ', money)
money = sa.withdrawCasinoMoney(22000)
console.log(sa.casino, '\nWITHDRAWN MONEY: ', money)


console.log('\n~~~~~~~~~~Add/Delete GM~~~~~~~~~~\n')
sa.createGameMachine(3000)
console.log(sa.casino)
sa.addMoney(2, 4500)
sa.deleteGameMachine(3)
console.log(sa.casino)


console.log('\n~~~~~~~~~~~~~~~Errors~~~~~~~~~~~~~\n')
// Withdraw -money 
try {
    const cj = new User('carl', 100)
    cj.play(sa.casino, 25)
    cj.play(sa.casino, 70)
    cj.play(sa.casino, 500)
} catch (err) {
    console.error(err.name, err.message);
}
try {
    sa.withdrawCasinoMoney(100000)
} catch (err) {
    console.error(err.name, err.message);
}
// Positive number validation
try {
    sa.createGameMachine(-300)
} catch (err) {
    console.error(err.name, err.message);
}
// Name validation
try {
    const lameUser = new User('lame username 123')
} catch (err) {
    console.error(err.name, err.message);
}
// Bad index
try {
    sa.deleteGameMachine(9)
} catch (err) {
    console.error(err.name, err.message);
}