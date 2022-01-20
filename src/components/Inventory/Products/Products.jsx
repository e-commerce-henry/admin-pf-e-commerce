import React from "react";
import { useEffect, useState } from "react";
import Product from "../Product/Product";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../../redux/actions";

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
            categoryId={e.categoryId} 
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
        <>
        {
            products.map(e => (
                valProduct(e)
            ))
        }
        </>
    )
}