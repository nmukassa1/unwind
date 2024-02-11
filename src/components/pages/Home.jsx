import Hero from '../utilities/Hero';
import RenderCards from '../utilities/RenderCards';
import useBookDatabase  from '../../useBookDatabase';
import useScrollToTop from '../utilities/useScrollToTop';

function Home() {
    const {scrollToTop} = useScrollToTop()
    scrollToTop()
    const {books} = useBookDatabase();

    return ( 
        <>
            {books && (
                <>
                    <Hero />
                    <RenderCards data={books.fiction.genre.fantasy} title={'Fantasy'} page={"fantasy"} type={'fiction'} id={'fantasy-section'} />
                    <RenderCards data={books.fiction.genre.romance} title={'Romance'} page={"romance"} type={'fiction'} id={'romance-section'} />
                    <RenderCards data={books.non_fiction.genre.biography} title={'Biography'} page={"biography"} type={'non_fiction'} id={'biography-section'} />
                </>
            )}
            {!books && (<>No file</>)}
        </>
    );
}

export default Home;