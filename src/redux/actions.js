const axios = require('axios')

export function getProducts(){
    return async function(dispatch){
        const products = await axios('http://localhost:3001/products')
        return(
            dispatch({type: "GET_PRODUCTS", payload: products.data})
        )
    }
};

export function createProduct(newProduct){
    return async function(){
        return await axios.post('http://localhost:3001/products', newProduct)
    }
};

export function editProduct(id,value){
    return dispatch => {
        axios.put(`http://localhost:3001/products/${id}`,value)
        .then((result) => {
            return dispatch({
                type:"UPDATE_PRODUCT",
                payload:result.data
            })
        }).catch((err) => {
            console.error(err)
        });
    }
}

export function getCategorys(){
    return async function (dispatch){
        const categorys = await axios('http://localhost:3001/category')
        return(
            dispatch({type: "GET_CATEGORYS", payload: categorys.data})
        )
    }
};

export function createCategory(newCategory){
    return async function(){
        return await axios.post('http://localhost:3001/category', newCategory)
    }
};

