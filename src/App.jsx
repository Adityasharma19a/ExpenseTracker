import { useState } from "react";

function App() {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");
  const [expenses, setExpenses] = useState([]);
  const [filter, setFilter] = useState("All");

  function addExpense(e) {
    e.preventDefault();

    const newExpense = {
      id: Date.now(),
      title: title,
      amount: Number(amount),
      category: category
    };

    setExpenses([...expenses, newExpense]);
    setTitle("");
    setAmount("");
  }

  function deleteExpense(id) {
    const updatedList = expenses.filter((item) => item.id !== id);
    setExpenses(updatedList);
  }

  const filteredExpenses =
    filter === "All"
      ? expenses
      : expenses.filter((item) => item.category === filter);

  let total = 0;
  filteredExpenses.forEach((item) => {
    total = total + item.amount;
  });

  return (
    <div className="container">
      <h2>Expense Tracker</h2>

      <form onSubmit={addExpense}>
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option>All</option>
          <option>Fees</option>
          <option>Hostel</option>
          <option>Shoping</option>
          <option>Hair Cut</option>
          <option>Recharge</option>
        </select>

        <button>Add Expense</button>
      </form>

      <br />

      <label>Filter: </label>
      <select onChange={(e) => setFilter(e.target.value)}>
        <option>All</option>
        <option>Fees</option>
        <option>Hostel</option>
        <option>Shoping</option>
        <option>Hair Cut</option>
        <option>Recharge</option>
      </select>

      <h3>Total Spent: ₹{total}</h3>

      {filteredExpenses.length === 0 ? (
        <p>No expenses added.</p>
      ) : (
        <ul>
          {filteredExpenses.map((item) => (
            <li key={item.id}>
              {item.title} - ₹{item.amount} ({item.category})
              <button onClick={() => deleteExpense(item.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
