document.addEventListener('DOMContentLoaded', () => {
  const expenseForm = document.getElementById('expense-form');
  const expenseNameInput = document.getElementById('expense-name');
  const expenseAmountInput = document.getElementById('expense-amount');
  const expenseList = document.getElementById('expense-list');
  const totalAmountDisplay = document.getElementById('total-amount');

  let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
  let totalAmount = calculateTotal();
  renderExpenses();
  updateTotal();

  // Event Listener for Adding Expenses
  expenseForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = expenseNameInput.value.trim();
    const amount = parseFloat(expenseAmountInput.value.trim());

    if (name === "" || isNaN(amount) || amount <= 0) {
      alert("Please enter a valid expense name and a positive amount.");
      return;
    }

    const newExpense = { id: Date.now(), name, amount };
    expenses.push(newExpense);
    saveAndRenderExpenses();

    expenseNameInput.value = "";
    expenseAmountInput.value = "";
  });

  // Calculate Total Amount
  function calculateTotal() {
    return expenses.reduce((total, expense) => total + expense.amount, 0);
  }

  // Update Total Display
  function updateTotal() {
    totalAmount = calculateTotal();
    totalAmountDisplay.textContent = `Total: ₹${totalAmount.toFixed(2)}`;
  }

  // Save Expenses to Local Storage and Render List
  function saveAndRenderExpenses() {
    localStorage.setItem("expenses", JSON.stringify(expenses));
    renderExpenses();
    updateTotal();
  }

  // Render Expenses List
  function renderExpenses() {
    expenseList.innerHTML = "";
    expenses.forEach(expense => {
      const li = document.createElement('li');
      li.innerHTML = `
        ${expense.name} - $${expense.amount.toFixed(2)}
        <button data-id="${expense.id}">Delete</button>
      `;
      expenseList.appendChild(li);
    });
  }

  // Event Listener for Deleting Expenses
  expenseList.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
      const expenseId = parseInt(e.target.getAttribute('data-id'));
      expenses = expenses.filter(expense => expense.id !== expenseId);
      saveAndRenderExpenses();
    }
  });
});
