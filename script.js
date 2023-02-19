const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clearBtn = document.getElementById('clear');

const addItem = (e) => { 
    e.preventDefault();
    const newItem = itemInput.value

    //validate input
    if(newItem === '') {
        alert('Please add an item to the list');
        return;
    }
    //create list item
    const li =document.createElement('li');
    li.appendChild(document.createTextNode(newItem));

    const button = createButton('remove-item btn-link text-red')
    li.appendChild(button);
    itemList.appendChild(li);
    itemInput.value = '';
}

const createButton = (classes) => { 
    const button = document.createElement('button');
    button.className = classes;
    const icon = createIcon('fa-solid fa-xmark');
    button.appendChild(icon);
    // button.appendChild(document.createTextNode('remove'));
    return button;
 }

 const createIcon = (classes) => { 
    const icon = document.createElement('i');
    icon.className = classes;
    return icon;
  }

const removeItem = (e) => { 
    //use event delegation to target the x mark and delete parent button element
   if(e.target.parentElement.classList.contains('remove-item')) {
    //x marks parent element is the button, and the buttons parent element is the li so have to use parentElement twice
       e.target.parentElement.parentElement.remove();
   }
 }
const clearItems = (second) => { 
    //clear all items from the list
    while(itemList.firstChild) {
        itemList.removeChild(itemList.firstChild);
    }
 }

//event listeners
itemForm.addEventListener('submit', addItem);
itemList.addEventListener('click', removeItem);
clearBtn.addEventListener('click', clearItems)


