import { Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@material-ui/core"
import axios from "axios";
import { useEffect } from "react";
import { useSelector } from "react-redux"


const OrderDetail = ({showDialog, setShowDialog})=>{
    const orderById = useSelector(state=> state.orderById);

    useEffect(async ()=>{ //traigo los detalles de usuario para mostrar los detalles de este en el modal debajo de la tabla
        const userDetails = (await axios.get(`http://localhost:3001/users/${orderById.userId}`)).data;
        
        console.log(userDetails)
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