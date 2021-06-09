import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: [],
    products: null,
    filteredProducts: null
};

export const basketSlice = createSlice({
    name: "basket",
    initialState,
    reducers: {

        addProducts: (state, action) => {
            state.products = action.payload
            state.filteredProducts = action.payload
        },

        updateFilters: (state, action) => {
            state.filteredProducts = action.payload
        },
        clearFilters: (state) => {
            state.filteredProducts = state.products
        },

        hydrate: (state, action) => {
            return action.payload;
        },
        // Store actions
        addToBasket: (state, action) => {
            const index = state.items.findIndex(basketItem => basketItem.id == action.payload.id)
            if (action.payload.quantity > 0) {
                if (index >= 0) {
                    state.items[index].quantity += action.payload.quantity
                } else {
                    state.items = [...state.items, action.payload]
                }
            }
        },

        removeFromBasket: (state, action) => {
            const index = state.items.findIndex(
                (basketItem) => basketItem.id === action.payload.id
            );

            let newBasket = [...state.items];

            if (index >= 0) {
                //The Item exist in the basket .. remove it
                newBasket.splice(index, 1)
            } else {
                console.warn(
                    `Cannot remove product (id: ${action.payload.id}) as its not in the basket`
                );
            }

            state.items = newBasket;
        },

        removeGroupedFromBasket: (state, action) => {
            const newBasket = state.items.filter(
                (item) => item.id !== action.payload.id
            );

            state.items = newBasket;
        },

        clearBasket: (state, action) => {
            state.items = [];
        },
        updateQuantity: (state, action) => {
            const index = state.items.findIndex(basketItem => basketItem.id == action.payload.id)

            if (index >= 0) {
                if (action.payload.quantity > 0) {
                    state.items[index].quantity = action.payload.quantity
                } else {
                    let newBasket = [...state.items]
                    newBasket.splice(index, 1)
                    state.items = newBasket
                }
            } else console.warn(`Can't remove product ${action.payload.id} as its does not exist!`)
        },
    },
});

export const { addToBasket, removeFromBasket, removeGroupedFromBasket, hydrate, clearBasket, updateQuantity, addProducts, updateFilters, clearFilters } = basketSlice.actions;

// Selectors - This is how we pull information from the Global store slice
export const selectItems = (state) => state.basket.items;
export const selectTotal = (state) => state.basket.items.reduce((total, item) => total + item.price * item.quantity, 0);
export const selectFilteredProducts = (state) => state.basket.filteredProducts;
export const selectTotalItems = (state) => state.basket.items.reduce((total, item) => total + item.quantity, 0);
export const selectProducts = (state) => state.basket.products;


export default basketSlice.reducer;