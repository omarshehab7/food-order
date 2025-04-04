import { useContext } from "react";
import Modal from "./UI/Modal";
import CartContext from "../store/CartContext";
import { currencyFormatter } from "../util/formatting";
import Input from "./UI/Input";
import Button from "./UI/Button";
import UserProgressContext from "../store/UserProgressContext";

export default function Checkout(){
    const cartCtx = useContext(CartContext)
    const userCtx=useContext(UserProgressContext)
    const total = cartCtx.items.reduce((totalPrice,item) => totalPrice + item.quantity * item.price ,0)
    function handleClose(){
        userCtx.hideCheckout()
    }
    
    return (
            <Modal open={userCtx.progress === 'checkout'} onClose={handleClose}>
                <form>
                    <h2>Checkout</h2>
                    <p>Total Amount: {currencyFormatter.format(total)} </p>
                    <Input label="Full Name" type="text" id="full-name"/>
                    <Input label="E-Mail Address" type="email" id="email"/>
                    <Input label="Street" type="text" id="street"/>
                    <div className="control-row">
                    <Input label="Postal Code" type="text" id="postal-code"/>
                    <Input label="City" type="text" id="city"/>
                    </div>
                    <p className="modal-action">
                        <Button type="button" textOnly onClick={handleClose}>Close</Button>
                        <Button >Submit Order</Button>

                    </p>
                </form>
            </Modal>

    )
}