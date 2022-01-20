import {} from './actions';

const inicialState = {
    categorys: []
};

const reducer = (state = inicialState, action) => {
    switch (action.type) {
        case "GET_CATEGORYS":
            return {
                ...state,
                categorys: action.payload
            }
    
    default: return state 
}
}
export default reducer; 
