import { useState } from "react";
import "./styles.css";

function App() {
  const [currentOperand, setCurrentOperand] = useState("");
  const [previousOperand, setPreviousOperand] = useState("");
  const [operation, setOperation] = useState("");
  const [overwrite, setOverwrite] = useState(false);

  const handleDigitClick = (digit) => {
    if (overwrite) {
      setCurrentOperand(digit);
      setOverwrite(false);
    } else {
      setCurrentOperand(`${currentOperand}${digit}`);
    }
  };

  const handleOperationClick = (op) => {
    if (currentOperand === "") return;

    if (previousOperand === "") {
      setPreviousOperand(currentOperand);
      setCurrentOperand("");
    } else {
      const result = evaluate();
      setPreviousOperand(result.toString());
      setCurrentOperand("");
    }

    setOperation(op);
  };

  const handleClear = () => {
    setCurrentOperand("");
    setPreviousOperand("");
    setOperation("");
  };

  const handleDelete = () => {
    if (currentOperand !== "") {
      setCurrentOperand(currentOperand.slice(0, -1));
    }
  };

  const evaluate = () => {
    const prev = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);
    if (isNaN(prev) || isNaN(current)) return "";
    let computation = "";
    switch (operation) {
      case "+":
        computation = prev + current;
        break;
      case "-":
        computation = prev - current;
        break;
      case "*":
        computation = prev * current;
        break;
      case "÷":
        computation = prev / current;
        break;
      default:
        return "";
    }
    return computation.toString();
  };

  return (
    <div className="calculator-grid">
      <div className="output">
        <div className="previous-operand">{previousOperand} {operation}</div>
        <div className="current-operand">{currentOperand}</div>
      </div>
      <button className="span-two" onClick={handleClear}>
        AC
      </button>
      <button onClick={handleDelete}>DEL</button>
      <button onClick={() => handleOperationClick("÷")}>÷</button>
      <button onClick={() => handleDigitClick("1")}>1</button>
      <button onClick={() => handleDigitClick("2")}>2</button>
      <button onClick={() => handleDigitClick("3")}>3</button>
      <button onClick={() => handleOperationClick("*")}>*</button>
      <button onClick={() => handleDigitClick("4")}>4</button>
      <button onClick={() => handleDigitClick("5")}>5</button>
      <button onClick={() => handleDigitClick("6")}>6</button>
      <button onClick={() => handleOperationClick("+")}>+</button>
      <button onClick={() => handleDigitClick("7")}>7</button>
      <button onClick={() => handleDigitClick("8")}>8</button>
      <button onClick={() => handleDigitClick("9")}>9</button>
      <button onClick={() => handleOperationClick("-")}>-</button>
      <button onClick={() => handleDigitClick(".")}>.</button>
      <button onClick={() => handleDigitClick("0")}>0</button>
      <button className="span-two" onClick={() => setCurrentOperand(evaluate())}>=</button>
    </div>
  );
}

export default App;
