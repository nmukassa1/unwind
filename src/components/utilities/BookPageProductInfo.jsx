import { useState } from "react" 

function BookPageProductInfo({data, onAdd, confirm}) {

    const [synopsisHidden, setSynopsisHidden] = useState('h-[90px]')

    const synopsisToggle = () => {
        if(synopsisHidden === 'h-[90px]'){
            setSynopsisHidden('')
        } else{
            setSynopsisHidden('h-[90px]')
        }
    }

    return ( 
        <div className='px-8 pt-14 pb-3 md:overflow-scroll border border-solid border-black'>
            <div id="title">
                <h1 className='text-2xl font-bold'>{data.title}</h1>
            </div>
            <div id="author">
                <h3>by {data.author.join(' & ')}</h3>
            </div>
            <div id="price" className='my-4'>
                <span className='text-2xl'>£{data.price}</span>
            </div>


            {/* ADD TO CART BUTTON */}
            {data.quantity > 0 ? (
                <>
                    <button className="bg-black text-white px-3 py-2 hover:bg-white hover:text-black hover:border-black hover:border" onClick={onAdd}>Add To Cart</button> 
                    <span className={`${confirm} ml-3`}>✅</span>
                </>
            ) : (
                <button disabled className="bg-black text-white px-3 py-2">Out Of Stock</button>
            )
            }

            <div id="synopsis" className='my-4'>
                <h1>Synopsis</h1>
                <div id="synopsis-block" className={`${synopsisHidden} overflow-hidden py-3 relative`}>
                    {
                        data.synopsis.map((item, index) => <p key={index}>{item}</p>)
                    }
                </div>
                <button onClick={synopsisToggle} className="ml-auto text-xl border border-solid border-black rounded-full w-[30px] mt-2">+</button>
            </div>

            

            <ul id="details">
                <li>Number of pages: {data.number_of_pages}</li>
                <li>Publisher: {data.publisher}</li>
                <li>Dimensions: {data.dimension}</li>
                <li>ISBN: {data.key}</li>
            </ul>
        </div>
     );
}

export default BookPageProductInfo;