import {ADD_TEA, DELETE_TEA, DELETE_ALL, CONNECT_USER, DECONNECT_USER} from '../Constants/actions';

//définition de la source de vérité
let stateInit;
if(sessionStorage.getItem('basket')){
    stateInit=JSON.parse(sessionStorage.getItem('basket'));
}
else{
    stateInit={
        montant : 0,
        teas : [],
        idUser : null
    }
}

const reducer = (state = stateInit, action = {}) => {
console.log(action);
    //gestion des actions du Reducer
    switch(action.type){
        case ADD_TEA:

            //on doit retourner un nouveau state
            return{
                ...state,
                montant : state.montant + action.tea.price,
                teas : [...state.teas, action.tea]
            }
            
        case DELETE_TEA:

            let montant = 0;
            let teas = [...state.teas];
            teas.splice(action.teaId, 1);

            for(const tea of teas){
                montant += tea.price;
            }

            return{
                ...state,
                montant : montant,
                teas : [...teas]
            }
        case DELETE_ALL:
            return{
                ...state,
                montant:0,
                teas:[]
            }

        case CONNECT_USER:
            return{
                ...state,
                idUser : action.id
            }
        case DECONNECT_USER:
            return{
                ...state,
                idUser : null
            }
        default:
            return state;
    }
}

export default reducer;