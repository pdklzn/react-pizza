import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    totalPrice: 0,
    items: [],
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem: (state, action) => {
            const findItem = state.items.find(item => item.id === action.payload.id);
            
            if (findItem) {
                findItem.count++
            } else {
                state.items.push({...action.payload, count: 1 })
            }
            state.totalPrice = state.items.reduce((acc, item) => acc + item.price * item.count, 0)
        },
        minusItem: (state, action) => {
            const findItem = state.items.find(item => item.id === action.payload)
            if(findItem) {
                findItem.count--
            };
        },
        removeItem: (state, action) => {
           state.items = state.items.filter(item => item.id!== action.payload)
        },
        clearItems: (state, action) => {
            state.items = [];
            state.totalPrice = 0
        }
        

    }
})


export const { addItem, removeItem, minusItem, clearItems } = cartSlice.actions;
export default cartSlice.reducer