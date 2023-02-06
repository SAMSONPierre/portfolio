import { CONNECT_USER, DECONNECT_USER } from "../Constants/action.js";

let stateInit;
if (sessionStorage.getItem("session")) {
  stateInit = JSON.parse(sessionStorage.getItem("session"));
} else {
  stateInit = {
    idUser: null,
  };
}
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
