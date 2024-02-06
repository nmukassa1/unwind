import {useEffect, useState} from 'react'
import emptyCart from '../../empty-cart.png'

function Cart({position, cartItems, setCartItems}) {

    const [basketTotalPrice, setBasketTotalPrice] = useState(0)
    const [totalItemsInBasket, setTotalItemsInBasket] = useState(0)

    useEffect(() => {
        /* 
            NOTES:
            Filtering items that have a quantity higher than 1 
            in order to not return NaN when displaying total basket price & quantity in basket
        */
       let filteredItemsAboveZero = cartItems.filter(item => item.qty > 0);
        setBasketTotalPrice(filteredItemsAboveZero.reduce((prev, current) => prev + current.price * current.qty, 0))
        setTotalItemsInBasket(filteredItemsAboveZero.reduce((prev, current) => prev + current.qty, 0))

    }, [cartItems])

    const handleUpdateQuantity = (e) => {
        const itemToUpdate = cartItems.find(item => item.key === parseInt(e.target.parentElement.parentElement.id))
        
        setCartItems(
            cartItems.map((item) =>
              item.key === itemToUpdate.key
                ? { ...itemToUpdate, qty: parseInt(e.target.value) }
                : item
            )
        );

    }

    const  handleRemoveItemFromBasket = (e) => {
        const itemToRemove = parseInt(e.target.parentElement.parentElement.id);
        const newBasket = cartItems.filter((item) => item.key != itemToRemove);
        setCartItems([...newBasket]);
        console.log(cartItems);
      }


    return ( 
        <div className={`bg-white fixed top-[50px] ${position} h-[370px] w-screen md:w-[370px] transition-all duration-700 z-50 shadow-lg p-3 overflow-hidden`}>
            {cartItems.length === 0 && <div className='w-full h-full'><img src={emptyCart} alt="empty cart" className='object-cover w-full h-full'/></div>}

            {cartItems.length > 0 && (
                <form action="" className='h-full' onSubmit={(e) => e.preventDefault()}>
                        <div id="cart-items" className='h-[68%] overflow-scroll'>
                            { cartItems.map((item, index) => (
                                <div key={item.key} id={item.key} className="flex w-full justify-around items-center mb-2">
                                    <img src={item.img} alt="" className='w-[90px] h-auto'/>
                                    <div className="item__info w-1/2">
                                        <span className='block'>{item.title}</span>
                                        <span className='block'>£{item.price}</span>
                                        <span className='block'>{item.author.join(' & ')}</span>
                                    </div>
                                    <div className='cart-items-qty-box flex flex-col items-center'>
                                        <input 
                                            type="number" 
                                            className='border border-black w-[40px] h-[40px] text-center text-2xl font-thin' 
                                            value={item.qty}
                                            onChange={(e) => handleUpdateQuantity(e)}
                                        />
                                        <button 
                                            className='remove-item text-xs mt-1.5 tracking-wider' 
                                            onClick={(e) => handleRemoveItemFromBasket(e)}>remove</button>
                                    </div>
                                </div>
                            )) }
                        </div>

                        <hr className='my-3 border-black' />

                        <div id="summary" className='flex items-center justify-between'>
                            <span id="basket__qty">{totalItemsInBasket} {totalItemsInBasket > 1 ? <>Items</> : <>Item</>}</span>
                            <span id="total">£{basketTotalPrice.toFixed(2)}</span>
                        </div>

                        <button className='bg-black text-white w-full py-3 mt-[10px]' type='submit'>Checkout</button>
                </form>
            )}
        </div>
    );
}

export default Cart;