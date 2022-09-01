const loadProduct = async (search) => {
  const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${search}`;
  const res = await fetch(url);
  const data = await res.json();
  return data.drinks;
};

const dispalyProduct = async (search) => {
  const productItem = await loadProduct(search);
  // console.log(productItem);
  const cardItem = document.getElementById("product-item");
  cardItem.textContent = "";
  // not found message
  const notFound = document.getElementById("not-found");
  notFound.classList.remove("hidden");
  displayLoader(false);
  productItem.forEach((product) => {
    const { strDrink, strDrinkThumb } = product;
    const cardDiv = document.createElement("div");
    cardDiv.innerHTML = `
        <div class="card w-full bg-base-100 shadow-xl">
        <figure>
          <img src="${strDrinkThumb}" alt="Shoes" />
        </figure>
        <div class="card-body">
          <h2 class="card-title">${strDrink}</h2>
          <div class="card-actions justify-end">
          <label for="my-modal-3"
          onclick="productModal('${product.idDrink}')"
          class="btn btn-primary modal-button">Book Now</label>
          </div>
        </div>
      </div>
        `;
    cardItem.appendChild(cardDiv);
    notFound.classList.add("hidden"); // not-found message
  });
};

// search function
const searchInput = document.getElementById("input-field");
searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    displayLoader(true);
    const searchValue = searchInput.value;
    dispalyProduct(searchValue);
  }
});

// loader function
const displayLoader = (isLoader) => {
  // spinner
  const spinner = document.getElementById("spinner");
  if (isLoader) {
    spinner.classList.remove("hidden");
  } else {
    spinner.classList.add("hidden");
  }
};

// modal function
const productModal = async (id) => {
  const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
  const res = await fetch(url);
  const data = await res.json();
  productModalDetail(data.drinks[0]);
};

const productModalDetail = (product) => {
  console.log(product);
  const modalDetail = document.getElementById("modal-detail");
  const {
    strDrink,
    strDrinkThumb,
    strAlcoholic,
    strCategory,
    strGlass,
    strInstructionsDE,
    strMeasure1,
    strIngredient1,
    strIngredient2,
    strIngredient3,
  } = product;
  modalDetail.innerHTML = `
    <h3 class="text-lg font-bold text-slate-900">Brand: <span class="text-rose-500">${strDrink}</span></h3>
    <div class=" gap-4 items-center">
       <img class="h-100 w-100 mt-4 mx-auto rounded-xl" src="${strDrinkThumb}">
        <div class="mt-4 py-3">
          <p><span class="text-slate-900 font-semibold">Alcoholic</span>: ${strAlcoholic}</p>
          <p><span class="text-slate-900 font-semibold">Category</span>: ${strCategory}</p>
          <p><span class="text-slate-900 font-semibold">Glass</span>: ${strGlass}</p>
          <p><span class="text-slate-900 font-semibold">Measure1</span>: ${strMeasure1}</p>
          <p><span class="text-slate-900 font-semibold">Ingredient1</span>: ${strIngredient1}</p>
          <p><span class="text-slate-900 font-semibold">Ingredient1</span>: ${strIngredient1}</p>
          <p><span class="text-slate-900 font-semibold">Ingredient2</span>: ${strIngredient2}</p>
          <p><span class="text-slate-900 font-semibold">Ingredient3</span>: ${strIngredient3}</p>
        </div>
        <p><span class="font-semibold">Instructions</span>: ${strInstructionsDE}</p>
    </div>
    `;
};

dispalyProduct("");
