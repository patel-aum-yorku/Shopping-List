const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById("item-input");
const itemList = document.getElementById('item-list');

// event listeners' function
const addItem = (e) => {
    e.preventDefault();
    newItem = itemInput.value;
    // validate input
    if(newItem === ''){
        alert('Please add an item');
    }
    // create list item
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(newItem));

    const button = createButton("remove-item btn-link text-red");

    // appending newly created tags to the list
    li.appendChild(button);
    itemList.appendChild(li);

    // reset the input field
    itemInput.value = '';
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


//event listeners
itemForm.addEventListener('submit',addItem);