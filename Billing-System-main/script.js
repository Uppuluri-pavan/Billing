


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





/*body releted script*/


      // Function to redirect to admin page
      function redirectToAdminPage() {
        swal("Good job!", "Now Your Going To Admin Page!", "success");
       // Redirect to admin.html
       window.location.href = "admin.html";
      }
   
   
   
     const itemList = [
       { name: 'Dum Tea', price: 15, image: 'images/dum tea.png' },
       { name: 'Ginger Tea', price: 20, image: 'images/Ginger Tea.jpeg' },
       { name: 'Lemon Tea', price: 20, image: 'images/Lemon Tea1.jpeg' },
       { name: 'Ginger Lemon Tea', price: 20, image: 'images/Ginger Lemon Tea.png' },
       { name: 'Black Tea', price: 20, image: 'images/Black Tea.png' },
       { name: 'Masala Tea', price: 20, image: 'images/Masala Tea.png' },
       { name: 'Bellam Pepper Tea', price: 20, image: 'images/Bellam Pepper Tea.jpg' },
       { name: 'Coffe', price: 20, image: 'images/Coffe.jpg' },
       { name: 'Badam Milk', price: 25, image: 'images/Badam Milk.jpeg' },
       { name: 'Kashmiri Tea', price: 25, image: 'images/Kashmiri Tea.jpeg'},
       { name: 'Kullad Tea', price: 25, image: 'images/Kullad Tea.jpg'},
       { name: 'Green Tea', price: 25, image: 'images/Green Tea1.jpg'},
       // Add more items as needed
     ];
   
     let selectedItems = [];
   
     // Retrieve itemList from localStorage or initialize it as an empty array
     let itemListFromStorage = JSON.parse(localStorage.getItem('itemList')) || [];
   
     // If storedItemList is not empty, assign its value to itemList
     if (itemListFromStorage.length > 0) {
       itemList.push(...itemListFromStorage);
     }
   
     function searchItems() {
       const searchInput = document.getElementById('searchInput').value.toLowerCase();
       const searchResultsDiv = document.getElementById('searchResults');
       searchResultsDiv.innerHTML = '';
       const results = itemList.filter(item => item.name.toLowerCase().includes(searchInput));
       results.forEach(item => {
         const itemIndex = selectedItems.findIndex(selectedItem => selectedItem.name === item.name);
         const quantity = itemIndex !== -1 ? selectedItems[itemIndex].quantity : 0;
         const itemDiv = document.createElement('div');
         itemDiv.classList.add('product-item');
         itemDiv.innerHTML = `
         <div class="item-info">
           ${item.image ? `<img src="${item.image}" alt="${item.name}" class="item-image">` : ''}
           <div>
             <div class="product-name" style="font-size: 14px;">${item.name}</div>
             <div style="font-size: 14px;">Price: ₹${item.price}</div>
           </div>
         </div>
           <button onclick="selectItem('${item.name}')" class="btn btn-success" border-radius: 8px;">Add Item</button>
         `;
         searchResultsDiv.appendChild(itemDiv);
       });
     }
   
     function selectItem(itemName) {
       const itemIndex = selectedItems.findIndex(selectedItem => selectedItem.name === itemName);
       if (itemIndex !== -1) {
         selectedItems[itemIndex].quantity++;
       } else {
         selectedItems.push({ name: itemName, price: itemList.find(item => item.name === itemName).price, quantity: 1 });
       }
       displaySelectedItems();
       calculateTotalPrice();
     }
   
     function displaySelectedItems() {
       const selectedItemsTableBody = document.getElementById('selectedItemsTableBody');
       selectedItemsTableBody.innerHTML = '';
       selectedItems.forEach((item, index) => {
         const totalPrice = item.price * item.quantity;
         const row = `
           <tr>
             <td>${index + 1}</td>
             <td>${item.name}</td>
             <td>${item.quantity}</td>
             <td>${item.quantity}X${item.price} = ₹${totalPrice}</td>
             <td><button class="remove-button" onclick="removeItem('${item.name}')">Remove</button></td>
           </tr>
         `;
         selectedItemsTableBody.innerHTML += row;
       });
     }
   
     function removeItem(itemName) {
       const itemIndex = selectedItems.findIndex(selectedItem => selectedItem.name === itemName);
       if (selectedItems[itemIndex].quantity > 1) {
         selectedItems[itemIndex].quantity--;
       } else {
         selectedItems.splice(itemIndex, 1);
       }
       displaySelectedItems();
       calculateTotalPrice();
     }
   
     function calculateTotalPrice() {
       const totalPrice = selectedItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
       document.getElementById('totalPrice').textContent = `Total Price: ₹${totalPrice}`;
     }
   
     function togglePaymentMode(mode) {
       const offlineCheckbox = document.querySelector('.payment-mode-checkbox:nth-child(1)');
       const onlineCheckbox = document.querySelector('.payment-mode-checkbox:nth-child(2)');
       offlineCheckbox.checked = false;
       onlineCheckbox.checked = false;
       if (mode === 'offline') {
         offlineCheckbox.checked = true;
       } else {
         onlineCheckbox.checked = true;
       }
       calculateBalance();
     }
   
     function calculateBalance() {
       const totalPrice = selectedItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
       const amountPaid = document.getElementById('amount').value || 0;
       const balance = amountPaid - totalPrice;
       document.getElementById('balance').textContent = `₹${balance}`;
     }
   
     function printInvoice() {
       swal("Printing Invoice!", "Ready To Print Invoice!", "success");
       const currentDate = new Date().toLocaleDateString();
       document.getElementById('invoiceDate').textContent = currentDate;
       
       // Populate selected items table
       const invoiceItemsTableBody = document.getElementById('invoiceItemsTableBody');
       invoiceItemsTableBody.innerHTML = '';
       selectedItems.forEach((item, index) => {
         const totalPrice = item.price * item.quantity;
         const row = `
           <tr>
             <td>${index + 1}</td>
             <td>${item.name}</td>
             <td>${item.quantity}</td>
             <td>${item.quantity}X${item.price} = ₹${totalPrice}</td>
             <td>₹${totalPrice}</td>
           </tr>
         `;
         invoiceItemsTableBody.innerHTML += row;
       });
   
       // Calculate and display total price
       const totalPrice = selectedItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
       document.getElementById('totalPricePrint').textContent = `₹${totalPrice}`;
   
        // Display payment mode
        const paymentMode = document.querySelector('input[name="html"]:checked').id;
        document.getElementById('paymentModePrint').textContent = `Payment Mode: ${paymentMode}`;
   
       // Display amount and balance
       const amountPaid = document.getElementById('amount').value || 0;
       document.getElementById('amountPrint').textContent = `₹${amountPaid}`;
       const balance = amountPaid - totalPrice;
       document.getElementById('balancePrint').textContent = `₹${balance}`;
   
       // Display printable section and print
       document.getElementById('print-section').style.display = 'block';
       window.print();
   
       // Hide printable section after printing
       document.getElementById('print-section').style.display = 'none';
   
     }
   
     // Function to update itemList in localStorage
     function updateItemListInStorage() {
       localStorage.setItem('itemList', JSON.stringify(itemList));
     }
