const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clearBtn = document.getElementById('clear');
const itemFilter = document.getElementById('filter')
const formBtn = itemForm.querySelector('button')
let isEditMode = false



const displayItems = () => { 
    const itemsFromStorage = getItemsFromStorage()
    itemsFromStorage.forEach(item => addItemToDom(item))
    checkUI()
 }

const onAddItemSubmit = (e) => { 
    e.preventDefault();
    const newItem = itemInput.value

    //validate input
    if(newItem === '') {
        alert('Please add an item to the list');
        return;
    }

    //check for edit mode
    if(isEditMode){
        const itemToEdit = itemList.querySelector('.edit-mode')
        removeItemFromStorage(itemToEdit.textContent)
        itemToEdit.classList.remove('edit-mode')
        itemToEdit.remove()
        isEditMode = false
    }

    //create item DOM element
   addItemToDom(newItem)

   //add item to local storage
   addIteToStorage(newItem)
    checkUI()
    itemInput.value = '';
}
const addItemToDom = (item) => { 
    const li =document.createElement('li');
    li.appendChild(document.createTextNode(item));

    const button = createButton('remove-item btn-link text-red')
    li.appendChild(button);

//add li to dom
    itemList.appendChild(li);
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

  const addIteToStorage = (item) => { 
    //check if items already in local storage
    const  itemsFromStorage = getItemsFromStorage()

 
//add new item to array
    itemsFromStorage.push(item)

    //convert to JSON string and set to local storage
    localStorage.setItem('items', JSON.stringify(itemsFromStorage))
  }

  const getItemsFromStorage = () => { 
    let itemsFromStorage;
    if(localStorage.getItem('items')=== null){
        itemsFromStorage = []
    }else{
        //this returns a string, so parse w JSON 
        itemsFromStorage = JSON.parse(localStorage.getItem('items'))
    }
return itemsFromStorage
   }

const onClickItem = (e) => { 
    if(e.target.parentElement.classList.contains('remove-item')) {
        removeItem(e.target.parentElement.parentElement)
    }else{
       setItemToEdit(e.target)
    }
 }

 const setItemToEdit = (item) => { 
    isEditMode = true;
    itemList.querySelectorAll('li').forEach(i => i.classList.remove('edit-mode'))
    //make the text lighter for the item wanting to edit
    item.classList.add('edit-mode')

    formBtn.innerHTML = '<i class="fa-solid fa-pen"></i> Update Item';
    formBtn.style.backgroundColor = '#228B22'
    itemInput.value = item.textContent
  }
const removeItem = (item) => { 
    console.log(item);
    if(confirm(`Remove ${item.textContent} from the list? `)){
        //remove item from DOM
        item.remove()
        //remove item from localstorage
        removeItemFromStorage(item.textContent)
        checkUI()
    }
 }

 const removeItemFromStorage = (item) => { 
    let itemsFromStorage = getItemsFromStorage();

    //filter out item to be removed/ will return a NEW array without the deleted item
    itemsFromStorage = itemsFromStorage.filter(i => i !== item)

    //re-set to local storage
    localStorage.setItem('items', JSON.stringify(itemsFromStorage))

    console.log(itemsFromStorage)
  }
const clearItems = (second) => { 
    //clear all items from the list
    while(itemList.firstChild) {
        itemList.removeChild(itemList.firstChild);
    }
    //clear items from local storage
    localStorage.removeItem('items')
    checkUI()
 }
 const filterItems = (e) => { 
    const text = e.target.value.toLowerCase()
    //get all the items
    const items = itemList.querySelectorAll('li')
    items.forEach(item =>{
        const itemName = item.firstChild.textContent.toLocaleLowerCase()
        if(itemName.indexOf(text) != -1){
           item.style.display = 'flex'
        }else{
            item.style.display = 'none'
        }
    })
    console.log(text)

  }

 const checkUI = () => { 
    //clear input
    itemInput.value = ''
    const items = itemList.querySelectorAll('li')
    if(items.length === 0){
        clearBtn.style.display = 'none'
        itemFilter.style.display = 'none'
    }
    //if there is an item then they shoudl be showing
    else{
        clearBtn.style.display = 'block'
        itemFilter.style.display = 'block'
    }
    formBtn.innerHTML = '<i class="fa-solid fa-plus"></i> Add item';
    formBtn.style.backgroundColor = '#333'
    isEditMode = false
  }


//initialize app
const init = () => { 
    itemForm.addEventListener('submit', onAddItemSubmit);
    itemList.addEventListener('click', onClickItem);
    clearBtn.addEventListener('click', clearItems)
    itemFilter.addEventListener('input', filterItems)
    document.addEventListener('DOMContentLoaded', displayItems)
    
    checkUI()
 }

//event listeners

init();