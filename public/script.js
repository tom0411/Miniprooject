// Function to create a new item
async function postItem(inputValue) {
  let result = await fetch("/item", {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({ title: inputValue })
  });

  // Handle the response if needed
}

// Function to delete an item
async function deleteItem(id) {
  let result = await fetch(`/item?id=${id}`, {
    method: "DELETE"
  });

  // Handle the response if needed
}

// Function to update an item
async function updateItem(id, newValue) {
  let result = await fetch(`/item?id=${id}`, {
    method: "PUT",  // Assuming "PUT" is used to update an existing item
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify({ title: newValue })
  });

  // Handle the response if needed
}

document.addEventListener('DOMContentLoaded', function() {
  // Get the "Save" button
  let addButton = document.getElementById('saveButton');
  let myList = document.getElementById('eventlist');

  addButton.addEventListener('click', function() {
    let inputText = document.getElementById('enterframe').value;
    postItem(inputText);
    getItems();
  });

  // Function to retrieve items from the server
  async function getItems() {
    let result = await fetch("/item");
    let items = await result.json();

    myList.innerHTML = '';

    for (let item of items) {
      if (item.title) {
        let newItem = document.createElement('ul');
        let itemText = document.createTextNode(item.title);

        let deleteButton = document.createElement('button');
        deleteButton.classList.add('btn', 'btn-primary');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', function() {
          deleteItem(item.id);
          getItems();
        });

        let checkbox = document.createElement('input');
        checkbox.type = 'checkbox';

        let inputField = document.createElement('input');
        inputField.classList.add('inputarea');
        inputField.type = 'text';

        let saveButton = document.createElement('button');
        saveButton.classList.add('btn', 'btn-primary');
        saveButton.textContent = 'Save';

        checkbox.addEventListener('change', function() {
          if (this.checked) {
            inputField.value = itemText.data;
            newItem.replaceChild(inputField, itemText);
            newItem.insertBefore(saveButton, deleteButton);// Append the "Save" button when the checkbox is checked
          } else {
            itemText.data = inputField.value;
            newItem.replaceChild(itemText, inputField);
            newItem.removeChild(saveButton); // Remove the "Save" button when the checkbox is unchecked
          }
        });

        // Add a click event listener to the "Save" button
        saveButton.addEventListener('click', async function() {

        });

        newItem.appendChild(checkbox);
        newItem.appendChild(itemText);
        newItem.appendChild(deleteButton);
        myList.appendChild(newItem);
        document.getElementById('enterframe').value = '';
      }
    }
  }

  getItems();
});