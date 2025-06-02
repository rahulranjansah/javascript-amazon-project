
// saving the data
// const products = [{
//    image: 'images/products/athletic-cotton-socks-6-pairs.jpg',
//    name: 'Black and Gray Athletic Cotton Socks - 6 Pairs',
//    rating: {
//     stars: 4.5,
//     count: 87
//    },
//    priceCents: 1090
// },
// {
//     image: "images/products/intermediate-composite-basketball.jpg",
//     name: "Intermediate Size Basketball",
//     rating: {
//       stars: 4,
//       count: 127
//     },
//     priceCents: 2095
// },
// {
//     image: "images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg",
//     name: "Adults Plain Cotton T-Shirt - 2 Pack",
//     rating: {
//       stars: 4.5,
//       count: 56
//     },
//     priceCents: 799
// }];

// loading the data
// in html scripts we load the products then we call it here with name as products

// generating the HTML

// way to fight the naming conflicts
import {cart} from '../data/cart.js';
import {products} from '../data/products.js';

let productsHTML = '';

products.forEach((product) =>
{
    productsHTML += `
        <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${product.rating.stars * 10}.png">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            $${(product.priceCents / 100).toFixed(2)}
          </div>

          <div class="product-quantity-container">
            <select>
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart-button" data-product-id="${product.id}">
            Add to Cart
          </button>
        </div>
    `
});

// console.log(productsHTML)

// adding the HTML tag and gluing it together

document.querySelector('.js-product-grid').innerHTML = productsHTML;


// problem solved which element do we have to add using data-product-name?

document.querySelectorAll('.js-add-to-cart-button').forEach((button) =>
  {
    button.addEventListener('click', () =>
    {
      // console.log('Added button')
      // console.log(button.dataset.productName);
      const productId = button.dataset.productId;

      let matchingItem;

      cart.forEach(
        (item) => {
          if (productId === item.productId)
          {
            matchingItem = item;
          }
        });

        if (matchingItem)
        {
          matchingItem.quantity += 1
        }

        else
        {
          cart.push ({
            productId: productId,
            quantity: 1
          });
        };

        let cartQuantity = 0;
        cart.forEach((item) =>
        {
          cartQuantity += item.quantity;
        });

      // implementing cartQuantity with JS and DOM
      document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;

      // console.log(cartQuantity);
      // console.log(cart);
    });
  });