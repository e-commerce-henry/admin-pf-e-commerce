const axios = require("axios");

axios.defaults.withCredentials = true;

export function getProducts() {
	return async function (dispatch) {
		const products = await axios("http://localhost:3001/products");
		return dispatch({ type: "GET_PRODUCTS", payload: products.data });
	};
}

export function createProduct(newProduct, { token }) {
	return async function (dispatch) {
		const response = await axios.post(
			"http://localhost:3001/products",
			newProduct,
			{
				headers: { authorization: token },
			}
		);
		return dispatch({ type: "CREATE_PRODUCT", payload: response.data });
	};
}

export function getCategorys() {
	return async function (dispatch) {
		const categorys = await axios("http://localhost:3001/category");
		return dispatch({ type: "GET_CATEGORYS", payload: categorys.data });
	};
}

export function editProduct(id, value, { token }) {
	return (dispatch) => {
		axios
			.put(`http://localhost:3001/products/${id}`, value, {
				headers: { authorization: token },
			})
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

export function createCategory(newCategory, { token }) {
	return async function (dispatch) {
		const response = await axios.post(
			"http://localhost:3001/category",
			newCategory,
			{
				headers: {
					authorization: token,
				},
			}
		);
		return dispatch({ type: "POST_CATEGORY", payload: response.data });
	};
}

export function deleteCategory(categoryId, { token }) {
	return async function (dispatch) {
		const response = await axios.delete(
			`http://localhost:3001/category/${categoryId}`,
			{
				headers: {
					authorization: token,
				},
			}
		);
		return dispatch({ type: "DELETE_CATEGORY", payload: response.data });
	};
}

export function getSaleBanner() {
	return async function (dispatch) {
		const saleBanner = await axios.get("http://localhost:3001/saleBanner");
		return dispatch({ type: "GET_SALEBANNER", payload: saleBanner.data });
	};
}

export function postSaleBanner(saleItem, { token }) {
	return async function (dispatch) {
		const newSaleItem = await axios.post(
			"http://localhost:3001/saleBanner",
			saleItem,
			{
				headers: {
					authorization: token,
				},
			}
		);
		return dispatch({ type: "POST_SALEBANNER", payload: newSaleItem.data });
	};
}

export function deleteSaleBanner(saleItemId, { token }) {
	return async function (dispatch) {
		await axios.delete(`http://localhost:3001/saleBanner/${saleItemId}`, {
			headers: {
				authorization: token,
			},
		});
		return dispatch({ type: "DELETE_SALEBANNER", payload: saleItemId });
	};
}

export function getUsers({ token }) {
	console.log(token);
	return async function (dispatch) {
		try {
			const users = (
				await axios.get("http://localhost:3001/users", {
					headers: { authorization: token },
				})
			).data;
			return dispatch({ type: "GET_ALLUSERS", payload: users });
		} catch (err) {
			return err;
		}
	};
}

export function editUser(userToEdit, { token }) {
	return async function (dispatch) {
		const edited = (
			await axios.put(
				`http://localhost:3001/users/${userToEdit.id}`,
				userToEdit,
				{
					headers: { authorization: token },
				}
			)
		).data;
		return dispatch({ type: "EDIT_USER", payload: userToEdit });
	};
}

export function addUser(newUser, { token }) {
	return async function (dispatch) {
		try {
			const addedUser = (
				await axios.post("http://localhost:3001/users", newUser, {
					headers: { authorization: token },
				})
			).data;
			return dispatch({ type: "ADD_USER", payload: addedUser });
		} catch (err) {
			return err;
		}
	};
}

export function deleteUser(id, { token }) {
	return async function (dispatch) {
		try {
			const user = await axios.delete(`http://localhost:3001/users/${id}`, {
				headers: { authorization: token },
			});
			return dispatch({ type: "DELETE_USER", payload: id });
		} catch (err) {
			return err;
		}
	};
}

export function authUser({ email, pwd }) {
	return async function (dispatch) {
		let respuesta = (
			await axios.post("http://localhost:3001/auth/signInAdmin", {
				email,
				pwd,
			})
		).data;
		sessionStorage.setItem("userAuth", respuesta.token);
		return dispatch({ type: "AUTH_USER", payload: respuesta.token });
	};
}

export function getAllOrders({ token }) {
	return async function (dispatch) {
		const orders = (
			await axios.get("http://localhost:3001/orders", {
				headers: { authorization: token },
			})
		).data;
		return dispatch({ type: "GET_ALL_ORDERS", payload: orders });
	};
}
export function getOrderByOrderId(orderId, { token }) {
	return async function (dispatch) {
		const orderDetails = (
			await axios.get(`http://localhost:3001/orders/order/${orderId}`, {
				headers: { authorization: token },
			})
		).data;
		return dispatch({ type: "GET_ORDER_BY_ORDERID", payload: orderDetails });
	};
}

export function editOrder(orderToEdit, { token }) {
	return async function (dispatch) {
		const modifiedOrder = (
			await axios.put(
				`http://localhost:3001/orders/${orderToEdit.id}`,
				orderToEdit,
				{
					headers: { authorization: token },
				}
			)
		).data;
		return dispatch({ type: "EDIT_ORDER", payload: modifiedOrder });
	};
}

export function getContactForms({ token }) {
	return async function (dispatch) {
		const contactForms = (
			await axios.get(`http://localhost:3001/contactForm`, {
				headers: { authorization: token },
			})
		).data;
		return dispatch({ type: "GET_CONTACT_FORMS", payload: contactForms });
	};
}

export function sendAnswerEmail({ answer, email, id, name, token }) {
	console.log(id);
	return async function (dispatch) {
		const answeredMsg = (
			await axios.post(
				`http://localhost:3001/email/answer/${id}`,
				{ answer, email, name },
				{
					headers: { authorization: token },
				}
			)
		).data;
		console.log(answeredMsg);
		return dispatch({ type: "SEND_ANSWER_EMAIL", payload: answeredMsg });
	};
}

export function getFormById(formId) {
	return async function (dispatch) {
		dispatch({
			type: "GET_FORM_BYID",
			payload: formId,
		});
	};
}

export function deleteContactForm(formId, { token }) {
	return async function (dispatch) {
		const deletedForm = (
			await axios.delete(`http://localhost:3001/contactForm/${formId}`, {
				headers: { authorization: token },
			})
		).data;
		return dispatch({ type: "DELETE_CONTACT_FORM", payload: formId });
	};
}

export function logOut() {
	return async function (dispatch) {
		let response = (await axios.get("http://localhost:3001/auth/logOut")).data;
		return dispatch({ type: "LOG_OUT", payload: response });
	};
}
