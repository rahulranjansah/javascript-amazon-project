import {addToCart, cart, loadFromStorage } from '../../data/cart.js';
import { deliveryOptions } from '../../data/deliveryOptions.js';


describe('test suit: addToCart', () => {

    it ('adds an exisiting product to the cart', () => {
        const fakeLocalStorage = {
            store: {},
            getItem: jasmine.createSpy('getItem').and.callFake((key) => {
                return JSON.stringify([{
                    productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                    quantity: 2,
                    deliveryOptionId: '1'
                }])
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

      addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');

      expect(cart.length).toEqual(1);
      expect(localStorage.setItem).toHaveBeenCalledTimes(1);
      expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
      expect(cart[0].quantity).toEqual(3);

    });


    it('adds a new product to the cart', () => {
      const fakeLocalStorage = {
        store: {},
        getItem: jasmine.createSpy('getItem').and.callFake((key) => {
          return JSON.stringify([]);
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

      addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
      addToCart('15b6fc6f-327a-4ec4-896f-486349e85a3d');

      expect(cart.length).toEqual(2);
      expect(localStorage.setItem).toHaveBeenCalledTimes(2);
      expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
      expect(cart[0].quantity).toEqual(1);
    });
  });
