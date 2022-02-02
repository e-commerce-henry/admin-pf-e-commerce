import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getAllOrders } from "../../redux/actions";
import OrderDetail from "./OrderDetail";
import { getOrderByOrderId } from "../../redux/actions";
import Style from './Orders.module.css'
import useAuth from "../../hooks/useAuth";

export default function Orders(){
    const dispatch = useDispatch();
    const {auth} = useAuth();
    const orders = useSelector(state => state.orders)
    const orderById = useSelector(state => state.orderById);
    const [showDialog, setShowDialog]= useState(false)


    useEffect(()=>{
        dispatch(getAllOrders(auth));
    }, [dispatch])
    
  
    const onClick = (e)=>{
        setShowDialog(!showDialog)
        dispatch(getOrderByOrderId(e.target.value))
    }

    return(
        <div className={Style.container}>
            <div className={Style.allOrders}>
                <h1>Orders</h1>
                <table className={Style.table}>
                    <tbody>
                        <tr className={Style.tableRow}>
                            <th>Id Order</th>
                            <th>Id Client</th>
                            <th>Status</th>
                            <th>Date</th>
                            <th>Shipping Address Id</th>
                            <th>Shipping Status</th>
                            <th>Total $</th>
                        </tr>
                        {
                            orders
                                ? orders.map(e => {
                                return ( 
                                    <tr className={Style.tableRow} key={e.id}>
                                        <td>{e.id}</td>
                                        <td>{e.userId}</td>
                                        <td>{e.status}</td>
                                        <td>{e.date}</td>
                                        <td>{e.shippingAddress}</td>
                                        <td>{e.shippingStatus}</td>
                                        <td>{e.total}</td>
                                        <td><button value={e.id} onClick={onClick}>More Info</button></td>
                                    </tr>
                                )
                                })
                                : null   
                        }       
                    </tbody>
                </table>
                
                { showDialog
                    ? <OrderDetail setShowDialog={setShowDialog} showDialog={showDialog}/>
                    : null
                }
            </div>
        </div>
        
        
        
        
    )
};