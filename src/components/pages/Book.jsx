import {useEffect} from 'react'
import useScrollToTop from '../utilities/useScrollToTop';
import BookPageProductImage from '../utilities/BookPageProductImage';
import BookPageProductInfo from '../utilities/BookPageProductInfo';

function Book({onAdd, confirm}) {

    const {scrollToTop} = useScrollToTop()
    scrollToTop()
    
    
    const data = JSON.parse(localStorage.getItem('data'))
   
    return ( 
        <section id='product-section' className='relative grid md:grid-cols-2'>
            <BookPageProductImage img={data.img} />

            <BookPageProductInfo data={data} onAdd={onAdd} confirm={confirm} />
        </section>
    );
}

export default Book;