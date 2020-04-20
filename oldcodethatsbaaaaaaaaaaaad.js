const itemsForm = document.querySelector('.add-items');
const itemsList = document.querySelector('.list');

function addNewItem(e) {
  const text = (itemsForm.querySelector('[name=item]')).value;
  if (text === '') return;
  itemsList.innerHTML += `<li><input type="checkbox" class="checkbox"/>${text}</li>`;
  itemsForm.reset();
};

function toggleCheckbox(e) {
  let listItem = e.target.parentElement;

  if(e.target.checked) {
    listItem.style.textDecorationLine = 'line-through';
  } else {
    listItem.style.textDecorationLine = 'none';
  }
}

function toggleAddOrDeleteMode(e) {
  if(!isAnyCheckboxChecked()) {
    document.getElementById('submit').value = '+ Add';
  } else {
    document.getElementById('submit').value = 'DELETE';
  }
};

function removeAllCheckedItems() {
  const listItems = document.querySelectorAll('li');
  listItems.forEach(listItem => {
    const checkbox = listItem.querySelector('.checkbox');
    if(checkbox.checked) {
      listItem.parentNode.removeChild(listItem);
    }
  })
}

function isAnyCheckboxChecked() {
  const checkboxes = document.querySelectorAll('.checkbox');
  const checkboxesArray = Array.from(checkboxes);
  const isAnyCheckboxChecked = checkboxesArray.some(checkbox => checkbox.checked);
  return isAnyCheckboxChecked;
}

itemsForm.addEventListener('submit', (e) => {
  e.preventDefault();
  if(!isAnyCheckboxChecked()) {
    addNewItem(e);
  } else {
    removeAllCheckedItems(e);
  }
});

document.addEventListener('click', (e) => {
  if(!e.target.classList.contains('checkbox')) return;
  toggleCheckbox(e);
  toggleAddOrDeleteMode(e);
});

