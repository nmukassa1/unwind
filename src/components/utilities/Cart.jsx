import {useEffect, useState} from 'react'

function Cart({position, cartItems}) {

    const [basketTotal, setBasketTotal] = useState(0)
    const [totalItems, setTotalItems] = useState(0)

    useEffect(() => {
        setBasketTotal(cartItems.reduce((prev, current) => prev + current.price * current.qty, 0))
        setTotalItems(cartItems.reduce((prev, current) => prev + current.qty, 0))
        // console.log(basketTotal)
    }, [cartItems])

    



    return ( 
        <div className={`bg-white fixed top-[50px] ${position} h-[370px] w-screen md:w-[370px] transition-all duration-700 z-50 shadow-lg p-3 overflow-hidden`}>
            {cartItems.length === 0 && <div>Cart is empty</div>}

            {cartItems.length > 0 && (
                <form action="" className='h-full'>
                        <div id="cart-items" className='h-[68%] overflow-scroll'>
                            { cartItems.map(item => (
                                <div key={item.key} className="flex w-full justify-around items-center mb-2">
                                    <img src={item.img} alt="" className='w-[90px] h-auto'/>
                                    <div className="item__info w-1/2">
                                        <span className='block'>{item.title}</span>
                                        <span className='block'>£{item.price}</span>
                                        <span className='block'>{item.author.join(' & ')}</span>
                                    </div>
                                    <input type="number" className='border border-black w-[40px] h-[40px] text-center text-2xl font-thin' value={item.qty}/>
                                </div>
                            )) }
                        </div>

                        <hr className='my-3 border-black' />

                        <div id="summary" className='flex items-center justify-between'>
                            <span id="basket__qty">{totalItems} {totalItems > 1 ? <>Items</> : <>Item</>}</span>
                            <span id="total">£{basketTotal}</span>
                        </div>

                        <button className='bg-black text-white w-full py-3 mt-[10px]'>Checkout</button>
                </form>
            )}
        </div>
    );
}

export default Cart;