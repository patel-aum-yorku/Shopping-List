const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById("item-input");
const itemList = document.getElementById('item-list');
const clearBtn = document.getElementById('clear');
const itemFilter = document.getElementById('filter');
// event listeners' function
const addItem = (e) => {
    e.preventDefault();
    newItem = itemInput.value;
    // validate input
    if(newItem === ''){
        alert('Please add an item');
    } else {
    // create list item
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(newItem));

    const button = createButton("remove-item btn-link text-red");

    // appending newly created tags to the list
    li.appendChild(button);
    itemList.appendChild(li);

    // reset the input field
    itemInput.value = '';

    // showing the filter field and clear button after adding items
    checkUI();
}
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
 * This function removes the item from the list when the remove 
 * button is clicked.
 * @param {*} event 
 */
const removeItem = (event) =>{
    if (event.target.parentElement.classList.contains('remove-item')){
        event.target.parentElement.parentElement.remove();
    }
    checkUI();
}

/**
 * This funciton clears the list on click of the clear button.
 */
const clearItem = () => {
    confirm('Are you sure ?');
    const items = itemList.querySelectorAll('li');
    items.forEach(item => {
        item.remove();
    })
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
    const newItems = itemList.querySelectorAll('li');
    if(newItems.length === 0){
        clearBtn.style.display = 'none';
        itemFilter.style.display = 'none';
    } else {
        clearBtn.style.display = 'block';
        itemFilter.style.display = 'block';
    }
}



//event listeners
itemForm.addEventListener('submit',addItem);
itemList.addEventListener('click',removeItem);
clearBtn.addEventListener('click',clearItem);
itemFilter.addEventListener('input',filterList);
// this fucntion checks when load the page
checkUI();