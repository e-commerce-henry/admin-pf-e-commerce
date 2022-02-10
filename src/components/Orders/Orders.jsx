import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getAllOrders } from "../../redux/actions";
import OrderDetail from "./OrderDetail";
import EditOrder from "./OrderEditForm";
import { getOrderByOrderId } from "../../redux/actions";
import Style from './Orders.module.css'
import useAuth from "../../hooks/useAuth";
import Pagination from "../Pagination/Pagination";


export default function Orders(){
    const dispatch = useDispatch();
    const {auth} = useAuth();
    const orders = useSelector(state => state.orders)
    const [showDialogInfo, setShowDialogInfo]= useState(false)
    const [showDialogEdit, setShowDialogEdit] = useState(false)

    useEffect(()=>{
        dispatch(getAllOrders(auth));
    }, [dispatch])
    
  
    const onClickInfo = (e)=>{
        setShowDialogInfo(!showDialogInfo)
        dispatch(getOrderByOrderId(e.target.value, auth))
    }
    const onClickEdit = async(e)=>{
        setShowDialogEdit(!showDialogEdit);
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
                            <th>$ Total</th>
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
                                        <td><button className={Style.btnorders} value={e.id} onClick={onClickInfo}>More Info</button></td>
                                        <td><button className={Style.btnorders} value={e.id} onClick={onClickEdit}>Edit</button></td>
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
                
                <div >
                    { showDialogInfo
                        ? <OrderDetail setShowDialogInfo={setShowDialogInfo} showDialogInfo={showDialogInfo}/>
                        : null
                    }
                </div>
                <div >
                    { showDialogEdit
                        ? <EditOrder setShowDialogEdit={setShowDialogEdit} showDialogEdit={showDialogEdit} />
                        : null
                    }
                </div>
                
            </div>
        </div>
        
        
        
        
    )
};