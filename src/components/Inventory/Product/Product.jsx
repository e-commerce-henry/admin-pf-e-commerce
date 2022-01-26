import React, { useEffect, useState } from "react";
import Style from "./Product.module.css";
// import Swal from 'sweetalert2';
import { Modal, TextField, Select, MenuItem, TextareaAutosize } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'
import { useDispatch, useSelector } from "react-redux";
import { editProduct, getCategorys } from "../../../redux/actions";

const useStyles = makeStyles((theme)=>({
    modal:{
        position:'absolute',
        width:700,
        height:800,
        backgroundColor:'white',
        border:'2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2,4,3),
        top:'50%',
        left:'50%',
        transform:'translate(-50%,-50%)'
    },
    textfield:{
        width:'80%',
    }
}))




export default function Product({id, name, stock, price, img, brand, description, categoryName}){

    const categor = useSelector(state=> state.categorys)
    const product = useSelector(state => state.products);
    let marca = product.map(e => e.brand);
    marca = [...new Set(marca)];

    const styles = useStyles();
    const dispatch = useDispatch()
    const [modal, setModal] = useState(false);
    const [values, setValues] = useState({
        name: name,
        stock: stock,
        price: price,
        img:img,
        brand: brand,
        description:description,
        category: categoryName
    })
    const onSubmit = e =>{
        e.preventDefault();
        dispatch(editProduct(id, values));
        window.location = '/Inventory';
    }

    const handleOnChange = e => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        })
    }

    const abriCerrarModal = () => {
        setModal(!modal)
    }

/*     useEffect(() => {
      
        dispatch(getCategorys())
    }, [dispatch]); */
    

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
                <td>
                    <button onClick={()=>abriCerrarModal()} >edit</button>
                </td>
            </tr>

                <Modal
                    open={modal}
                    onClose={abriCerrarModal}
                >
                <form className={styles.modal} onSubmit={onSubmit} >
                    <div align='center' >
                        <h2>Editar Producto</h2>
                    </div>
                    <TextField
                        label='N° Id:'
                        name='id'
                        className={styles.textfield}
                        value={id}
                        // onChange={handleOnChange}
                        disabled
                    />
                    <br/>
                    <TextField
                        label='Name Product:'
                        name='name'
                        className={styles.textfield}
                        value={values.name}
                        onChange={handleOnChange}
                    />
                    <br/>
                    <TextField
                        label='Stock:'
                        name='stock'
                        className={styles.textfield}
                        value={values.stock}
                        onChange={handleOnChange}
                    />
                    <br/>
                    <TextField
                        label='Price:'
                        name='price'
                        className={styles.textfield}
                        value={values.price}
                        onChange={handleOnChange}img
                    />
                    <br/>
                    <TextField
                        label='URL Image:'
                        name='img'
                        className={styles.textfield}
                        value={values.img}
                        onChange={handleOnChange}
                    />
                    <br/>
                    <div>Description:</div>
                    <TextareaAutosize
                        label='Descripcion'
                        maxRows={15}
                        name='description'
                        className={styles.textfield}
                        value={values.description}
                        onChange={handleOnChange}
                    />
                    <br/>
                    <div>Brand:</div>
                    <Select label='Brand' onChange={handleOnChange} name="brand" value={values.brand}>
                        {
                            marca? marca.map( (e,i) => {
                                return (
                                    <MenuItem value={e} key={i}>{e}</MenuItem>
                                )
                            }): null
                        }
                    </Select>
                    <br/>
                    <div>Category:</div>
                    <Select label='Category' onChange={handleOnChange} name="category" value={values.category}>
                        {
                            categor? categor.map( cat => {
                                return (
                                    <MenuItem value={cat.name} key={cat.id}>{cat.name}</MenuItem>
                                )
                            }): null
                        }
                    </Select>
                    <br/>
                    
                    <br/>
                    <div align='rigth' >
                        <button type="submit" >Actualizar</button>
                        <button onClick={()=>abriCerrarModal()} >cancelar</button>
                    </div>
                </form>
            </Modal>

        </>
    )
}