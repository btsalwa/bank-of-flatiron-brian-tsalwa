import React from "react";

function AddTransactionForm({ addTransaction }) {

  const handleFormSubmit = async (event) => {
    event.preventDefault();
  
    const { date, description, category, amount } = event.target;
  
    
    const newTransaction = {
      date: date.value,
      description: description.value,
      category: category.value,
      amount: amount.value,
    };
  
    addTransaction(newTransaction);
  
    
    event.target.reset();
  
    try {
      
      const response = await fetch('http://localhost:8000/transactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTransaction),
      });
  
      
      const data = await response.json();
      console.log(data);
  
      addTransaction(newTransaction);
    } catch (error) {
      
      console.error('Error:', error);
    }
  };

  
  return (
    <div className="custom-segment">
      <form className="custom-form" onSubmit={handleFormSubmit}>
        <div className="custom-fields">
          <input type="date" name="date" />
          <input type="text" name="description" placeholder="Description" />
          <input type="text" name="category" placeholder="Category" />
          <input type="number" name="amount" placeholder="Amount" step="0.01" />
        </div>
        <button className="custom-button" type="submit">
          Add Transaction
        </button>
      </form>
    </div>
  );
}

export default AddTransactionForm;