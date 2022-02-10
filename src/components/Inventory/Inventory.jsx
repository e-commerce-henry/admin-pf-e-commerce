import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { createProduct, getCategorys, getProducts } from "../../redux/actions";
import Style from './Inventory.module.css'
import Products from './Products/Products'
import useAuth from "../../hooks/useAuth";



export function validate (newProduct) {
    const errors = {}

    if(!newProduct.name){errors.name = 'Product Name is required'}
    
    if(!newProduct.stock){errors.stock = 'Stock is required'}
    else if(!/^[0-9]*$/g.test(newProduct.stock)){
            errors.stock = 'Stock is invalid - Only round numbers are valid'
    }
    if(!newProduct.price){errors.price = 'Price is required'}
    else if(!/[+-]?([0-9]*[.,])?[0-9]+/gi.test(newProduct.price)){
            errors.price = 'Price is invalid'
    }
    if(newProduct.img && !/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/gm.test(newProduct.img)){
        errors.img = 'Please enter a valid URL'
    }
    if(!newProduct.brand){errors.brand = 'Brand is required'}
    if(!newProduct.description){errors.description = 'Description is required'}
    if(!newProduct.category){errors.category = 'Category is required'}     
    
    return errors
}




export default function Inventory(){
    const dispatch = useDispatch()
    const {auth} = useAuth();
    const categorys = useSelector(state => state.categorys)
    const product = useSelector(state => state.products);
    let brand = product.map(e => e.brand);
    brand = [...new Set(brand)];

    useEffect(() =>{
        // dispatch(getProducts())
        dispatch(getCategorys())
    },[dispatch])

    const [newProduct, setProduct] = useState({
        name: '',
        stock: '',
        price: '',
        img: '',
        brand: '',
        description: '',
        category: ''
    })
    const [errors, setErrors] = useState('')

    function onChange(e){
        setProduct({
            ...newProduct,
            [e.target.name]: e.target.value
        })
        setErrors(validate({
            ...newProduct,
            [e.target.name]: e.target.value
        }))
    }

    function submitProduct(e){
        e.preventDefault();
        if(Object.keys(errors).length === 0){
            let producto = {
                name: newProduct.name,
                stock: parseInt(newProduct.stock),
                price: parseFloat(newProduct.price),
                img: newProduct.img,
                brand: newProduct.brand,
                description: newProduct.description,
                category: newProduct.category
            }
            dispatch(createProduct(producto, auth))
            
            setProduct({
                name: '',
                stock: '',
                price: '',
                img: '',
                brand: '',
                description: '',
                category: ''
            })
            document.getElementById("myForm").reset();
        }
    }

    return(
        <div className={Style.container}>
            
            <form id ="myForm" onSubmit={e => submitProduct(e)}>
                <h2>Create a product</h2>

                <div>
                    <label type="text">Product name </label>
                    <input type='text' name='name'  onChange={e => onChange(e)}/>
                    {!errors.name ? null : <span className={Style.error}>{errors.name}</span>}
                </div>

                <div>
                    <label type="text">Stock </label>
                    <input type='number' name='stock'  onChange={e => onChange(e)}/>
                    {!errors.stock ? null : <span className={Style.error}>{errors.stock}</span>}
                </div>

                <div>
                    <label type="text">Price </label>
                    <input type='number' name='price' step='0.01' onChange={e => onChange(e)}/>
                    {!errors.price ? null : <span className={Style.error}>{errors.price}</span>}
                </div>

                <div>
                    <label type="text">Image </label>
                    <input type='text' placeholder='img url'  name='img' onChange={e => onChange(e)}/>
                    {!errors.img ? null : <span className={Style.error}>{errors.img}</span>}
                </div>

                <div>
                    <label type="text">Brand </label>
                    <select className={Style.selproduct} onChange={e => onChange(e)} name="brand">
                        <option hidden>Select brand:</option>
                        {
                            brand? brand.map( (b,i) => {
                                return (
                                    <option value={b} key={i}>
                                        {b}
                                    </option>
                                )
                            }): null
                        }
                    </select>
                    {!errors.brand ? null : <span className={Style.error}>{errors.brand}</span>}
                </div>

                <div>
                    <label type="text">Description </label>
                    <input type='text' name='description'  onChange={e => onChange(e)}/>
                    {!errors.description ? null : <span className={Style.error}>{errors.description}</span>}
                </div>

                <div>
                    <label type="text">Category </label>
                    <select className={Style.selproduct} onChange={e => onChange(e)} name="category">
                        <option hidden>Select category:</option>
                        {
                            categorys? categorys.map( cat => {
                                const {name, id} = cat
                                return (
                                    <option value={name} key={id}>{`${name}: ${id}`}</option>
                                )
                            }): null
                        }
                    </select>
                    {!errors.category ? null : <span className={Style.error}>{errors.category}</span>}
                </div>

                <div>
                    <button className={Style.agregarproducto} type='submit'>Agregar producto </button>
                </div>
                { errors && Object.keys(errors).length > 0 
                    ? <span className={Style.error}>No se puede enviar formulario vacio o con errores</span>
                    : null
                }


            </form>
            <div className={Style.inventory}>
                <h1>Inventory</h1>
                <Products/>
            </div>
        </div>
    )
};