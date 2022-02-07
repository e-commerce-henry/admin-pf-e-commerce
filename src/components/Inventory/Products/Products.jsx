import React, { useState } from "react";
import { useEffect } from "react";
import Product from "../Product/Product";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../../redux/actions";
import Style from "./Products.module.css"
import Pagination from "../../Pagination/Pagination";




export default function Cards(){
    const dispatch = useDispatch()
    const products = useSelector(state => state.products)
    
    const numberPage =[];
    const [page, setPage] = useState(1);
    const productXpage =25;
    let paginas = Math.ceil(products.length/productXpage);
        for (let i = 1; i <= paginas; i++) {
            numberPage.push(i);
        }
        const indexUltimo = page*productXpage;
        const indexInicio = indexUltimo - productXpage;
        const slicevideogame = products.slice(indexInicio, indexUltimo);


    useEffect(() =>{
        dispatch(getProducts())
    },[dispatch])

    return(
        <>
            <table className={Style.container}>
                <tbody>
                    <tr>
                        <th>Sku</th>
                        <th>Name</th>
                        <th>Stock</th>
                        <th>Price</th>
                        <th>Brand</th>
                        <th>Category</th>
                    </tr>
                   
                    {
                        products    
                            ? slicevideogame.map(e => {
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
                                    categoryName={e.category.name || e.category}
                                    />
                            )})
                             : null  
                            
                    }
                    
                    
                </tbody>
            </table>   
            <Pagination
                numberPage={numberPage}
                page={page}
                setPage={setPage}
            />         
        </>

    )
}