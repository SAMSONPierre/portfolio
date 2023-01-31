import { CONNECT_USER, DECONNECT_USER } from "../Constants/actions";

let stateInit;
const reducer = (state = stateInit, action = {}) => {
  console.log(action);
  //gestion des actions du Reducer
  switch (action.type) {
    case CONNECT_USER:
      return {
        ...state,
        idUser: action.id,
      };
    case DECONNECT_USER:
      return {
        ...state,
        idUser: null,
      };
    default:
      return state;
  }
};

export default reducer;
