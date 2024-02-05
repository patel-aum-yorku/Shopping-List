const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById("item-input");
const itemList = document.getElementById('item-list');
const clearBtn = document.getElementById('clear');
const itemFilter = document.getElementById('filter');
const formBtn = itemForm.querySelector('button');
let isEditMode = false;
// event listeners' function

const displayItems = () => {
    const itemsFromStorage = getItemsFromStorage();
    itemsFromStorage.forEach(item =>{
        addItemToDOM(item);
    })
    checkUI();
}


/**
 * This fucntion add items to the list.
 * @param {*} e 
 */
const onAddItemSubmit = (e) => {
    e.preventDefault();
    newItem = itemInput.value;
    // validate input
    if(newItem === ''){
        alert('Please add an item');
    } else {
    
    // editing the item 
    if (isEditMode) {
        const itemToEdit = itemList.querySelector('.edit-mode');

        removeItemFromStorage(itemToEdit.textContent);
        itemToEdit.classList.remove('edit-mode');
        itemToEdit.remove();
        isEditMode = false;
    } else {
        if(checkIfExists(newItem)) {
            alert("Item is already in the List!!");
            return;
        }
    }
    
    // create list item DOM element
    addItemToDOM(newItem);
    
    //add item to local storage
    addItemToStorage(newItem);

    // reset the input field
    itemInput.value = '';

    // showing the filter field and clear button after adding items
    checkUI();
}
}

/**
 * This function changes the UI when an item is added to the list.
 * @param {*} item 
 */
const addItemToDOM = (item) => {
      // create list item
      const li = document.createElement('li');
      li.appendChild(document.createTextNode(item));
  
      const button = createButton("remove-item btn-link text-red");
  
      // appending newly created tags to the list
      li.appendChild(button);
      itemList.appendChild(li);
}

/**
 * This function creates a button for removing each element from the list.
 * It only focuses on creating button.
 * @param classes
 * @returns {HTMLButtonElement}
 */
const createButton = (classes) => {
    const button = document.createElement('button');
    button.className = classes;
    const icon = createIcon("fa-solid fa-xmark");
    button.appendChild(icon);
    return button;
}

/**
 * This function creates the red cross icon for the remove button.
 *
 * @param classes
 * @returns {HTMLElement}
 */
const createIcon = (classes) => {
    const i = document.createElement('i');
    i.className = classes;
    return i;
}

/**
 * This function adds item to local storage of the browser.
 * @param {*} item 
 */
const addItemToStorage = (item) => {
    const itemsFromStorage = getItemsFromStorage();
    // add new item to array.
    itemsFromStorage.push(item);

    //convert to JSON string and set to local storage
    localStorage.setItem('items',JSON.stringify(itemsFromStorage));
}

/**
 * 
 * @returns This function returns an array contianing list items from the
 * list.
 */
const getItemsFromStorage = () => {
    let itemsFromStorage;

    if(localStorage.getItem('items') === null){
        itemsFromStorage = [];
    } else {
        itemsFromStorage = JSON.parse(localStorage.getItem('items'));
    }

    return itemsFromStorage;
}

/**
 * Handles click event on items from the list like remove item, etc.
 * @param {} event 
 */
const onclickItem = (event) => {
    if (event.target.parentElement.classList.contains('remove-item')){
        removeItem(event.target.parentElement.parentElement);
    } else {
        setItemToEdit(event.target);
    }
}

const checkIfExists = (item) => {
    let itemsFromStorage = getItemsFromStorage();
    itemsFromStorage = itemsFromStorage.map(i => i.toLowerCase());
    console.log(itemsFromStorage)
    return itemsFromStorage.includes(item.toLowerCase());
}

/**
 * This function changes the UI when editing the items in the list.
 * @param {*} item 
 */
const setItemToEdit = (item) =>{
    isEditMode = true;

    // resetting ui for the unselected items
    itemList.querySelectorAll('li').forEach((i)=>i.classList.remove('edit-mode'));


    item.classList.add('edit-mode');
    formBtn.innerHTML = '<i class="fa-solid fa-pen"></i> Update Item';
    formBtn.style.backgroundColor = '#228B22';
    itemInput.value = item.textContent;
  
}

/**
 * This function removes the item from the list when the remove 
 * button is clicked.
 * @param {*} event 
 */
const removeItem = (item) =>{
    // remove item from dom
    item.remove();

    // remove item from storage
    removeItemFromStorage(item.textContent);

    checkUI();
}

const removeItemFromStorage = (item) => {
    let itemsFromStorage = getItemsFromStorage();
   
    //Filter out item to be removed
    itemsFromStorage = itemsFromStorage.filter((i) => i !== item);

    // re-setting the local storage
    localStorage.setItem('items',JSON.stringify(itemsFromStorage));
}
/**
 * This funciton clears the list on click of the clear button.
 */
const clearItem = () => {
    //clear from DOM
    if(confirm('Are you sure ?')){
    const items = itemList.querySelectorAll('li');
    items.forEach(item => {
        item.remove();
    });

    //clear from local storage
    localStorage.removeItem('items');

}
    checkUI();
}

/**
 * This fucntion filters the list according to input in the filter field
 * on the UI.
 */

const filterList = (e) => {
    // grabbing neccessary information from the elements
    //const filterInput = itemFilter.value.toLowerCase();
    const filterInput = e.target.value.toLowerCase();
    const items = itemList.querySelectorAll('li');
    
    // this loop will check if the string in the input is part of any
    // existing list items
    items.forEach((item)=>{
        // the first child of the li tag is text node (name of item) and
        // then we use text content to grab the string 
        const itemText = item.firstChild.textContent.toLowerCase();

        //if (itemText.indexOf(filterInput) != -1)
        if(itemText.includes(filterInput)){
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });
}

/**
 * This fucntion checks if the shopping list is empty or not
 * then proceeds to hide the filter input and clear all button.
 */
const checkUI = () => {
    itemInput.value = '';
    const newItems = itemList.querySelectorAll('li');
    if(newItems.length === 0){
        clearBtn.style.display = 'none';
        itemFilter.style.display = 'none';
    } else {
        clearBtn.style.display = 'block';
        itemFilter.style.display = 'block';
    }

    formBtn.innerHTML = '<i class="fa-solid fa-plus"></i> Add Item';
    formBtn.style.backgroundColor = '#333';
    isEditMode = false;

}


//initialize app 
const initialize = () => {
//event listeners
itemForm.addEventListener('submit',onAddItemSubmit);
itemList.addEventListener('click',onclickItem);
clearBtn.addEventListener('click',clearItem);
itemFilter.addEventListener('input',filterList);
document.addEventListener('DOMContentLoaded',displayItems);
// this fucntion checks when load the page
checkUI();
}

initialize();
