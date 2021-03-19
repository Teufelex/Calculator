const numbers = document.querySelectorAll('.number');
const operations = document.querySelectorAll('.operator');
const decimalBtn = document.getElementById('decimal');
const result = document.getElementById('result');
const clearBtns = document.querySelectorAll('.clear-btn');
const display = document.getElementById('display');
let MemoryCurrentNumber = 0;
let MemoryNewNumber = false;
let MemoryPendingOperation = '';

for (let i = 0; i < numbers.length; i++) {
    let number = numbers[i];
    number.addEventListener('click', function (e) {
        numberPress(e.target.textContent);
    });
};

for (let i = 0; i < operations.length; i++) {
    let operationBtn = operations[i];
    operationBtn.addEventListener('click', function (e) {
        operation(e.target.textContent);
    });
    operationBtn.addEventListener('click', function (e) {
        numberPress(e.target.textContent);
    });
};

for (let i = 0; i < clearBtns.length; i++) {
    let clearBtn = clearBtns[i];
    clearBtn.addEventListener('click', function (e) {
        clear(e.target.textContent);
    });
};

decimalBtn.addEventListener('click', decimal);

function numberPress(number) {
    if (MemoryNewNumber && number !== '=' && number !== '+' && number !== '/' && number !== '*' && number !== '√' && number !== '^') {
        display.value = number;
        MemoryNewNumber = false;
    } else if (number !== '=' && number !== '+' && number !== '/' && number !== '*' && number !== '√' && number !== '^') {
        if (display.value === '0') {
            display.value = number;
        } else {
            display.value += number;
        }
    }
};

function operation(op) {
    let localOperationMemory = display.value;

    if (MemoryPendingOperation === '√') {
        if (MemoryCurrentNumber >= 0) {
            MemoryNewNumber = true;
            MemoryCurrentNumber = Math.sqrt(MemoryCurrentNumber);
            MemoryPendingOperation = op;
        } else {
            return display.value = 'Err';
        }
    } else if (MemoryNewNumber && MemoryPendingOperation !== '=') {
        display.value = MemoryCurrentNumber;
    } else {
        MemoryNewNumber = true;
        if (MemoryPendingOperation === '+') {
            MemoryCurrentNumber += parseFloat(localOperationMemory);
        } else if (MemoryPendingOperation === '-') {
            MemoryCurrentNumber += parseFloat(localOperationMemory);
        } else if (MemoryPendingOperation === '*') {
            MemoryCurrentNumber *= parseFloat(localOperationMemory);
        } else if (MemoryPendingOperation === '/') {
            MemoryCurrentNumber /= parseFloat(localOperationMemory);
        } else if (MemoryPendingOperation === '^') {
            MemoryCurrentNumber **= parseFloat(localOperationMemory);
        } else {
            MemoryCurrentNumber = parseFloat(localOperationMemory);
        }
        MemoryPendingOperation = op;
    }
    display.value = Math.round(MemoryCurrentNumber * 1000000000) / 1000000000;
};

function decimal(argument) {
    let localDecimalMemory = display.value;

    if (MemoryNewNumber) {
        localDecimalMemory = '0.';
        MemoryNewNumber = false;
    } else {
        if (localDecimalMemory.indexOf('.') === -1) {
            localDecimalMemory += '.';
        };
    };
    display.value = localDecimalMemory;
};

function clear(id) {
    if (id === 'ce') {
        display.value = '0';
        MemoryNewNumber = true;
    } else if (id === 'c') {
        MemoryCurrentNumber = 0;
        MemoryPendingOperation = '';
        display.value = '0';
        MemoryNewNumber = false;
    };
};
