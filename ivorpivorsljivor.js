const itemsForm = document.querySelector('.add-items');
const itemsList = document.querySelector('.list');
const buttonContainer = document.querySelector('.button-container');

const storedItemsState = localStorage.getItem('itemsState');
let itemsState = JSON.parse(storedItemsState) || [];

function renderApplication() {
  const itemsHtml = itemsState.map((item, i) => (`
    <li class="${item.checked ? 'isChecked' : ''}">
      <input type="checkbox" data-index="${i}" class="checkbox" ${item.checked ? 'checked' : ''}/>
      ${item.text}
    </li>
  `)).join('');
  itemsList.innerHTML = itemsHtml;
  buttonContainer.innerHTML = `<input type="submit" value="${isAnyCheckboxChecked() ? 'DELETE' : '+ Add'}" id="submit">`
}

renderApplication();
const submitButton = document.querySelector('#submit')

itemsForm.addEventListener('submit', (e) => {
  e.preventDefault();
  if(!isAnyCheckboxChecked()) {
    addNewItem(e);
  } else {
    removeAllCheckedItems(e);
  }
});

function addNewItem(e) {
  const text = (itemsForm.querySelector('[name=item]')).value;
  if (text === '') return;
  itemsState.push({
    text,
    checked: false,
  });
  itemsForm.reset();
  renderApplication();
  storeState();
};

function removeAllCheckedItems() {
  itemsState.forEach(item => item.style.color = 'red');
  itemsState = itemsState.filter(item => !item.checked);
  renderApplication();
  storeState();
}

function isAnyCheckboxChecked() {
  return itemsState.some(item => item.checked);
}

function toggleCheckbox(e) {
  if(!e.target.classList.contains('checkbox')) return;
  const clickedIndex = e.target.getAttribute('data-index');
  const itemToToggle = itemsState[clickedIndex];
  itemToToggle.checked = !itemToToggle.checked;
  renderApplication();
  storeState();
}

function storeState() {
  localStorage.setItem('itemsState', JSON.stringify(itemsState));
}

itemsList.addEventListener('click', toggleCheckbox)

submitButton.addEventListener('mouseover', (e) => {
  console.log(e)
  e.target.style.color = 'red';
})