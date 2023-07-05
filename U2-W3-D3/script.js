function createBookCard(book) {
  const card = document.createElement('div');
  card.className = 'col-md-3 mb-4';

  const cardBody = document.createElement('div');
  cardBody.className = 'card-body d-flex flex-column';

  const cardTitle = document.createElement('h5');
  cardTitle.className = 'card-title text-white';
  cardTitle.textContent = book.title;

  const cardPrice = document.createElement('p');
  cardPrice.className = 'card-text text-white';
  cardPrice.textContent = `Price: $${book.price}`;

  const cardImage = document.createElement('img');
  cardImage.className = 'card-img-top';
  cardImage.src = book.img;
  cardImage.alt = book.title;
  cardImage.style.height = '500px';

  const buttonContainer = document.createElement('div');
  buttonContainer.className = 'mt-auto';

  const discardButton = document.createElement('button');
  discardButton.className = 'btn btn-danger discard-button';
  discardButton.textContent = 'Scarta';

  const addToCartButton = document.createElement('button');
  addToCartButton.className = 'btn btn-primary add-to-cart-button float-end';
  addToCartButton.textContent = 'Compra ora';

  cardBody.appendChild(cardTitle);
  cardBody.appendChild(cardPrice);

  buttonContainer.appendChild(discardButton);
  buttonContainer.appendChild(addToCartButton);

  cardBody.appendChild(buttonContainer);

  card.appendChild(cardImage);
  card.appendChild(cardBody);

  return card;
}
  
  function createCartItem(book) {
    const listItem = document.createElement('li');
    listItem.className = 'list-group-item d-flex justify-content-between align-items-center';
  
    const title = document.createElement('span');
    title.textContent = book.title;
  
    const removeButton = document.createElement('button');
    removeButton.className = 'btn btn-danger remove-from-cart-button';
    removeButton.textContent = 'Rimuovi';
  
    listItem.appendChild(title);
    listItem.appendChild(removeButton);
  
    return listItem;
  }
  
  async function getBooks() {
    try {
      const response = await fetch('https://striveschool-api.herokuapp.com/books');
      const books = await response.json();
  
      const bookList = document.getElementById('bookList');
      const cartList = document.getElementById('cartList');
  
      books.forEach(function (book) {
        const bookCard = createBookCard(book);
        bookList.appendChild(bookCard);
  
        const addToCartButton = bookCard.querySelector('.add-to-cart-button');
        addToCartButton.addEventListener('click', () => {
          const cartItem = createCartItem(book);
          cartList.appendChild(cartItem);
          saveCartToLocalStorage();
  
          const removeFromCartButton = cartItem.querySelector('.remove-from-cart-button');
          removeFromCartButton.addEventListener('click', () => {
            cartItem.remove();
            saveCartToLocalStorage();
          });
        });
  
        const discardButton = bookCard.querySelector('.discard-button');
        discardButton.addEventListener('click', () => {
          bookCard.parentNode.removeChild(bookCard);
        });
      });
  
      const discardButtons = document.querySelectorAll('.discard-button');
      let maxHeight = 0;
  
      discardButtons.forEach((button) => {
        maxHeight = Math.max(maxHeight, button.offsetHeight);
      });
  
      discardButtons.forEach((button) => {
        button.style.height = `${maxHeight}px`;
      });
    } catch (error) {
      console.error('Errore durante il recupero dei libri:', error);
    }
  }
  
  function saveCartToLocalStorage() {
    const cartItems = document.querySelectorAll('#cartList li');
    const cartBooks = [];
  
    cartItems.forEach((item) => {
      cartBooks.push(item.textContent);
    });
  
    localStorage.setItem('cart', JSON.stringify(cartBooks));
  }
  
  function loadCartFromLocalStorage() {
    const cart = localStorage.getItem('cart');
  
    if (cart) {
      const cartBooks = JSON.parse(cart);
      const cartList = document.getElementById('cartList');
  
      cartBooks.forEach((bookTitle) => {
        const cartItem = createCartItem({ title: bookTitle });
        cartList.appendChild(cartItem);
  
        const removeFromCartButton = cartItem.querySelector('.remove-from-cart-button');
        removeFromCartButton.addEventListener('click', () => {
          cartItem.remove();
          saveCartToLocalStorage();
        });
      });
    }
  }
  
  getBooks();
  loadCartFromLocalStorage();  