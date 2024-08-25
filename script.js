const wrapper = document.querySelector(".sliderWrapper");
const menuItem =  document.querySelectorAll(".menuItem");

let products = [];
let choosenProduct;

const currentProductImg     = document.querySelector('.productImg');
const currentProductTitle   = document.querySelector('.productTitle');
const currentProductPrice   = document.querySelector('.productPrice');
const currentProductColors  = document.querySelectorAll('.color');
const currentProductSizes   = document.querySelectorAll('.size');


const productButton =  document.querySelector(".productButton");
const payment = document.querySelector(".payment");
const close =  document.querySelector(".close");

// Fetch products from JSON file
fetch('products.json')
    .then(response => response.json())
    .then(data => {
        products = data;
        setupMenuItemClickListeners();
    })
    .catch(error => console.error('Error fetching products:', error));


function setupMenuItemClickListeners() {
    menuItem.forEach((item, index) => {
        item.addEventListener('click', () => {
            // Update the selected product based on the menu item clicked
            wrapper.style.transform = `translateX(${-index * 100}vw)`;
            choosenProduct = products[index];
            updateProductDetails(choosenProduct);
        });
    });

    setupColorClickListeners();
    setupSizeClickListeners();
    setupPayClickListener();
}

function updateProductDetails(product) {
    currentProductTitle.textContent = product.title;
    currentProductPrice.textContent = product.price;
    currentProductImg.src = product.colors[0].img;

    currentProductColors.forEach((color, cindex) => {
        color.style.backgroundColor = product.colors[cindex].code;
    });
}

function setupColorClickListeners() {
    currentProductColors.forEach((color, cindex) => {
        color.addEventListener('click', () => {
            currentProductImg.src = choosenProduct.colors[cindex].img;
        });
    });
}

function setupSizeClickListeners() {
    currentProductSizes.forEach((size) => {
        size.addEventListener('click', () => {
            currentProductSizes.forEach((s) => {
                s.style.backgroundColor = ""; // Reset others
                s.style.color = ""; // Reset others
            });
            size.style.backgroundColor = "black";
            size.style.color = "white";
        });
    });
}
function setupPayClickListener(){
    productButton.addEventListener('click',()=>{
        payment.style.display = "flex"
    })
    close.addEventListener('click',()=>{
        payment.style.display = "none"
    })

}
