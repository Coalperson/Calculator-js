class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear()
    }

    clear() {   //Clear Variables
    this.currentOperand = ''
    this.previousOperand = ''
    this.operation = undefined
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1) //Take last value from string and remove
    }

    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return //if period is already included, return
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    chooseOperation(operation) {
        if (this.currentOperand === '') return      // Clear value if nothing is typed
        if (this.previousOperand !== '') {
            this.compute()                          // Compute if previous operand is not black
        }
        this.operation = operation
        this.previousOperand = this.currentOperand  
        this.currentOperand = ''                    // Clears the currentOperand and moves it to the previousOperand
    }

    compute() {
        let computation                 // Create variable, computation will be the result of the compute function (answer)
        const prev = parseFloat(this.previousOperand) // Convert string to integer
        const current = parseFloat(this.currentOperand)
        if (isNaN(prev) || isNaN(current)) return //if no previous value or current value, return
        switch (this.operation) {
            case '+':                           //execute if operation is selected
                computation = prev + current
                break
            case '-':
                computation = prev - current
                break
            case '*':
                computation = prev * current
                break
            case '÷':
                computation = prev / current
                break
            default:
                return              
        }
        this.currentOperand = computation   //Set current operand to result of computation(answer)
        this.operation = undefined          //Remove operation symbol
        this.previousOperand = ''           //Clear previousOperand
    }

    getDisplayNumber(number) {      //Passes number to display value
        const stringNumber = number.toString() //Get string from number
        const integerDigits = parseFloat(stringNumber.split('.')[0]) // Convert string to an array, string before decimal
        const decimalDigits = stringNumber.split('.')[1]  //string after decimal
        let integerDisplay
        if (isNaN(integerDigits)) {
            integerDisplay = ''
        } else {
            integerDisplay = integerDigits.toLocaleString ('en', {
            maximumFractionDigits: 0 })
        }
        if  (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        }   else {
            return integerDisplay
        }
    }

        
    

    updateDisplay() {
        this.currentOperandTextElement.innerText = 
        this.getDisplayNumber(this.currentOperand)      //Passes currentOperand to Display number
        if (this.operation != null) {
            this.previousOperandTextElement.innerText = 
            `${this.previousOperand} ${this.operation}`  //Concatenate previousOperand and operation
        }
        else {
            this.previousOperandTextElement.innerText = ''
        }
        
    }

    }

    const numberButtons = document.querySelectorAll('[data-number]')
    const operationButtons = document.querySelectorAll('[data-operation]')
    const equalsButton = document.querySelector('[data-equals]')
    const deleteButton = document.querySelector('[data-delete]')
    const allClearButton = document.querySelector('[data-all-clear]')
    const previousOperandTextElement = document.querySelector('[data-previous-operand]')
    const currentOperandTextElement = document.querySelector('[data-current-operand]')

    const calculator = new Calculator (previousOperandTextElement, currentOperandTextElement)

    numberButtons.forEach(button => {
        button.addEventListener('click', () => {
            calculator.appendNumber(button.innerText)
            calculator.updateDisplay()
        })
    })

    operationButtons.forEach(button => {
        button.addEventListener('click', () => {
            calculator.chooseOperation(button.innerText)
            calculator.updateDisplay()
        })
    })

    equalsButton.addEventListener('click', button => {  //Calls answer on click and update display
        calculator.compute()
        calculator.updateDisplay()
    })

    allClearButton.addEventListener('click', button => {  //Calls function on click and update display
        calculator.clear()
        calculator.updateDisplay()
    })

    deleteButton.addEventListener('click', button => {  //Calls function on click and update display
        calculator.delete()
        calculator.updateDisplay()
    })