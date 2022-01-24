import React from "react";
import Style from "./Product.module.css"

export default function Product({id, name, stock, price, img, brand, description, categoryName}){
    return(
        <>
            <tr className={Style.container}>
                <td>{id}</td>
                <td>{name}</td>
                <td>{stock}</td>
                <td>{price}</td>
                {/* <div>Url img: {img}</div> */}
                <td>{brand}</td>
                {/* <div>Description: {description}</div> */}
                <td>{categoryName}</td>
            </tr>
        </>
    )
}