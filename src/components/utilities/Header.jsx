import {Link} from 'react-router-dom'
import {useState, useEffect} from 'react'

function Header({cartItems, toggleCart}) {

    const [totalItems, setTotalItems] = useState(0)

    useEffect(() => {
        let filteredItemsAboveZero = cartItems.filter(item => item.qty > 0);
        setTotalItems(filteredItemsAboveZero.reduce((prev, current) => prev + current.qty, 0))
        // console.log(basketTotal)
    }, [cartItems])

    return ( 
        <header className='flex items-center justify-center px-8 fixed top-0 left-0 bg-white w-screen z-50'>
            <div id="brand" className='relative left-2/4 translate-x-[-50%]'>
                <Link to="/" className='font-semi-bold text-5xl'>UNWIND</Link>
            </div>
            <div id="cart" className='ml-auto'>
                <button onClick={toggleCart}>
                    CART
                    <span>({totalItems})</span>
                </button>
            </div>
        </header>
    );
}

export default Header;