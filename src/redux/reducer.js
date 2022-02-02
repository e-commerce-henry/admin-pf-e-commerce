import {} from "./actions";

const inicialState = {
	products: [],
	categorys: [],
	saleBanner: [],
	authUser: [],
	updateproducts: [],
	users: [],
	orders: [],
	orderById: [],
};

const reducer = (state = inicialState, action) => {
	switch (action.type) {
		case "GET_CATEGORYS":
			return {
				...state,
				categorys: action.payload,
			};
		case "POST_CATEGORY":
			console.log(action.payload);
			return {
				...state,
				categorys: [...state.categorys, action.payload.newCategory],
			};
		case "GET_PRODUCTS":
			return {
				...state,
				products: action.payload.sort((a, b) => {
					return b.id - a.id;
				}),
			};
		case "CREATE_PRODUCT":
			console.log(action.payload);
			const newProductArr = [
				...state.products,
				action.payload.newProductWithCategory,
			];
			return {
				...state,
				products: newProductArr.sort((a, b) => {
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

		case "AUTH_USER":
			return {
				...state,
				authUser: action.payload,
			};

		case "UPDATE_PRODUCT":
			console.log(action.payload);
			const updatedArray = state.products.filter((e) => {
				return e.id != action.payload.id;
			});
			return {
				...state,
				products: [...updatedArray, action.payload].sort((a, b) => {
					return b.id - a.id;
				}),
			};

		case "GET_ALLUSERS":
			return {
				...state,
				users: action.payload.sort((a, b) => {
					return a.id - b.id;
				}),
			};

		case "ADD_USER":
			const { newUser } = action.payload;
			return {
				...state,
				users: [...state.users, newUser],
			};

		case "EDIT_USER":
			const result = [
				...state.users.filter((e) => e.id != action.payload.id),
				action.payload,
			];
			return {
				...state,
				users: result.sort((a, b) => {
					return a.id - b.id;
				}),
			};
		case "DELETE_USER":
			return {
				...state,
				users: state.users.filter((e) => e.id != action.payload),
			};

		case "GET_ALL_ORDERS":
			return {
				...state,
				orders: action.payload,
			};
		case "GET_ORDER_BY_ORDERID":
			return {
				...state,
				orderById: state.orders.find((elem) => elem.id == action.payload),
			};

		case "LOG_OUT":
			return {
				...state,
				authUser: [],
			};
		default:
			return state;
	}
};
export default reducer;
