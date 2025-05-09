import { useContext, useEffect } from "react";
import Modal from "./UI/Modal";
import CartContext from "../store/CartContext";
import { currencyFormatter } from "../util/formatting";
import Input from "./UI/Input";
import Button from "./UI/Button";
import UserProgressContext from "../store/UserProgressContext";
import useHttp from "../hooks/useHttp";

const reqConfig = {
    method:'POST',
    headers: {
        'Content-Type' : 'application/json',
    }
}

export default function Checkout(){
    const cartCtx = useContext(CartContext)
    const userCtx=useContext(UserProgressContext)
    const {data,isLoading: isSending, error , sendRequest, clearData}= useHttp('http://localhost:3000/orders', reqConfig)
    
    const total = cartCtx.items.reduce((totalPrice,item) => totalPrice + item.quantity * item.price ,0)
    function handleClose(){
        userCtx.hideCheckout()
    }

    function handleFinish(){
        userCtx.hideCheckout()
        cartCtx.clearCart()
        clearData()
    }

    function handleSubmit(event){
        event.preventDefault()
        const fd = new FormData(event.target) 
        const customerData = Object.fromEntries(fd.entries()) 
        
        sendRequest(
            JSON.stringify({
                order: {
                    items: cartCtx.items,
                    customer: customerData
                }
            })
        )
    }

    let actions = (
    <>
        <Button type="button" textOnly onClick={handleClose}>Close</Button>
        <Button >Submit Order</Button>
        </>
        )

    if (isSending){
        actions= <span>Sending order data ...</span>
    }

    if (data && !error){
        return <Modal open={UserProgressContext.progress === 'checkout'} onClose={handleFinish}>
                <h2>Success!</h2>
                <p>Your order was submitted successfully.</p>
                <p className="modal-actions">
                    <Button onClick={handleFinish}>Okay</Button>
                </p>
        </Modal>
    }
    
    return (
            <Modal open={userCtx.progress === 'checkout'} onClose={handleClose}>
                <form onSubmit={handleSubmit}>
                    <h2>Checkout</h2>
                    <p>Total Amount: {currencyFormatter.format(total)} </p>
                    <Input label="Full Name" type="text" id="name"/>
                    <Input label="E-Mail Address" type="email" id="email"/>
                    <Input label="Street" type="text" id="street"/>
                    <div className="control-row">
                    <Input label="Postal Code" type="text" id="postal-code"/>
                    <Input label="City" type="text" id="city"/>
                    </div>
                    {error && <Error title="Failed to submit order" message={message}/>}
                    <p className="modal-action">
                        {actions}
                    </p>
                </form>
            </Modal>

    )
}