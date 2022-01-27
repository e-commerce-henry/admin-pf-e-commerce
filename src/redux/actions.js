const axios = require("axios");

export function getProducts() {
	return async function (dispatch) {
		const products = await axios("http://localhost:3001/products");
		return dispatch({ type: "GET_PRODUCTS", payload: products.data });
	};
}

export function createProduct(newProduct) {
	return async function () {
		return await axios.post("http://localhost:3001/products", newProduct);
	};
}

export function getCategorys() {
	return async function (dispatch) {
		const categorys = await axios("http://localhost:3001/category");
		return dispatch({ type: "GET_CATEGORYS", payload: categorys.data });
	};
}

export function editProduct(id, value) {
	return (dispatch) => {
		axios
			.put(`http://localhost:3001/products/${id}`, value)
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
		return await axios.post("http://localhost:3001/category", newCategory);
	};
}

export function getSaleBanner() {
	return async function (dispatch) {
		const saleBanner = await axios.get("http://localhost:3001/saleBanner");
		return dispatch({ type: "GET_SALEBANNER", payload: saleBanner.data });
	};
}

export function postSaleBanner(saleItem) {
	return async function (dispatch) {
		const newSaleItem = await axios.post(
			"http://localhost:3001/saleBanner",
			saleItem
		);
		return dispatch({ type: "POST_SALEBANNER", payload: newSaleItem.data });
	};
}

export function deleteSaleBanner(saleItemId) {
	return async function (dispatch) {
		await axios.delete(`http://localhost:3001/saleBanner/${saleItemId}`);
		return dispatch({ type: "DELETE_SALEBANNER", payload: saleItemId });
	};
}

export function getUsers() {
	return async function (dispatch) {
		const users = (await axios.get("http://localhost:3001/users")).data;
		console.log(users);
		return dispatch({ type: "GET_ALLUSERS", payload: users });
	};
}

export function getUserById(id) {
	return async function (dispatch) {
		try {
			const foundUser = (await axios.get(`http://localhost:3001/users/${id}`))
				.data;
			console.log(foundUser);
			return dispatch({ type: "GET_USERBYID", payload: foundUser });
		} catch (error) {
			return error;
		}
	};
}

export function addUser(newUser) {
	return async function (dispatch) {
		try {
			const addedUser = (
				await axios.post("http://localhost:3001/users", newUser)
			).data;
			console.log(addedUser);
			return dispatch({ type: "ADD_USER", payload: addedUser });
		} catch (err) {
			return err;
		}
	};
}

export function authUser({ email, pwd }) {
	return async function (dispatch) {
		let respuesta = await axios.post(
			"http://localhost:3001/auth/signIn",
			{ email, pwd },
			{ withCredentials: true }
		);
		console.log("llegue aqui");
		return dispatch({ type: "AUTH_USER", payload: respuesta });
	};
}
