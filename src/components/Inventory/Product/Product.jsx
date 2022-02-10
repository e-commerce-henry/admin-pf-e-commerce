import React, { useEffect, useState } from "react";
import Style from "./Product.module.css";
// import Swal from 'sweetalert2';
import { Modal, TextField, Select, MenuItem, TextareaAutosize } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'
import { useDispatch, useSelector } from "react-redux";
import { editProduct, getCategorys, getProducts } from "../../../redux/actions";
import useAuth from "../../../hooks/useAuth";
import { validate } from "../Inventory";

const useStyles = makeStyles((theme)=>({
    modal:{
        position:'absolute',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        width:'40%',
        height:'95%',
        backgroundColor:'white',
        border:'none',
        boxShadow: '0px 0px 5px 1px #303841',
        padding: theme.spacing(0,4,0),
        top:'50%',
        left:'50%',
        transform:'translate(-50%,-50%)',
        borderRadius: '20px',
        color:'#FF5722',
        fontSize:'15px',
        fontFamily:'Lexend Deca',
    },
    textfield:{
        width:'100%',
    },
    floatingLabelFocusStyle: {
        color: "#FF5722",
        fontFamily:'Lexend Deca',
        fontSize:'15px',
        resize:'none'
    },
    floatingValueFocusStyle: {
        color: "#303841",
        fontFamily:'Lexend Deca',
        fontSize:'15px',
        resize:'none'

    }
}))




export default function Product({id, name, stock, price, img, brand, description, categoryName}){

    const categor = useSelector(state=> state.categorys)
    const product = useSelector(state => state.products);
    let marca = product.map(e => e.brand);
    marca = [...new Set(marca)];
    const {auth} = useAuth();
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

    const [errors, setErrors] = useState('');

    const onSubmit = e =>{
        e.preventDefault();
        if(Object.keys(errors).length === 0){
            dispatch(editProduct(id, values, auth));
            setModal(!modal)
        }
    }

    const handleOnChange = e => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        })
        setErrors(validate({
            ...values,
            [e.target.name]: e.target.value
        }))
    }

    const abriCerrarModal = () => {
        setModal(!modal)
    }

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
                    <button className={Style.edit} onClick={()=>abriCerrarModal()} >Edit</button>
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
                        InputLabelProps={{
                            className: styles.floatingLabelFocusStyle,
                        }}
                        InputProps={{
                            className: styles.floatingValueFocusStyle,
                        }}
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
                        InputLabelProps={{
                            className: styles.floatingLabelFocusStyle,
                        }}
                        InputProps={{
                            className: styles.floatingValueFocusStyle,
                        }}
                    />
                    {!errors.name ? null : <span>{errors.name}</span>}
                    <br/>
                    <TextField
                        label='Stock:'
                        name='stock'
                        className={styles.textfield}
                        value={values.stock}
                        onChange={handleOnChange}
                        InputLabelProps={{
                            className: styles.floatingLabelFocusStyle,
                        }}
                        InputProps={{
                            className: styles.floatingValueFocusStyle,
                        }}
                    />
                    {!errors.stock ? null : <span>{errors.stock}</span>}
                    <br/>
                    <TextField
                        label='Price:'
                        name='price'
                        className={styles.textfield}
                        value={values.price}
                        onChange={handleOnChange}
                        InputLabelProps={{
                            className: styles.floatingLabelFocusStyle,
                        }}
                        InputProps={{
                            className: styles.floatingValueFocusStyle,
                        }}
                    />
                    {!errors.price ? null : <span>{errors.price}</span>}
                    <br/>
                    <TextField
                        label='URL Image:'
                        name='img'
                        className={styles.textfield}
                        value={values.img}
                        onChange={handleOnChange}
                        InputLabelProps={{
                            className: styles.floatingLabelFocusStyle,
                        }}
                        InputProps={{
                            className: styles.floatingValueFocusStyle,
                        }}
                    />
                    {!errors.img ? null : <span>{errors.img}</span>}
                    <br/>
                    <div>Description:</div>
                    <TextareaAutosize
                        label='Descripcion'
                        maxRows={5}
                        name='description'
                        className={styles.textfield}
                        value={values.description}
                        onChange={handleOnChange}
                        style={{ resize: "none", fontFamily:'Lexend Deca', padding:'3px', outline:'none' }}
                    />
                    {!errors.description ? null : <span>{errors.description}</span>}
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
                    {!errors.brand ? null : <span>{errors.brand}</span>}
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
                    {!errors.category ? null : <span>{errors.category}</span>}
                    <br/>
                    
                    <br/>
                    <div className={Style.allbtnsp} >
                        <button className={Style.btn1} type="submit" >Actualizar</button>
                        <button className={Style.btn1} onClick={()=>abriCerrarModal()} >cancelar</button>
                    </div>
                </form>
            </Modal>

        </>
    )
}