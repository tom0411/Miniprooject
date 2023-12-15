let addButton = document.getElementById('saveButton');
let myList = document.getElementById('eventlist');

addButton.addEventListener('click', function(e) {

  let inputText = document.getElementById('enterframe').value;
  postItem(inputText)
  if (inputText.trim() !== '') {
    let newItem = document.createElement('ul'); // Create a new list item
    let itemText = document.createTextNode(inputText); // Create a text node with the input text

    let newButton = document.createElement('button'); // Create a new button
    newButton.classList.add('btn', 'btn-primary');
    newButton.textContent = 'Delete'; // Set the text content of the button
    newButton.addEventListener('click', function() {
      newItem.remove();
    });

    let checkbox = document.createElement('input'); // Create a new checkbox
    checkbox.type = 'checkbox';

    // Declare inputField outside of the event listener to make it accessible in both if and else blocks
    let inputField = document.createElement('input');
    inputField.classList.add('inputarea');
    inputField.type = 'text';

    checkbox.addEventListener('change', function() {
      if (this.checked) {
        inputField.value = itemText.data; // Set the value of the input field
        newItem.replaceChild(inputField, itemText); // Replace the text node with the input field
      } else {
        itemText.data = inputField.value; // Update the text node with the input field's current value
        newItem.replaceChild(itemText, inputField); // Replace the input field with the text node
      }
    });
    newItem.appendChild(checkbox);    // Append the checkbox to the new list item
    newItem.appendChild(itemText); // Append the text node to the new list item
    newItem.appendChild(newButton); // Append the "Delete" button to the new list item

    myList.appendChild(newItem); // Append the new list item to the existing list
    document.getElementById('enterframe').value = ''; // Clear the input field
  }
  
  
});

async function getItems(){
  let result=await fetch("/item")
  let items=await result.json()

for(let item of items){

  if (item.tittle) {
    console.log("loop items");
    let newItem = document.createElement('ul'); // Create a new list item
    let itemText = document.createTextNode(item.tittle); // Create a text node with the input text

    let newButton = document.createElement('button'); // Create a new button
    newButton.classList.add('btn', 'btn-primary');
    newButton.textContent = 'Delete'; // Set the text content of the button
    newButton.addEventListener('click', function() {
      newItem.remove();
    });

    let checkbox = document.createElement('input'); // Create a new checkbox
    checkbox.type = 'checkbox';

    // Declare inputField outside of the event listener to make it accessible in both if and else blocks
    let inputField = document.createElement('input');
    inputField.classList.add('inputarea');
    inputField.type = 'text';

    checkbox.addEventListener('change', function() {
      if (this.checked) {
        inputField.value = itemText.data; // Set the value of the input field
        newItem.replaceChild(inputField, itemText); // Replace the text node with the input field
      } else {
        itemText.data = inputField.value; // Update the text node with the input field's current value
        newItem.replaceChild(itemText, inputField); // Replace the input field with the text node
      }
    });
    newItem.appendChild(checkbox);    // Append the checkbox to the new list item
    newItem.appendChild(itemText); // Append the text node to the new list item
    newItem.appendChild(newButton); // Append the "Delete" button to the new list item

    myList.appendChild(newItem); // Append the new list item to the existing list
    document.getElementById('enterframe').value = ''; // Clear the input field
  }
  
}


}
getItems()



async function postItem(inputValue){
  let result=await fetch("/item",{
  method:"POST",
  headers:{"Content-type": "application/json"},
  body:JSON.stringify({title:inputValue})})  
  // await result.json()
}
