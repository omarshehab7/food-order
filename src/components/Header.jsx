import { useContext } from 'react'
import logoImg from '../../public/logo.jpg'
import Button from './UI/Button'
import CartContext from '../store/CartContext'

export default function Header (){
   const cartctx = useContext(CartContext)
   const totalCartItems = cartctx.items.reduce((totalNumberOfItems, item)=> {
    return totalNumberOfItems + item.quantity
   }, 0)
    return (
        <header id="main-header">
            <div id="title">
                <img src={logoImg} alt="logo" />
                <h1>MealMate </h1>
            </div>
            <nav>
                
                <Button textOnly>
                    {totalCartItems}
                </Button>
            </nav>
        </header>
    )
}