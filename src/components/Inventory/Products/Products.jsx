import React from "react";
import { useEffect } from "react";
import Product from "../Product/Product";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../../redux/actions";
import Style from "./Products.module.css"

function valProduct(e){
    if(e.id){
        return(
            <Product 
            key = {e.id}
            id = {e.id}
            name = {e.name}
            stock = {e.stock}
            price= {e.price}
            img ={e.img}
            brand={e.brand}
            description={e.description}
            categoryName={e.category.name} 
            />
        )
    }
}

export default function Cards(){
    const dispatch = useDispatch()
    const products = useSelector(state => state.products)
    

    useEffect(() =>{
        dispatch(getProducts())
    },[])

    return(
        <table className={Style.container}>

            <tr>
                <th>Sku</th>
                <th>Name</th>
                <th>Stock</th>
                <th>Price</th>
                <th>Brand</th>
                <th>Category</th>
            </tr>

            <>
                {
                    products.map(e => (
                        valProduct(e)
                    ))
                }
            </>

        </table>
    )
}