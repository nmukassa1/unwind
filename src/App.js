import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { useState } from 'react';

import Book from './components/pages/Book';
import Home from './components/pages/Home';
import ViewAll from './components/pages/ViewAll';
import Header from './components/utilities/Header';
import Cart from './components/utilities/Cart';
import Checkout from './components/pages/Checkout';




function App() {


  const [cartItems, setCartItems] = useState([])
  const [confirmAddToCart, setConfirmAddToCart] = useState('hidden')
  const [cartPosition, setCartPosition] = useState('right-[-100%]')



  const addToCart = (product) => {
    const book = JSON.parse(localStorage.getItem('data'));
    const bookKey = book.key
    //Does item already exist in cart??
    const exist = cartItems.find(item => item.key === bookKey)
    if(!exist){
      // Add to cart if doesn't exist
      setCartItems([...cartItems, {...book, qty: 1}])
      confirm()
    }else {
      //Update quantity if already in cart
      setCartItems(
        cartItems.map(item =>
          item.key === bookKey ? {...exist, qty: exist.qty + 1 } : item
        )
      )
      confirm()
    }
  }

  function confirm(){
    setConfirmAddToCart('inline-block')
    setTimeout(() =>{
        setConfirmAddToCart('hidden')
    }, 1000)
  }

  const toggleCart = () => {
    cartPosition === 'right-[-100%]' ? setCartPosition('right-0') : setCartPosition('right-[-100%]');
  }

  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <div className="App">
        <Header cartItems={cartItems} toggleCart={toggleCart}/>
        <Cart position={cartPosition} cartItems={cartItems} setCartItems={setCartItems}/>
        <main className='mt-[50px]'>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/view-all/:type/:id" element={<ViewAll />} />
            <Route path="/book/:book" element={<Book onAdd={addToCart} confirm={confirmAddToCart} />} />
            <Route path='/checkout' element={<Checkout cartItems={cartItems} setCartItems={setCartItems}/>}/>
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
