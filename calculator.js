class Calculator {
    constructor(upperValContent, lowerValContent) {
        this.upperValContent = upperValContent
        this.lowerValContent = lowerValContent
        this.lowerVal = ''
        this.upperVal = ''
        this.operator = undefined
    }

    calAction(action) {
        switch (action) {
            case 'allClear':
                this.upperVal = ''
                this.lowerVal = '0'
                this.operator = undefined
                break
            case 'del':
                let valToString = this.lowerVal.toString()
                this.lowerVal = valToString.slice(0, -1)
                break
            case 'process':
                const topV = parseFloat(this.upperVal)
                const lowerV = parseFloat(this.lowerVal)
                if (isNaN(topV) || isNaN(lowerV)) return
                let result
                switch (this.operator) {
                    case '%':
                        result = topV % lowerV
                        break
                    case '/':
                        result = topV / lowerV
                        break
                    case '*':
                        result = topV * lowerV
                        break
                    case '-':
                        result = topV - lowerV
                        break
                    case '+':
                        result = topV + lowerV
                        break
                    default:
                        return
                }
                this.lowerVal = result
                this.upperVal = ''
                this.operator = undefined
                break
            default:
                return
        }
    }

    setOperator(operator) {
        if (this.lowerVal === '') return
        if (this.upperVal !== '') {
            this.calAction('process')
        }
        switch (operator) {
            case 'modulus':
                this.operator = '%'
                break
            case 'divide':
                this.operator = '/'
                break
            case 'multiple':
                this.operator = '*'
                break
            case 'subtract':
                this.operator = '-'
                break
            case 'add':
                this.operator = '+'
                break
            default:
                return
        }
        this.upperVal = this.lowerVal
        this.lowerVal = ''
    }

    calAppend(value) {
        if (value === '.' && this.lowerVal.includes('.')) return
        this.lowerVal = this.lowerVal.toString() + value.toString()
    }

    getCurrentValues(number) {
        const stringToNumber = number.toString()
        const integerSplice = parseFloat(stringToNumber.split('.')[0])
        const decimalSplice = stringToNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerSplice)) {
            integerDisplay = ''
        } else {
            integerDisplay = integerSplice.toLocaleString('en', {
                maximumFractionDigits: 0
            })
        }
        if (decimalSplice != null) {
            return `${integerDisplay}.${decimalSplice}`
        } else {
            return integerDisplay
        }
    }

    refresh() {
        if (this.lowerVal.length == 0) {
            this.lowerVal = 0;
        }
        this.lowerValContent.innerText = this.getCurrentValues(this.lowerVal)
        this.upperValContent.innerText = ''
        if (this.operator != null) {
            this.upperValContent.innerText = `${this.getCurrentValues(this.upperVal)} ${this.operator}`
        }
    }
}

const topValue = document.getElementById('upper-value')
const lowerValue = document.getElementById('lower-value')
const calculate = new Calculator(topValue, lowerValue)

function doAction(action) {
    calculate.calAction(action)
    calculate.refresh()
}

function useOperator(operator) {
    calculate.setOperator(operator)
    calculate.refresh()
}

function appendNumber(value) {
    calculate.calAppend(value)
    calculate.refresh()
}