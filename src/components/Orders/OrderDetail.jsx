import { Card, CardContent, Typography, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@material-ui/core"
import axios from "axios";
import { useEffect } from "react";
import { useSelector } from "react-redux"


const OrderDetail = ({showDialog, setShowDialog})=>{
    const orderById = useSelector(state=> state.orderById);
    let userDetails;

    useEffect(async ()=>{ //traigo los detalles de usuario para mostrar los detalles de este en el modal debajo de la tabla
        userDetails = (await axios.get(`http://localhost:3001/users/${orderById.userId}`)).data;
        const shippingAddress = userDetails.clientAddresses.find((elem)=> elem.id == orderById.shippingAddress)
        console.log(userDetails)
        console.log(shippingAddress);
    }, [orderById])
    return(
        
        <Modal open={showDialog} onClose={()=>{setShowDialog(!showDialog)}} >
            <TableContainer component = {Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Product Id</TableCell>
                            <TableCell>Quantity</TableCell>
                            <TableCell>Price</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        
                        {   orderById ?
                            orderById.orderDetails.map(e=>{ return (
                            <TableRow key={e.id}>
                                <TableCell component='th' scope="row">{e.productId}</TableCell>
                                <TableCell >{e.quantity}</TableCell>
                                <TableCell component='th' scope="row">{e.price}</TableCell>
                            </TableRow>
                            )
                            
                        })
                        :null
                        }
                    </TableBody>
                </Table>
            </TableContainer>

                  
            

        </Modal> 
                
        
    )
}

export default OrderDetail;