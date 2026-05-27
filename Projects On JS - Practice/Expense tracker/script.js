document.addEventListener('DOMContentLoaded', () => {
  const expenseform = document.getElementById("expense-form");
  const expenseNameInput = document.getElementById("expense-name");
  const expenseAmountInput = document.getElementById("expense-amount");
  const expenseList = document.getElementById("expense-list");
  const totalAmountDisplay = document.getElementById("total-amount");

  let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
  let totalAmount = calculateTotal();
  renderExpenses();

  expenseform.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = expenseNameInput.value.trim();
    const amount = parseFloat(expenseAmountInput.value.trim());
    if ( name !== "" && (!isNaN(amount)) && amount > 0) {
      const newExpense = {
        id : Date.now(),
        name: name,
        amount : amount
      }
      expenses.push(newExpense);
      saveExpensesToLocal();
      renderExpenses();
      updateTotal();


      // Clear Input
      expenseNameInput.value = "";
      expenseAmountInput.value = "";
    }
  })

  function saveExpensesToLocal(){
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }
  function calculateTotal(){
    return expenses.reduce((sum,expense) => (sum + expense.amount),0);
  }
  function updateTotal(){
    totalAmount = calculateTotal();
    totalAmountDisplay.textContent = totalAmount.toFixed(2);
  }
  function renderExpenses(){
    expenseList.innerHTML = "";
    expenses.forEach(expense => {
      const li = document.createElement('li');
      li.innerHTML = `
      ${expense.name} - ${expense.amount}
      <button data-id = ">Delete</button>
      `
      expenseList.appendChild(li);
    })
  }
})