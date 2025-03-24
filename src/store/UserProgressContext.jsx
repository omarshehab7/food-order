import { createContext, useState } from "react";

const UserProgressContext = createContext({
    progress: '', // 'cart' , 'checkout'
    showCart: ()=>{},
    hideCart: ()=>{},
    showCheckout: ()=>{},
    hideCheckout: ()=>{}
});

export function UserProgressContextProvider ({children}){
    const [userProgress,setUserProgress]= useState('')
    function showCart(){
        setUserProgress('cart')
    }
    function hideCart(){
        setUserProgress('')
    }
    function showCheckout(){
        setUserProgress('checkout')
    }
    function showCheckout(){
        setUserProgress('')
    }
    
    
    return(
        <UserProgressContext.Provider>{children}</UserProgressContext.Provider>
    )
}


export default UserProgressContext;