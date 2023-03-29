import React from "react";
import "./style.css";
import { GlobalContext } from "../../context/GlobalState";

interface IProp {
  token: string;
  darkMode: boolean;
}

export const Addtransaction = (props: IProp) => {
  const [text, setText] = React.useState<string>("");
  const [amount, setAmount] = React.useState(0);
  const { addTransaction } = React.useContext(GlobalContext);

  const addTrans = (str: string) => {
    var today = new Date();
    var date = today.getDate() + "-" + (today.getMonth() + 1);
    if (amount > 0 && text.length > 0) {
      const transaction = {
        id: Math.random() * 1000000,

        text: text.slice(0, 25),
        amount: str === "income" ? Math.abs(amount) : Math.abs(amount) * -1,
        date: date,
      };
      if (amount > 10000000) {
        alert("Amount should be less than 10000000");
      } else if (addTransaction !== undefined) {
        addTransaction(transaction, props.token);
        setText("");
        setAmount(0);
      }
    } else {
      alert("Kindly add text and amount correctly");
    }
  };
  return (
    <>
      <h3>Add Transaction</h3>
      <form id="form" method="POST">
        <div className="form-control">
          <label htmlFor="text">Description</label>
          <input
            type="text"
            className={props.darkMode ? "darkmode" : ""}
            autoComplete="off"
            id="text"
            maxLength={25}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="What is this About?"
          />
        </div>
        <div className="form-control">
          <label htmlFor="amount">Amount </label>
          <input
            type="number"
            className={props.darkMode ? "darkmode" : ""}
            step="any"
            id="amount"
            pattern="\d*"
            value={amount}
            onChange={(e) => setAmount(parseFloat(e.target.value))}
            placeholder="Enter amount..."
          />
        </div>
        <button
          onClick={() => addTrans("income")}
          type="button"
          className="income-btn"
        >
          {" "}
          Add Income
        </button>
        <button
          onClick={() => addTrans("expense")}
          type="button"
          className="expense-btn"
        >
          {" "}
          Add Expense
        </button>
      </form>
    </>
  );
};
