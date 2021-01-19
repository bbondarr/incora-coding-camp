class Validation {
    static positiveNumber(val) {
        val = val * 1
        if (val <= 0) {
            throw new RangeError(`Value(${val}) must be a positive number`)
        }
        return val
    }

    static intInRange(val, min, max) {
        val = val * 1
        if (val !== Math.round(val) || min > val || val >= max) {
            throw new RangeError(`Value(${val}) must be an integer in range [${min}, ${max})`)
        }
        return val
    }
    
    static withdrawMoney(placeMoney, fullMoney, coef=1) {
        placeMoney = Validation.positiveNumber(placeMoney)
        if (placeMoney > coef * fullMoney) {
            throw new RangeError(
                `Your sum of money(${placeMoney}) is too high, try lowering it (max value - ${coef * fullMoney})`) 
        }
    }

    static name(val) {
        if (typeof(val) !== 'string' || val.search(/^[a-zA-Z\s]*$/) === -1) {
            throw new TypeError(
                `Value(${val}) must be a string, containing letters and spaces only`
            )
        }
        return val
    }

}
module.exports = Validation