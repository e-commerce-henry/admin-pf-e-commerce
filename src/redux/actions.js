const axios = require('axios')

export function getProducts(){
    return async function(dispatch){
        const products = await axios('http://proyecto-personal.online/products')
        return(
            dispatch({type: "GET_PRODUCTS", payload: products.data})
        )
    }
};

export function createProduct(newProduct){
    return async function(){
        return await axios.post('http://proyecto-personal.online/products', newProduct)
    }
};

export function getCategorys(){
    return async function (dispatch){
        const categorys = await axios('http://proyecto-personal.online/category')
        return(
            dispatch({type: "GET_CATEGORYS", payload: categorys.data})
        )
    }
};

export function createCategory(newCategory){
    return async function(){
        return await axios.post('http://proyecto-personal.online/category', newCategory)
    }
};

