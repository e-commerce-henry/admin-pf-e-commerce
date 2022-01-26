const axios = require("axios");

export function getProducts() {
	return async function (dispatch) {
		const products = await axios("http://proyecto-personal.online/products");
		return dispatch({ type: "GET_PRODUCTS", payload: products.data });
	};
}

export function createProduct(newProduct) {
	return async function () {
		return await axios.post("http://proyecto-personal.online/products", newProduct);
	};
}

export function getCategorys() {
	return async function (dispatch) {
		const categorys = await axios("http://proyecto-personal.online/category");
		return dispatch({ type: "GET_CATEGORYS", payload: categorys.data });
	};
}

export function editProduct(id, value) {
	return dispatch => {
		axios.put(`http://proyecto-personal.online/products/${id}`, value)
			.then((result) => {
				return dispatch({
					type: "UPDATE_PRODUCT",
					payload: result.data
				})
			}).catch((err) => {
				console.error(err)
			});
	}
}



export function createCategory(newCategory) {
	return async function () {
		return await axios.post("http://proyecto-personal.online/category", newCategory);
	};
}

export function getSaleBanner() {
	return async function (dispatch) {
		const saleBanner = await axios.get("http://proyecto-personal.online/saleBanner");
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
		const removedItem = await axios.delete(
			`http://proyecto-personal.online/saleBanner/${saleItemId}`
		);
		return dispatch({ type: "DELETE_SALEBANNER", payload: saleItemId });
	};
}


export function authUser({email, pwd}) {
	return async function (dispatch) {
		let respuesta = await axios.post('http://proyecto-personal.online/auth/signIn', {email, pwd}, { withCredentials: true })
		console.log('llegue aqui')
		return (
			dispatch({ type: "AUTH_USER", payload: respuesta })
		)
	}
}

