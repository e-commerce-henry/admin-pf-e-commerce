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
	contactForms: [],
	formById: [],
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
		case "DELETE_CATEGORY":
			console.log(action.payload);
			return {
				...state,
				categorys: state.categorys.filter((e) => e.id != action.payload.id),
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
			const { finalNewUser } = action.payload;
			return {
				...state,
				users: [...state.users, finalNewUser],
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
				orders: action.payload.sort((a, b) => {
					return b.id - a.id;
				}),
			};
		case "GET_ORDER_BY_ORDERID":
			console.log(action.payload);
			return {
				...state,
				orderById: action.payload,
			};
		case "EDIT_ORDER":
			console.log(action.payload);
			const newOrders = state.orders.filter((e) => {
				return e.id != action.payload.modifiedOrder.id;
			});
			return {
				...state,
				orders: [...newOrders, action.payload.modifiedOrder].sort((a, b) => {
					return b.id - a.id;
				}),
			};
		case "GET_CONTACT_FORMS":
			return {
				...state,
				contactForms: action.payload.sort((a, b) => {
					return b.id - a.id;
				}),
			};
		case "GET_FORM_BYID":
			return {
				...state,
				formById: state.contactForms.find((e) => e.id == action.payload),
			};
		case "DELETE_CONTACT_FORM":
			return {
				...state,
				contactForms: state.contactForms
					.filter((e) => e.id != action.payload)
					.sort((a, b) => {
						return b.id - a.id;
					}),
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
