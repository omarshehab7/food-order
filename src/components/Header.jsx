import logoImg from '../../public/logo.jpg'

export default function Header (){

    return (
        <header id="main-header">
            <div id="title">
                <img src={logoImg} alt="logo" />
                <h1>MealMate </h1>
            </div>
            <nav>
                <button>
                    Cart (0)
                </button>
            </nav>
        </header>
    )
}