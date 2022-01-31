const axios = require("axios");

axios.defaults.withCredentials = true;

export function getProducts() {
	return async function (dispatch) {
		const products = await axios("http://proyecto-personal.online/products");
		return dispatch({ type: "GET_PRODUCTS", payload: products.data });
	};
}

export function createProduct(newProduct) {
	return async function () {
		return await axios.post(
			"http://proyecto-personal.online/products",
			newProduct
		);
	};
}

export function getCategorys() {
	return async function (dispatch) {
		const categorys = await axios("http://proyecto-personal.online/category");
		return dispatch({ type: "GET_CATEGORYS", payload: categorys.data });
	};
}

export function editProduct(id, value) {
	return (dispatch) => {
		axios
			.put(`http://proyecto-personal.online/products/${id}`, value)
			.then((result) => {
				return dispatch({
					type: "UPDATE_PRODUCT",
					payload: result.data,
				});
			})
			.catch((err) => {
				console.error(err);
			});
	};
}

export function createCategory(newCategory) {
	return async function () {
		return await axios.post(
			"http://proyecto-personal.online/category",
			newCategory
		);
	};
}

export function getSaleBanner() {
	return async function (dispatch) {
		const saleBanner = await axios.get(
			"http://proyecto-personal.online/saleBanner"
		);
		return dispatch({ type: "GET_SALEBANNER", payload: saleBanner.data });
	};
}

export function postSaleBanner(saleItem) {
	return async function (dispatch) {
		const newSaleItem = await axios.post(
			"http://proyecto-personal.online/saleBanner",
			saleItem
		);
		return dispatch({ type: "POST_SALEBANNER", payload: newSaleItem.data });
	};
}

export function deleteSaleBanner(saleItemId) {
	return async function (dispatch) {
		await axios.delete(
			`http://proyecto-personal.online/saleBanner/${saleItemId}`
		);
		return dispatch({ type: "DELETE_SALEBANNER", payload: saleItemId });
	};
}

export function getUsers() {
	return async function (dispatch) {
		const users = (await axios.get("http://proyecto-personal.online/users"))
			.data;
		return dispatch({ type: "GET_ALLUSERS", payload: users });
	};
}

export function editUser(userToEdit) {
	return async function (dispatch) {
		const edited = (
			await axios.put(
				`http://proyecto-personal.online/users/${userToEdit.id}`,
				userToEdit
			)
		).data;
		return dispatch({ type: "EDIT_USER", payload: userToEdit });
	};
}

export function addUser(newUser) {
	return async function (dispatch) {
		try {
			const addedUser = (
				await axios.post("http://proyecto-personal.online/users", newUser)
			).data;
			return dispatch({ type: "ADD_USER", payload: addedUser });
		} catch (err) {
			return err;
		}
	};
}

export function deleteUser(id) {
	return async function (dispatch) {
		try {
			const user = await axios.delete(
				`http://proyecto-personal.online/users/${id}`
			);
			return dispatch({ type: "DELETE_USER", payload: id });
		} catch (err) {
			return err;
		}
	};
}

export function authUser({ email, pwd }) {
	return async function (dispatch) {
		let respuesta = await axios.post(
			"https://proyecto-personal.online/auth/signIn",
			{
				email,
				pwd,
			}
		);

		return dispatch({ type: "AUTH_USER", payload: respuesta });
	};
}

export function getAllOrders() {
	return async function (dispatch) {
		const orders = (await axios.get("https://proyecto-personal.online/orders"))
			.data;
		return dispatch({ type: "GET_ALL_ORDERS", payload: orders });
	};
}
export function getOrderByOrderId(orderId) {
	return { type: "GET_ORDER_BY_ORDERID", payload: orderId };
}

export function logOut() {
	return async function (dispatch) {
		let response = (
			await axios.get("https://proyecto-personal.online/auth/logOut")
		).data;
		return dispatch({ type: "LOG_OUT", payload: response });
	};
}
