import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { createProduct, getCategorys } from "../../redux/actions";
import Style from './Inventory.module.css'

export default function Inventory(){
    const dispatch = useDispatch()

    const categorys = useSelector(state => state.categorys)/* .sort((a, b) => {
        return a.name.localeCompare(b.name)
    } ) */

    useEffect(() =>{
        dispatch(getCategorys())
    },[])

    const [newProduct, setProduct] = useState({
        name: '',
        stock: '',
        price: '',
        img: '',
        brand: '',
        description: '',
        category: ''
    })

    function onChange(e){
        setProduct({
            ...newProduct,
            [e.target.name]: e.target.value
        })
    }

    function submitProduct(e){
        e.preventDefault();
        let producto = {
            name: newProduct.name,
            stock: parseInt(newProduct.stock),
            price: parseFloat(newProduct.price),
            img: newProduct.img,
            brand: newProduct.brand,
            description: newProduct.description,
            category: newProduct.category
        }
        dispatch(createProduct(producto))
        alert(`Category ${newProduct.name} create`)
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

    return(
        <div className={Style.container}>
            <h1>inventory</h1>
            <form id ="myForm" onSubmit={e => submitProduct(e)}>

                <div>
                    <label type="text">Product name </label>
                    <input type='text' name='name' onChange={e => onChange(e)}/>
                </div>

                <div>
                    <label type="text">Stock </label>
                    <input type='number' name='stock' onChange={e => onChange(e)}/>
                </div>

                <div>
                    <label type="text">price </label>
                    <input type='number' name='price' onChange={e => onChange(e)}/>
                </div>

                <div>
                    <label type="text">Image </label>
                    <input type='text' placeholder='img url' name='img' onChange={e => onChange(e)}/>
                </div>

                <div>
                    <label type="text">Brand </label>
                    <input type='text' name='brand' onChange={e => onChange(e)}/>
                </div>

                <div>
                    <label type="text">Description </label>
                    <input type='text' name='description' onChange={e => onChange(e)}/>
                </div>

                <div>
                    
                    <select onChange={e => onChange(e)}>
                        <option hidden>Select category:</option>
                        {
                            categorys? categorys.map( cat => {
                                const {name, id} = cat
                                return (
                                    <option value={name} key={id}  >{name}</option>
                                )
                            }): null
                        }
                    </select>

                </div>

                <div>
                    <button type='submit'>Agregar producto </button>
                </div>



            </form>
        </div>
    )
};