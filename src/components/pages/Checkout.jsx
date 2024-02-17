import {useState, useEffect} from 'react'
import '../../scss/dist/styles.css'
import useScrollToTop from '../utilities/useScrollToTop';
import CheckoutSummary from '../utilities/CheckoutSummary';
import CheckoutItems from '../utilities/CheckoutItems';


function Checkout({cartItems, setCartItems}) {

    const {scrollToTop} = useScrollToTop()
    scrollToTop()

    const [basketTotalPrice, setBasketTotalPrice] = useState(0)
    // const [cartItems, setCartItems] = useState()

    useEffect(() => {
        /* 
            NOTES:
            Filtering items that have a quantity higher than 1 
            in order to not return NaN when displaying total basket price & quantity in basket
        */
       let filteredItemsAboveZero = cartItems.filter(item => item.qty > 0);
        setBasketTotalPrice(filteredItemsAboveZero.reduce((prev, current) => prev + current.price * current.qty, 0))

    }, [cartItems])

    return ( 
        <div id="checkout-page" className="h-full px-8">
            <h1 id="checkout-page-title" className="py-10 text-2xl text-center">Checkout</h1>

            <div className="checkout-page__container">
                <CheckoutItems cartItems={cartItems} setCartItems={setCartItems} />
                <CheckoutSummary basketTotalPrice={basketTotalPrice} />
            </div>
        </div>
     );
}

export default Checkout;