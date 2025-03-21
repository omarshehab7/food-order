import { createContext, useReducer } from "react";

const CartContext = createContext({
    items: [],
    addItem: (item)=>{},
    removeItem: (id)=>{}
})

export function CartContextProvider({children}){
    useReducer()
    return <CartContext.Provider>{children}</CartContext.Provider>
}

export default CartContext;