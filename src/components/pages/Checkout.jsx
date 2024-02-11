import {useState, useEffect} from 'react'
import '../../scss/dist/styles.css'
import RenderCartItems from "../utilities/RenderCartItems";
import useScrollToTop from '../utilities/useScrollToTop';


function Checkout({cartItems, setCartItems}) {

    const {scrollToTop} = useScrollToTop()
    scrollToTop()

    const [basketTotalPrice, setBasketTotalPrice] = useState(0)
    const [deliveryFee, setDeliveryFee] = useState(0)

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
                <div id="checkout-items">
                    <RenderCartItems cartItems={cartItems} setCartItems={setCartItems} />
                </div>

                <div id="checkout-summary" className='h-[300px] relative'>
                    <h2>Summary</h2>
                    
                    <div className='my-5'>
                        <p className="checkout-subtotal flex items-center justify-between">
                            Subtotal <span>£{basketTotalPrice.toFixed(2)}</span>
                        </p>
                        <p className='flex items-center justify-between my-3'>
                            Delivery <span>{ deliveryFee === 0 ? 'Free' : `£${ (deliveryFee).toFixed(2) }` }</span>
                        </p>
                        <p className='flex items-center justify-between mt-6 py-2 border-y-2 border-black'>
                            Total <span>£{ ( basketTotalPrice + deliveryFee).toFixed(2) }</span>
                        </p>
                    </div>

                    <div className="checkout-button absolute bottom-0 flex justify-center w-full">
                        <button className='bg-black text-white py-5 text-center rounded-xl w-[300px] max-w-full'>Checkout</button>
                    </div>
                </div>
            </div>
        </div>
     );
}

export default Checkout;