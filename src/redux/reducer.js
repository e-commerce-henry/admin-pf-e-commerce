import {} from './actions';

const inicialState = {
    products: [],
    categorys: [],
    // updateproducts:[]
};

const reducer = (state = inicialState, action) => {
    switch (action.type) {
        case "GET_CATEGORYS":
            return {
                ...state,
                categorys: action.payload
            }
        case "GET_PRODUCTS":
            return{
                ...state,
                products: action.payload
            }
        // case "UPDATE_PRODUCT":
        //     return{
        //         ...state,
        //         updateproducts: action.payload
        //     }
    
    default: return state 
}
}
export default reducer; 
