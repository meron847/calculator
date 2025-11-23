
let buffer = '0';
let runningTotal = 0;
let previousOperation = null;
const screen = document.querySelector('.screen');

function buttonClick(value) {
  if (isNaN(parseInt(value))){
    handleSymbole(value);
  }else {
    handleNumber(value);
  }
rerender();
}

function handleNumber(number) {
   if (buffer === '0'){
    buffer = number;
   }else {
    buffer += number;
   }
}

function handleMath(value) {
  if (buffer === '0') {
    return;
  }

  const intBuffer = parseInt(buffer);
  if (runningTotal === 0) {
    runningTotal = intBuffer;
  }else {
    flushOperation(intBuffer)
  }
  previousOperation = value;
  buffer = '0';
  console.log(runningTotal);
}




function flushOperation (intBuffer){
    if (previousOperation === '+') {
        runningTotal += intBuffer
    }else if (previousOperation === '-') {
        runningTotal -= intBuffer
    }else if (previousOperation === '*') {
        runningTotal *= intBuffer
    }else if (previousOperation === '/') {
        runningTotal /= intBuffer
    }
}

function handleSymbole(symbole) {
    switch (symbole) {
        case 'C':
        buffer = '0';
        break;
        case '=':
            if (previousOperation === null) {
                return;
            }
            flushOperation(parseInt(buffer));
              previousOperation = null;
              buffer = "" + runningTotal;//show result
              runningTotal = 0;//Reset correctly number
            break;
            case '<-':
                if (buffer.length === 1) {
                    buffer = '0';
                } else {
                    buffer = buffer.substring(0, buffer.length - 1);
                }
                break;
                case '+':
                    case "-":
                        case '/':
                            case '*':
                                
            handleMath(symbole);
            break;
    }
}


function init() {
    console.log("hi");

    document
        .querySelectorAll(".calc-button")
        .forEach(button => {
            button.addEventListener("click", function(event) {
                console.log("Button clicked:", event.target.innerText); 
                buttonClick(event.target.innerText);
            });
        });
}

function rerender() {
    screen.innerText = buffer;//The rerender() method updates the screen's inner text to match the current buffer value, ensuring that the displayed number reflects the latest user input.
}
init(); 
