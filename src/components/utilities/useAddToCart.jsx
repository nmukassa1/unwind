import {useState} from 'react'

function useAddToCart(){
    const [cart, setCart] = useState(0)
    
    return(cart, setCart)
}

export default useAddToCart