import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Modal, TextField} from '@material-ui/core';
import Style from './OrderEditForm.module.css';
import { makeStyles } from '@material-ui/core/styles'
import { useEffect } from "react";
import { editOrder } from "../../redux/actions";
import useAuth from "../../hooks/useAuth";



const useStyles = makeStyles((theme)=>({
    modal:{
        position:'absolute',
        display: 'flex',
        flexDirection: 'column',
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


const EditOrder = ({showDialogEdit, setShowDialogEdit}) =>{
    const styles = useStyles();
    const {auth}= useAuth();
    const dispatch = useDispatch();
    const orderDetail = useSelector(state => state.orderById)
    console.log(orderDetail)
    const [orderToEdit, setOrderToEdit] = useState({
        
    })
    
    useEffect(()=>{
        if(orderDetail.length>0){
            setOrderToEdit({
                id: orderDetail[0].id,
                status: orderDetail[0].status,
                total: orderDetail[0].total,
                shippingStatus: orderDetail[0].shippingStatus
            })
        }
        
    },[orderDetail])
    
    const [errors, setErrors] = useState('')
    const [showAlert, setShowAlert] = useState('')
    console.log(orderDetail)
    const onChangeHandler =(e)=>{
        setOrderToEdit({
            ...orderToEdit,
            [e.target.name]: e.target.value
        })

        setErrors(validate({
            ...orderToEdit,
            [e.target.name]: e.target.value
        }))
    }

    const editOrderHandler = (e)=>{
        e.preventDefault();
        if(errors && Object.keys(errors).length > 0){
            return setShowAlert('errorSubmit')}
        else{
            dispatch(editOrder(orderToEdit, auth))
            setShowDialogEdit(!showDialogEdit);
        }
    }

    const validate = (orderToEdit)=>{
        const errors = {}

        if(!orderToEdit.status){errors.status = 'Status is required'}
        else if(!/^completed$|^processing$|^cancelled$/g.test(orderToEdit.status)){
                errors.status = 'Status is invalid - Only "completed", "cancelled" and "processing" values are valid'
            }
        if(!orderToEdit.total) {errors.total = 'Total is required'}
        else if(!/^[0-9]*$/g.test(orderToEdit.total)){ errors.total = "Total is invalid - only numbers are accepted"}
        
        if(!orderToEdit.shippingStatus) {errors.shippingStatus = 'Shipping Status is required'}
        else if(!/^sent$|^not sent$/g.test(orderToEdit.shippingStatus)) { errors.shippingStatus = 'Shipping Status is invalid - Only "sent" and "not sent" values are valid'}
        
        return errors
    }


    return (
        <>
            {
            orderDetail.length >0  
                ? <Modal
                open={showDialogEdit}
                onClose={()=>{setShowDialogEdit(!showDialogEdit)}}
                >
                    <form  className={styles.modal} onSubmit={editOrderHandler} >
                        <div align='center' >
                            <h2>Edit Order</h2>
                        </div>
                        <TextField
                            label='N° Id:'
                            name='id'
                            className={styles.textfield}
                            value={orderToEdit.id}
                            disabled
                        />
                        <br/>
                        <TextField
                            label='Status: '
                            name='status'
                            className={styles.textfield}
                            value={orderToEdit.status}
                            required
                            onChange={onChangeHandler}
                        />
                        {!errors.status ? null : <span>{errors.status}</span>}
                        <br/>
                        <TextField
                            label='Total ($)'
                            name='total'
                            className={styles.textfield}
                            value={orderToEdit.total}
                            required
                            onChange={onChangeHandler}
                        />
                        {!errors.total ? null : <span>{errors.total}</span>}
                        <br/>
                        <TextField
                            label='Shipping Status:'
                            name='shippingStatus'
                            className={styles.textfield}
                            value={orderToEdit.shippingStatus}
                            required
                            onChange={onChangeHandler}
                        />
                        <br/>
                        {!errors.shippingStatus ? null : <span>{errors.shippingStatus}</span>}
                        
                        <div align='rigth' >
                            <button type="submit" >Update</button>
                            <button onClick={()=>setShowDialogEdit(!showDialogEdit)} >Cancel</button>
                        </div>
                    </form>
                </Modal>
                :null
        }    
        </>
        
    )
}

export default EditOrder;