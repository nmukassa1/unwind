import {useParams} from 'react-router-dom'
import RenderCardsViewAll from '../utilities/RenderCardsViewAll'
import useFetchViewAll from '../utilities/useFetchViewAll'
import Loading from './Loading'
import useBookDatabase  from '../../useBookDatabase';

function ViewAll() {

    const {id, type} = useParams()
    
    const url = "http://localhost:3001/db"


    const {data} = useFetchViewAll(url)
    
    const {books} = useBookDatabase();

    return ( 
        <>
            {books && <RenderCardsViewAll data={books} title={id} id={id} type={type} genreName={id}/>}
            {!books && <Loading />}
        </>
    );
}

export default ViewAll;