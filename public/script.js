// Function to delete an item
async function deleteItem(id) {
  try {
    let result = await fetch(`/item?id=${id}`, {
      method: "DELETE"
    });
    if (!result.ok) {
      throw new Error(`Failed to delete item with ID: ${id}`);
    }
    console.log("Item deleted successfully");
  } catch (error) {
    console.error("Error deleting item:", error);
  }
}

// Function to update an item
async function updateItem(id, title) {
  try {
    let response = await fetch(`/item`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ id: id, title: title })
    });

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    let result = await response.json();
    console.log('Update successful:', result);
  } catch (error) {
    console.error('Error during updateItem:', error);
  }
}

// Function to create a new item
async function postItem(inputValue) {
  try {
    let result = await fetch("/item", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ title: inputValue })
    });

    if (!result.ok) {
      throw new Error(`Failed to post item: ${inputValue}`);
    }
    console.log("Item posted successfully");
  } catch (error) {
    console.error("Error posting item:", error);
  }
}

async function clearItem() {
  try {
    let result = await fetch("/item", {
      method: "DELETE",
      headers: { "Content-type": "application/json" },
    });

    if (!result.ok) {
      throw new Error(`Failed to delete items`);
    }
    console.log("All items deleted successfully");
  } catch (error) {
    console.error("Error clearing items:", error);
  }
}

// Event listener for the save button
let saveButton = document.getElementById('saveButton');
saveButton.addEventListener('click', async function() {
  let title = document.getElementById('enterframe').value;
  if (title === '') {
    alert('Please enter something to do!');
  } else {
    await postItem(title);
    await getItems();
  }
});

// Event listener for the clear button
let clearButton = document.getElementById('clearButton');
clearButton.addEventListener('click', async function() {
  if (confirm('Are you sure you want to delete all items?')) {
    let myList = document.getElementById('eventlist');
    myList.innerHTML = '';
    await clearItem();
  }
});
// Function to retrieve items from the server
async function getItems() {
  try {
    let result = await fetch("/item");
    let items = await result.json();
    let myList = document.getElementById('eventlist');
    myList.innerHTML = '';

    for (let item of items) {
      if (item.title) {
        let newItem = document.createElement('ul');
        let itemText = document.createTextNode(item.title);
  
        let deleteButton = document.createElement('button');
        deleteButton.classList.add('btn', 'btn-primary');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', async function() {
          await deleteItem(item.id);
          await getItems();
        });

        let checkbox = document.createElement('input');
        checkbox.type = 'checkbox';

        let inputField = document.createElement('input');
        inputField.classList.add('inputarea');
        inputField.type = 'text';

        let saveButton = document.createElement('button');
        saveButton.classList.add('btn', 'btn-primary',"saveBtn");
        saveButton.textContent = 'Save';

        checkbox.addEventListener('change', function() {
          if (this.checked) {  
            inputField.value = itemText.data;
            newItem.replaceChild(inputField, itemText);
            newItem.insertBefore(saveButton, deleteButton);
            saveButton.addEventListener("click", async () => {
              let id = item.id;
              let title = inputField.value;
              await updateItem(id, title);
              await getItems();
            });
          } else {
            itemText.data = inputField.value;
            newItem.replaceChild(itemText, inputField);
            newItem.removeChild(saveButton);
          }

        });

        newItem.appendChild(checkbox);
        newItem.appendChild(itemText);
        newItem.appendChild(deleteButton);
        myList.appendChild(newItem);
        document.getElementById('enterframe').value = '';
      }
    }
  } catch (error) {
    console.error('Error getting items:', error);
  }
}

// Initial call to retrieve items
getItems();
