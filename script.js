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
let currentIndex = 0;
const slideDuration = 8000;

function startSlider() {
  setInterval(() => {
    currentIndex = (currentIndex + 1) % products.length;
    wrapper.style.transform = `translateX(${-100 * currentIndex}vw)`;


    choosenProduct = products[currentIndex];
    currentProductTitle.textContent = choosenProduct.title;
    currentProductPrice.textContent = choosenProduct.price;
    currentProductImg.src = choosenProduct.colors[0].img;

    currentProductColors.forEach((color, index) => {
      color.style.backgroundColor = choosenProduct.colors[index].code;
    });
  }, slideDuration);
}
startSlider();

// Scroll to top functionality
topButton.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('registrationForm');
  const formErrors = document.getElementById('formErrors');
  
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    formErrors.innerHTML = ''; 

    const name = form.querySelector('#name').value;
    const email = form.querySelector('#email').value;
    const phone = form.querySelector('#phone').value;
    
    const errors = [];
    

    if (name.trim() === '') {
      errors.push('Name is required.');
    }

    // Validate Email
    const emailPattern = /^[a-zA-Z0-9._%+-]+@iti\.com$/;
    if (!emailPattern.test(email)) {
      errors.push('Email must be in the format example@iti.com.');
    }

    // Validate Phone (assuming it should be Egyptian phone number format)
    const phonePattern = /^01[0-9]{9}$/;
    if (!phonePattern.test(phone)) {
      errors.push('Phone number must be a valid Egyptian phone number (01XXXXXXXXX).');
    }

    if (errors.length > 0) {
      formErrors.innerHTML = errors.join('<br>');
    } else {

      form.submit();
    }
  });
});

