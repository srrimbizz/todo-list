const itemsList = document.querySelector('.list');
const itemsForm = document.querySelector('.add-items');
const buttonContainer = document.querySelector('.button-container');

buttonContainer.innerHTML = `<input type="submit" value="+ Add">`

function addNewItem(e) {
  e.preventDefault();
  const text = (itemsForm.querySelector('[name="item"]')).value;
  if(text === '') return;
  itemsList.innerHTML += `<li><input type="checkbox" class="checkbox">${text}</li>`;
  itemsForm.reset();
};


function toggleCheckbox(e) {
  if(!e.target.classList.contains('checkbox')) return;
  const listItem = e.target.parentNode;
  if(!e.target.checked) {
    listItem.style.textDecoration = 'none'
  } else {
    listItem.style.textDecoration = 'line-through'
  }
};

function deleteCheckedItems() {
const listItems = document.querySelectorAll('li');
  listItems.forEach(listItem => {
    const checkbox = listItem.querySelector('.checkbox');
    if(checkbox.checked) {
      listItem.parentNode.removeChild(listItem);
    }
  })
}

function areAnyCheckboxesChecked() {
  const checkboxes = document.querySelectorAll('.checkbox');
  const checkboxesArray = Array.from(checkboxes);
  const isAnyCheckboxChecked = checkboxesArray.some(item => item.checked);
  return isAnyCheckboxChecked;
}

itemsForm.addEventListener('submit', (e) => {
  e.preventDefault();
  if(!areAnyCheckboxesChecked()) {
    addNewItem(e);
  } else {
    deleteCheckedItems(e);
  }
});

function changeButtonText() {
  if(!areAnyCheckboxesChecked()) {
    buttonContainer.innerHTML = `<input type="submit" value="+ Add">`
  } else {
    buttonContainer.innerHTML = `<input type="submit" value="DELETE">`
  }
}

itemsList.addEventListener('click', (e) => {
  toggleCheckbox(e);
  changeButtonText();
});
