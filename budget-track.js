document.getElementById("addBudgetBtn").addEventListener("click", function(event) {
    event.preventDefault();
    let budgetAmount = parseFloat(document.getElementById("budgetAmount").value);
    let currencySymbol = document.getElementById("currency").value;
    document.getElementById("currencySymbol").textContent = currencySymbol; // Update currency symbol in display
    document.getElementById("remainingBudget").textContent = budgetAmount.toFixed(2);
});

document.getElementById("budgetForm").addEventListener("submit", function(event) {
    event.preventDefault();
    let item = document.getElementById("item").value;
    let amount = parseFloat(document.getElementById("amount").value);
    let currency = document.getElementById("currency").value;
    let category = document.getElementById("category").value; // Get selected category

    if (item && amount) {
        addItemToTable(item, amount, currency, category); // Pass category to the function
        document.getElementById("item").value = "";
        document.getElementById("amount").value = "";
        updateBudget();
        updateTotalExpenses();
    } else {
        alert("Please enter both item and amount.");
    }
});

function addItemToTable(item, amount, currency, category) {
    let tableBody = document.getElementById("budgetTable").getElementsByTagName("tbody")[0];
    let newRow = tableBody.insertRow();
    let itemCell = newRow.insertCell(0);
    let amountCell = newRow.insertCell(1);
    let categoryCell = newRow.insertCell(2);
    itemCell.innerHTML = item;
    amountCell.innerHTML = currency + ' ' + amount.toFixed(2);
    categoryCell.innerHTML = category;
}

function updateBudget() {
    let budgetAmount = parseFloat(document.getElementById("budgetAmount").value);
    let totalSpent = 0;
    let rows = document.getElementById("budgetTable").getElementsByTagName("tbody")[0].rows;
    
    for (let i = 0; i < rows.length; i++) {
        let amountString = rows[i].cells[1].innerHTML;
        let currency = amountString.substring(0, 1); // Extract currency symbol
        let amount = parseFloat(amountString.substring(2)); // Extract amount without currency symbol
        totalSpent += amount;
    }

    let remainingBudget = budgetAmount - totalSpent;
    let currencySymbol = document.getElementById("currency").value;
    document.getElementById("currencySymbol").textContent = currencySymbol; // Update currency symbol in display
    document.getElementById("remainingBudget").textContent = remainingBudget.toFixed(2);
    document.getElementById("remainingBudget").style.color = remainingBudget < 0 ? "#ff0000" : "#000000"; // Change color to red if negative
    document.getElementById("warning").style.display = remainingBudget < 0 ? "block" : "none"; // Show warning if negative
}

function trackTotalExpenses() {
    let totalExpenses = 0;
    let rows = document.getElementById("budgetTable").getElementsByTagName("tbody")[0].rows;

    for (let i = 0; i < rows.length; i++) {
        let amountString = rows[i].cells[1].innerHTML;
        let amount = parseFloat(amountString.substring(2)); // Extract amount without currency symbol
        totalExpenses += amount;
    }

    return totalExpenses.toFixed(2);
}

function updateTotalExpenses() {
    let totalExpenses = trackTotalExpenses();
    let currencySymbol = document.getElementById("currency").value;
    document.getElementById("totalExpenses").textContent = currencySymbol + totalExpenses;
}

// Call updateBudget initially to set initial values
updateBudget();
