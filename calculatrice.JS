var screen = document.getElementById("screen");
var lastResult = null;

function clearScreen() {
    screen.value = "";
}

function display(c) {
    if (screen.value === '0' && c !== '.') {
        screen.value = c;
    } else {
        screen.value += c;
    }
}

// Fonction pour évaluer une expression mathématique
function evaluateExpression(expression) {
    let operands = expression.split(/[\+\-\*\/]/);
    let operators = expression.split(/[0-9\.]+/).filter(Boolean);

    function calculate(operands, operators) {
        let index = operators.indexOf('*');
        if (index === -1) index = operators.indexOf('/');
        if (index === -1) index = operators.indexOf('+');
        if (index === -1) index = operators.indexOf('-');

        if (index === -1) return parseFloat(operands[0]);

        let result;
        let op1 = parseFloat(operands[index]);
        let op2 = parseFloat(operands[index + 1]);
        switch (operators[index]) {
            case '*':
                result = op1 * op2;
                break;
            case '/':
                result = op1 / op2;
                break;
            case '+':
                result = op1 + op2;
                break;
            case '-':
                result = op1 - op2;
                break;
        }

        operands.splice(index, 2, result);
        operators.splice(index, 1);

        return calculate(operands, operators);
    }

    return calculate(operands, operators);
}

function calculer() {
    let expression = screen.value;
    try {
        lastResult = evaluateExpression(expression);
        document.getElementById("resultat").innerText = lastResult;
        screen.value = lastResult;
    } catch (error) {
        document.getElementById("resultat").innerText = 'Erreur';
    }
}

