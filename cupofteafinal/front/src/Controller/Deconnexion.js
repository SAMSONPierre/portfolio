import { useEffect } from 'react';
import { useDispatch} from 'react-redux';
import { useNavigate } from "react-router-dom";



const Deconnexion = ()  => {

    
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch({
            type: 'DECONNECT_USER'
        })
    
        navigate('/');

    }, [])

  

    return(
        <>
           
        </>
    )
}

export default Deconnexion;