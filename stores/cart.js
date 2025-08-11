import { defineStore } from "pinia";

export const useCartStore = defineStore("cart", {
  state: () => ({
    items: [],
    nextBuyItems: [],
    activeTab: "cart",
  }),

  actions: {
    addToCart(product) {
      const cartItem = this.items.find((item) => item.id === product.id);
      if (cartItem) {
        cartItem.quantity++;
      } else {
        this.items.push({
          ...product,
          quantity: 1,
          addedAt: new Date().toISOString(),
        });
      }
    },

    removeFromCart(product) {
      this.items = this.items.filter((item) => !(item.id === product.id));
    },
    quantityIncreament(product) {
      const cartItem = this.items.find((item) => item.id === product.id);
      if (cartItem) {
        cartItem.quantity += 1;
      }
    },
    quantityDecreament(product) {
      const cartItem = this.items.find((item) => item.id === product.id);
      if (cartItem?.quantity > 1) {
        cartItem.quantity -= 1;
      } else if (cartItem?.quantity === 1) {
        this.removeFromCart(product);
      }
    },
    clearCart() {
      this.items = [];
    },

    moveToNextBuy(product) {
      const itemForNextBuy = this.items.find((item) => item.id === product.id);
      if (itemForNextBuy) {
        this.nextBuyItems.push(itemForNextBuy);
        this.items = this.items.filter((item) => item !== itemForNextBuy);
      }
    },
    moveToCart(product) {
      const itemToMove = this.nextBuyItems.find(
        (item) => item.id === product.id,
      );

      if (itemToMove) {
        this.nextBuyItems = this.nextBuyItems.filter(
          (item) => item !== itemToMove,
        );

        const cartItem = this.items.find((item) => item.id === itemToMove.id);

        if (cartItem) {
          cartItem.quantity++;
        } else {
          this.items.push({
            ...itemToMove,
          });
        }
        this.activeTab = "cart";
      }
    },
    moveAllToCart() {
      this.nextBuyItems.forEach((itemToMove) => {
        const existingItem = this.items.find(
          (item) => item.id === itemToMove.id,
        );

        if (existingItem) {
          existingItem.quantity += itemToMove.quantity;
        } else {
          this.items.push({ ...itemToMove });
        }
      });

      this.nextBuyItems = [];
      this.activeTab = "cart";
    },
    removeFromNextBuyItems(product) {
      this.nextBuyItems = this.nextBuyItems.filter(
        (item) => !(item.id === product.id),
      );
    },
  },

  getters: {
    totalItems: (state) => {
      return state.items.reduce((total, item) => total + item.quantity, 0);
    },
    totalNextBuyItems: (state) => {
      return state.nextBuyItems.reduce(
        (total, item) => total + item.quantity,
        0,
      );
    },
    getCartTotalWithoutDiscount: (state) => {
      return state.items.reduce((total, item) => {
        const itemPrice = item.regular_price * item.quantity;
        return total + itemPrice;
      }, 0);
    },
    getCartTotalWithDiscount: (state) => {
      return state.items.reduce((total, item) => {
        const itemPrice =
          (item.sale_price || item.regular_price) * item.quantity;
        return total + itemPrice;
      }, 0);
    },
    getTotalWeight: (state) => {
      return state.items.reduce((total, item) => {
        const itemWeight = (item.weight || 0) * item.quantity;
        return total + itemWeight;
      }, 0);
    },
    getAllDiscounts() {
      if (this.getCartTotalWithoutDiscount === 0) return 0;
      const discountPercent =
        ((this.getCartTotalWithoutDiscount - this.getCartTotalWithDiscount) /
          this.getCartTotalWithoutDiscount) *
        100;
      return Math.round(discountPercent);
    },
  },

  persist: true,
});
