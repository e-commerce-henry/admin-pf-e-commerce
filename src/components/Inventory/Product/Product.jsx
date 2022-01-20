import React from "react";

export default function Product({id, name, stock, price, img, brand, description, categoryId}){
    return(
        <div>
            <div>Id: {id}</div>
            <div>Name: {name}</div>
            <div>Stock: {stock}</div>
            <div>Price: $ {price}</div>
            <div>Url img: {img}</div>
            <div>Brand :{brand}</div>
            <div>Description: {description}</div>
            <div>Category ID: {categoryId}</div>
            <button>Edit</button>
            <button>Delete</button>
        </div>
    )
}