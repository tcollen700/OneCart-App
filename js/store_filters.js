//product filters
let filterByCatogorySelectorElement = document.getElementById("filter-by-catogory");

for (productCategory in Product.category) {
  //console.log(Product.category[productCategory])
  filterByCatogorySelectorElement.innerHTML += `
  <option id="${productCategory}" value="${Product.category[productCategory]}">${Product.category[productCategory]}</option>
  `
}
function getSelectedCategories() {
  const selectedCategories = Array.from(filterByCatogorySelectorElement.selectedOptions).map(category => category.value)
  return selectedCategories;
}


//sort products
const sortingSelectorElement = document.getElementById("sort-product");

function sortProducts(products) {
  const sortedProducts = [...products];
  
  switch(sortingSelectorElement.value) {
    case "sort-by-price-lowest":
      sortedProducts.sort((a, b) => a.productPrice - b.productPrice);
      break;
    case "sort-by-price-highest":
      sortedProducts.sort((a, b) => b.productPrice - a.productPrice);
      break;
      
    default:
      return products;
  }
  
  return sortedProducts;
}

//filter by search
const searchInputElement = document.getElementById("search-for-products");

function searchProducts(products) {
  const searchQuery = searchInputElement.value.trim();

  let searchKeywords = [];
  let currentKeyword = "";
  
  for (const char of searchQuery) {
    if (searchQuery != " ") {
      if ([" ", ",", ";"].includes(char)) {
        if (currentKeyword) {
          searchKeywords.push(currentKeyword);
          currentKeyword = "";
        }
      } else {
        currentKeyword += char;
      }
    }
  }
  // Adds the last keyword if exists
  if (currentKeyword) {
    searchKeywords.push(currentKeyword);
  }
  console.log(searchKeywords);
  if (searchQuery) {
  // Then use these keywords to filter products:
  const filteredProducts = products.filter(product => searchKeywords.some(keyword => 
      product.productName.toLowerCase().includes(keyword.toLowerCase())
    )
  );
  return filteredProducts;
  };
}

//Reset fiters
function resetProductFilters() {
  filterByCatogorySelectorElement.value= "";
  searchInputElement.value="";
  sortingSelectorElement.value="";
}