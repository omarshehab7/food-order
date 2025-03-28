import { useContext } from "react"
import CartContext from "../store/CartContext"
import {currencyFormatter} from "../util/formatting"
import Button from "./UI/Button"
import UserProgressContext from "../store/UserProgressContext"
import CartItem from "./UI/CartItem"
import Modal from "./UI/Modal"

export default function Cart (){
    const cartCtx = useContext(CartContext)
    const userProgressCtx = useContext(UserProgressContext)
    const total = cartCtx.items.reduce((totalPrice,item) => totalPrice + item.quantity * item.price ,0)
    const quantity = cartCtx.items.length
    function handleCloseCart(){
        userProgressCtx.hideCart()
    }
    function handleCheckout(){
        userProgressCtx.showCheckout()
    }
    return ( <Modal className='cart' open={userProgressCtx.progress === 'cart'} onClose={userProgressCtx.progress === 'cart' ? handleCloseCart : null}>
        <h2>Your Cart</h2>
        <ul>
            {cartCtx.items.map((item)=> 
            (    
                <CartItem key={item.id} item={item} />
            )
        )}
        </ul>
        <p className="cart-total">{currencyFormatter.format(total)}</p>
        <p className="modal-actions">
            <Button textOnly onClick={handleCloseCart}>Close</Button>
            { quantity > 0 &&
            <Button onClick={handleCheckout}>Go to Checkout</Button>
             } </p>
    </Modal>)
}