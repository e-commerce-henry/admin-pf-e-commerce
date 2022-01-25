import {} from "./actions";

const inicialState = {
	products: [],
	categorys: [],
	saleBanner: [],
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
					return a.id - b.id;
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
		default:
			return state;
	}
};
export default reducer;
