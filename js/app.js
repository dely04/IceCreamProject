const products = [
  {
    name: "Vanilla",
    price: 4.99
  },
  {
    name: "Chocolate",
    price: 5.49
  },
  {
    name: "Strawberry",
    price: 5.29
  }
];

const sizes = {
  Small: 3.99,
  Medium: 4.99,
  Large: 5.99
};

const productContainer =
  document.getElementById("productContainer");

const sizeSelect =
  document.getElementById("sizeSelect");

const sizePrice =
  document.getElementById("sizePrice");

const selectedFlavorText =
  document.getElementById("selectedFlavor");

const selectedSizeText =
  document.getElementById("selectedSize");

const orderTotal =
  document.getElementById("orderTotal");

let selectedProduct = null;
let selectedSizeValue = null;


// ----------------------------
// CREATE PRODUCT CARDS
// ----------------------------

function renderProducts(productList) {
  productContainer.innerHTML = "";

  productList.forEach(function (product) {
    const column = document.createElement("div");
    column.className = "col-md-4";

    column.innerHTML = `
      <div class="card h-100 shadow-sm">
        <div class="card-body text-center">
          <h3 class="card-title">${product.name}</h3>
          <p class="card-text">$${product.price.toFixed(2)}</p>
          <button class="btn btn-primary select-product">
            Add to Order
          </button>
        </div>
      </div>
    `;

    productContainer.appendChild(column);
  });
}

renderProducts(products);


// ----------------------------
// EVENT DELEGATION
// ----------------------------

productContainer.addEventListener(
  "click",
  function (event) {

    if (
      event.target.classList.contains(
        "select-product"
      )
    ) {

      const card =
        event.target.closest(".card");

      const productName =
        card.querySelector(
          ".card-title"
        ).textContent.trim();

      selectedProduct =
        products.find(function (product) {
          return product.name === productName;
        });

      selectedFlavorText.textContent =
        selectedProduct.name;

      updateOrderTotal();
    }
  }
);


// ----------------------------
// CREATE SIZE DROPDOWN
// ----------------------------

for (const size in sizes) {

  const option =
    document.createElement("option");

  option.value = size;
  option.textContent = size;

  sizeSelect.appendChild(option);
}


// ----------------------------
// SIZE SELECTION
// ----------------------------

sizeSelect.addEventListener(
  "change",
  function () {

    const selectedSize =
      sizeSelect.value;

    if (selectedSize === "") {

      selectedSizeValue = null;

      selectedSizeText.textContent =
        "None";

      sizePrice.classList.add(
        "d-none"
      );

      updateOrderTotal();

      return;
    }

    selectedSizeValue =
      selectedSize;

    selectedSizeText.textContent =
      selectedSize;

    const price =
      sizes[selectedSize];

    sizePrice.textContent =
      selectedSize +
      " ice cream costs $" +
      price.toFixed(2);

    sizePrice.classList.remove(
      "d-none"
    );

    updateOrderTotal();
  }
);


// ----------------------------
// CALCULATE TOTAL
// ----------------------------

function updateOrderTotal() {

  let total = 0;

  if (selectedProduct) {
    total += selectedProduct.price;
  }

  if (selectedSizeValue) {
    total += sizes[selectedSizeValue];
  }

  orderTotal.textContent =
    total.toFixed(2);
}
const placeOrderBtn =
  document.getElementById("placeOrderBtn");

const orderMessage =
  document.getElementById("orderMessage");


placeOrderBtn.addEventListener(
  "click",
  function () {

    if (!selectedProduct || !selectedSizeValue) {

      orderMessage.textContent =
        "Please select a flavor and a size.";

      orderMessage.classList.remove(
        "alert-success"
      );

      orderMessage.classList.add(
        "alert-warning"
      );

      orderMessage.classList.remove(
        "d-none"
      );

      return;
    }

    orderMessage.textContent =
      "Order placed successfully!";

    orderMessage.classList.remove(
      "alert-warning"
    );

    orderMessage.classList.add(
      "alert-success"
    );

    orderMessage.classList.remove(
      "d-none"
    );
  }
);

// ----------------------------
// PRODUCT SEARCH
// ----------------------------

const productSearch =
  document.getElementById("productSearch");

const searchMessage =
  document.getElementById("searchMessage");

productSearch.addEventListener("input", function () {

  const searchText =
    productSearch.value
      .trim()
      .toLowerCase();

  const filteredProducts =
    products.filter(function (product) {
      return product.name
        .toLowerCase()
        .includes(searchText);
    });

  renderProducts(filteredProducts);

  if (filteredProducts.length === 0) {
    searchMessage.classList.remove("d-none");
  } else {
    searchMessage.classList.add("d-none");
  }
});
