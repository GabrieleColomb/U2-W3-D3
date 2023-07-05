const getMyData = function() {
  fetch("https://striveschool-api.herokuapp.com/books")
    .then((res) => {
      if (res.ok) {
        console.log(res);
        return res.json();
      } else {
        throw new Error("Errore nella chiamata!");
      }
    })
    .then((data) => {
      console.log(data);
      let row = document.querySelector("#library-shelf");
      let chart = document.getElementsByTagName("ul");
      let booksPerRow = 4;
      let currentRow;

      data.forEach((book, index) => {
        if (index % booksPerRow === 0) {
          currentRow = document.createElement("div");
          currentRow.classList.add("row");
          row.appendChild(currentRow);
        }

        let newCol = document.createElement("div");
        newCol.classList.add("col", "col-3");
        newCol.innerHTML = `
          <div class="card shadow mb-4" style="background-color: transparent;">
              <img src="${book.img}" class="card-img-top" height="400px"/>
              <div class="card-body text-white">
                  <h5 class="card-title">${book.title}</h5>
                  <p class="card-text">Price: ${book.price}$</p>
                  
                  <div class="d-flex justify-content-between">
                      <button type="button" class="btn btn-danger remove">Scarta</button>
                      <button type="button" class="btn btn-primary buy">Compra ora</button>
                  </div>
              </div>
          </div>
        `;

        currentRow.appendChild(newCol);

        let buyButton = newCol.querySelector(".buy");
        buyButton.addEventListener("click", function() {
          const cartItem = createCartItem(book);
          cartList.appendChild(cartItem);
          saveCartToLocalStorage();

          const removeFromCartButton = cartItem.querySelector('.remove-from-cart-button');
          removeFromCartButton.addEventListener('click', () => {
            cartItem.remove();
            saveCartToLocalStorage();
          });
        });

        let deleteButton = newCol.querySelector(".remove");
        deleteButton.addEventListener("click", function() {
          newCol.remove();
        });
      });
    })
    .catch((err) => {
      console.log("ERRORE", err);
    });
};

getMyData();