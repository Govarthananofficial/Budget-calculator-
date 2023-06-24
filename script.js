var totalAmount = document.getElementById("total-amount");
var userAmount = document.getElementById("user-amount");
var checkAmountButton = document.getElementById("check-amount");
var totalAmountButton = document.getElementById("total-amount-button");
var productTitle = document.getElementById("product-title");
var errorMessage = document.getElementById("budget-error");
var productTitleError = document.getElementById("product-title-error");
var productCostError = document.getElementById("product-cost-error");
var amount = document.getElementById("amount");
var expenditureValue = document.getElementById("expenditure-value");
var balanceValue = document.getElementById("balance-amount");
var list = document.getElementById("list");
var tempAmount = 0;

//Set Budget Part
totalAmountButton.addEventListener("click", () => {
  tempAmount = totalAmount.value;
  //empty or negative input
  if (tempAmount === "" || tempAmount < 0) {
    errorMessage.classList.remove("hide");
  } else {
    errorMessage.classList.add("hide");
    //Set Budget
    amount.innerHTML = tempAmount;
    //Set Balance
    balanceValue.innerText = tempAmount - expenditureValue.innerText;
    //Clear Input Box
    totalAmount.value = "";
  }
});

//Function To Disable Edit and Devare Button
var disableButtons = (bool) => {
  var editButtons = document.getElementsByClassName("edit");
  Array.from(editButtons).forEach((element) => {
    element.disabled = bool;
  });
};

//Function To Modify List Elements
var modifyElement = (element, edit = false) => {
  var parentDiv = element.parentElement;
  var currentBalance = balanceValue.innerText;
  var currentExpense = expenditureValue.innerText;
  var parentAmount = parentDiv.querySelector(".amount").innerText;
  if (edit) {
    var parentText = parentDiv.querySelector(".product").innerText;
    productTitle.value = parentText;
    userAmount.value = parentAmount;
    disableButtons(true);
  }
  balanceValue.innerText = parseInt(currentBalance) + parseInt(parentAmount);
  expenditureValue.innerText =
    parseInt(currentExpense) - parseInt(parentAmount);
  parentDiv.remove();
};

//Function To Create List
var listCreator = (expenseName, expenseValue) => {
  var sublistContent = document.createElement("div");
  sublistContent.classList.add("sublist-content", "flex-space");
  list.appendChild(sublistContent);
  sublistContent.innerHTML = `<p class="product">${expenseName}</p><p class="amount">${expenseValue}</p>`;
  var editButton = document.createElement("button");
  editButton.classList.add("fa-solid", "fa-pen-to-square", "edit");
  editButton.style.fontSize = "1.2em";
  editButton.addEventListener("click", () => {
    modifyElement(editButton, true);
  });
  var devareButton = document.createElement("button");
  devareButton.classList.add("fa-solid", "fa-trash-can", "devare");
  devareButton.style.fontSize = "1.2em";
  devareButton.addEventListener("click", () => {
    modifyElement(devareButton);
  });
  sublistContent.appendChild(editButton);
  sublistContent.appendChild(devareButton);
  document.getElementById("list").appendChild(sublistContent);
};

//Function To Add Expenses
checkAmountButton.addEventListener("click", () => {
  //empty checks
  if (!userAmount.value || !productTitle.value) {
    productTitleError.classList.remove("hide");
    return false;
  }
  //Enable buttons
  disableButtons(false);
  //Expense
  var expenditure = parseInt(userAmount.value);
  //Total expense (existing + new)
  var sum = parseInt(expenditureValue.innerText) + expenditure;
  expenditureValue.innerText = sum;
  //Total balance(budget - total expense)
  var totalBalance = tempAmount - sum;
  balanceValue.innerText = totalBalance;
  //Create list
  listCreator(productTitle.value, userAmount.value);
  //Empty inputs
  productTitle.value = "";
  userAmount.value = "";
});