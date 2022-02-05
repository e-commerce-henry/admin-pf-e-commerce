import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getAllOrders } from "../../redux/actions";
import OrderDetail from "./OrderDetail";
import { getOrderByOrderId } from "../../redux/actions";
import Style from './Orders.module.css'
import useAuth from "../../hooks/useAuth";
import Pagination from "../Pagination/Pagination";


export default function Orders(){
    const dispatch = useDispatch();
    const {auth} = useAuth();
    const orders = useSelector(state => state.orders)
    const [showDialog, setShowDialog]= useState(false)


    useEffect(()=>{
        dispatch(getAllOrders(auth));
    }, [dispatch])
    
  
    const onClick = (e)=>{
        setShowDialog(!showDialog)
        dispatch(getOrderByOrderId(e.target.value, auth))
    }

    const numberPage =[];
    const [page, setPage] = useState(1);
    const ordersXpage =20;
    let paginas = Math.ceil(orders.length/ordersXpage);
        for (let i = 1; i <= paginas; i++) {
            numberPage.push(i);
        }
        const indexUltimo = page*ordersXpage;
        const indexInicio = indexUltimo - ordersXpage;
        const sliceOrders = orders.slice(indexInicio, indexUltimo);


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
                                ? sliceOrders.map(e => {
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
                <Pagination
                    numberPage={numberPage}
                    page={page}
                    setPage={setPage}
                />         
                
                <div className={Style.orderModal}>
                    { showDialog
                        ? <OrderDetail setShowDialog={setShowDialog} showDialog={showDialog}/>
                        : null
                    }
                </div>
                
            </div>
        </div>
        
        
        
        
    )
};