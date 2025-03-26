import { useContext } from "react"
import CartContext from "../store/CartContext"
import { currencyFormatter } from "../util/formatting"
import Button from "./UI/Button"

export default function MealItem ({meal}){
    const cartctx=useContext(CartContext)
    function handleMealAdd(){
        cartctx.addItem(meal)
    }
    
    return (
        <li className="meal-item" key={meal.id}>
            <article>
                <img src={`http://localhost:3000/${meal.image}`} alt={meal.name}/>
                <div>
                    <h3>
                        {meal.name}
                    </h3>
                    <p className="meal-item-price">
                        {currencyFormatter.format(meal.price)}
                    </p>
                    <p className="meal-item-description">
                        {meal.description}
                    </p>
                </div>
                <p className="meal-item-actions">
                    <Button onClick={handleMealAdd}>Add to Cart</Button>
                </p>
            </article>
            {meal.name}
            </li>
            
    )
}