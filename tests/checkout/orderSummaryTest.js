// integration test

import { renderOrderSummary } from "../../scripts/checkout/orderSummary.js";
import { loadFromStorage, cart } from "../../data/cart.js";
import { loadProducts } from "../../data/products.js";

describe('test suite: renderOrderSummary', () => {

    // hook

    const productId1 = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6";
    const productId2 = "15b6fc6f-327a-4ec4-896f-486349e85a3d";

    // hook before all done helps in managing async await
    beforeAll((done) => {
      loadProducts(() => {
      //  control done and go to next after its done
        done();
      });
    });

    beforeEach(() => {
        document.querySelector('.js-test-container').innerHTML =
        `
        <div class="js-order-summary"></div>
        <div class="js-payment-summary"></div>
        `;

      const fakeLocalStorage = {
        store: {},
        getItem: jasmine.createSpy('getItem').and.callFake((key) => {
          return JSON.stringify([
            {
                productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                quantity: 2,
                deliveryOptionId: '1'
            },
            {
                productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
                quantity: 1,
                deliveryOptionId: '2'
            }
          ]);
        }),
        setItem: jasmine.createSpy('setItem').and.callFake((key, value) => {
            fakeLocalStorage.store[key] = value;
            }),
      };

      // Replace global localStorage with your fake one
      Object.defineProperty(window, 'localStorage', {
        value: fakeLocalStorage,
        writable: true,
      });

      loadFromStorage();
      renderOrderSummary();
    })


    it('displays the cart', () => {

      expect(
        document.querySelectorAll('.js-cart-item-container-test').length
      ).toEqual(2);

      expect(
        document.querySelector(`.js-product-quantity-test-${productId1}`).innerText
      ).toContain('Quantity: 2');

      expect(
        document.querySelector(`.js-product-quantity-test-${productId2}`).innerText
      ).toContain('Quantity: 1');

    //   clearing the HTML tested
      document.querySelector('.js-test-container').innerHTML = '';

    });


    it('removes a product', () => {

      document.querySelector(`.js-delete-link-test-${productId1}`).click();

      expect(
        document.querySelectorAll('.js-cart-item-container-test').length
      ).toEqual(1);

      expect(
      document.querySelector(`.js-cart-item-container-${productId1}`)).toEqual(null);

      expect(
      document.querySelector(`.js-cart-item-container-${productId2}`)).not.toEqual(null);

      expect(cart.length).toEqual(1);
      expect(cart[0].productId).toEqual(productId2);

    //   clearing the html tested
      document.querySelector('.js-test-container').innerHTML = '';


    });
});