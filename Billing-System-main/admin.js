let loginform = document.querySelector('.login-form');

document.querySelector('#login-btn').onclick = () =>
{
    loginform.classList.toggle('active');

    
}


window.onscroll = () =>
{
    searchForm.classList.remove('active');
    shoppingCart.classList.remove('active');
    loginform.classList.remove('active');
    menuitems.classList.remove('active');
} 






//main body scrip

let itemList = JSON.parse(localStorage.getItem('itemList')) || [];

  function addItem() {
    const itemName = document.getElementById('itemName').value.trim();
    const itemPrice = parseFloat(document.getElementById('itemPrice').value.trim());
    const fileInput = document.getElementById('itemImage');
    
    // Check if an image is selected
    if (fileInput.files.length > 0) {
        const reader = new FileReader();
        reader.onload = function(event) {
            const itemImageDataUrl = event.target.result;
            
            // Add the item with image to itemList
            itemList.push({ name: itemName, price: itemPrice, image: itemImageDataUrl });
            updateItemListInStorage();
            swal("Item Added", "Item added successfully!", "success");
        }
        
        // Read the selected image file as data URL
        reader.readAsDataURL(fileInput.files[0]);
    } else {
      swal("Select Image", "Please select an image for the item!", "error");
    }
    
    document.getElementById('itemName').value = '';
    document.getElementById('itemPrice').value = '';
}

  function removeItem() {
    const itemName = document.getElementById('removeItemName').value.trim();
    if (itemName) {
      itemList = itemList.filter(item => item.name !== itemName);
      updateItemListInStorage();
      swal("Deleted", "Item deleted successfully!", "success");
    } else {
      swal("Enter Name", "Please enter an item name to delete!", "error");
    }
    document.getElementById('removeItemName').value = '';
  }

  // Function to update itemList in localStorage
  function updateItemListInStorage() {
    localStorage.setItem('itemList', JSON.stringify(itemList));
  }
