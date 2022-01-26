import {} from "./actions";

const inicialState = {
	products: [],
	categorys: [],
	saleBanner: [],
	updateproducts: [],
};

const reducer = (state = inicialState, action) => {
	switch (action.type) {
		case "GET_CATEGORYS":
			return {
				...state,
				categorys: action.payload,
			};
		case "GET_PRODUCTS":
			return {
				...state,
				products: action.payload.sort((a, b) => {
					return b.id - a.id;
				}),
			};
		case "GET_SALEBANNER":
			return {
				...state,
				saleBanner: action.payload,
			};
		case "POST_SALEBANNER":
			return {
				...state,
				saleBanner: [...state.saleBanner, action.payload],
			};
		case "DELETE_SALEBANNER":
			console.log(action.payload);
			return {
				...state,
				saleBanner: state.saleBanner.filter((e) => e.id != action.payload),
			};
		case "UPDATE_PRODUCT":
			return {
				...state,
				updateproducts: action.payload,
			};
		default:
			return state;
	}
};
export default reducer;
