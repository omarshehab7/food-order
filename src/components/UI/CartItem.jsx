import { useContext } from "react"
import { currencyFormatter } from "../../util/formatting"
import CartContext from "../../store/CartContext"

export default function CartItem({item}){
    const cartCtx = useContext(CartContext)
    return (
        <li className="cart-item">
            <p>{item.name} -  {item.quantity} X {currencyFormatter.format(item.price)} </p>
            <p className="cart-item-actions">
                <button onClick={() => cartCtx.removeItem(item.id)}>
                    -
                </button>
                <button>
                    {item.quantity}
                </button>
                <button onClick={() => cartCtx.addItem(item)}>
                    +
                </button>
            </p>
        </li> )
}