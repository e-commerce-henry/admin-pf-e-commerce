import { Card, CardContent, Typography, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Divider } from "@material-ui/core"
import axios from "axios";
import { useEffect } from "react";
import { useSelector } from "react-redux"
import Style from './OrderDetail.module.css'


const OrderDetail = ({showDialog, setShowDialog})=>{
    const orderById = useSelector(state=> state.orderById);
    
    // let userDetails;

    // useEffect(async ()=>{ //traigo los detalles de usuario para mostrar los detalles de este en el modal debajo de la tabla
    //     userDetails = (await axios.get(`http://localhost:3001/users/${orderById.userId}`)).data;
    //     const shippingAddress = userDetails.clientAddresses.find((elem)=> elem.id == orderById.shippingAddress)
    //     console.log(userDetails)
    //     console.log(shippingAddress);
    // }, [orderById])
    return(
        
        <Modal className={Style.modal} open={showDialog} onClose={()=>{setShowDialog(!showDialog)}} >
            {/* Tabla detalles de ordenes */}
            <TableContainer className={Style.tableContainer} component = {Paper}>
                <div>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Product Id</TableCell>
                                <TableCell>Product name</TableCell>
                                <TableCell>Quantity</TableCell>
                                <TableCell>Price</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            
                            {   orderById.length>0 ?
                                orderById[0].orderDetails.map(e=>{ return (
                                <TableRow key={e.id}>
                                    <TableCell >{e.productId}</TableCell>
                                    <TableCell >{e.name}</TableCell>
                                    <TableCell >{e.quantity}</TableCell>
                                    <TableCell >{e.price}</TableCell>
                                </TableRow>
                                ) 
                            })
                            :null
                            }
                        </TableBody>
                    </Table>
                </div>
                
                
               <br/>
               <br/>
                <Divider variant="fullWidth" className={Style.divider}/>
               
                
                <div className={Style.bottomSection}>
                    {/* Tabla Detalle de cliente */}
                    {orderById.length>0
                        ?
                            <Table className={Style.userDetails}>
                                <TableBody>
                                    <TableRow>
                                        <TableCell variant="head">User Id</TableCell>
                                        <TableCell>{orderById[0].user.id}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell variant="head">Name</TableCell>
                                        <TableCell>{orderById[0].user.name}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell variant="head">Surname</TableCell>
                                        <TableCell>{orderById[0].user.surname}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell variant="head">Email</TableCell>
                                        <TableCell>{orderById[0].user.email}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        :null
                    }
                    <Divider className={Style.divider} orientation="vertical" variant="fullWidth" flexItem />

                    {/* Tabla detalle direccion */}
                    {orderById.length>0
                        ?
                            <Table className={Style.addressDetails}>
                                <TableBody>
                                    <TableRow>
                                        <TableCell variant="head">Address Id</TableCell>
                                        <TableCell>{orderById[1].id}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell variant="head">Address</TableCell>
                                        <TableCell>{orderById[1].address}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell variant="head">PostalCode</TableCell>
                                        <TableCell>{orderById[1].postalCode}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell variant="head">City</TableCell>
                                        <TableCell>{orderById[1].city}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell variant="head">Province</TableCell>
                                        <TableCell>{orderById[1].province}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell variant="head">Floor</TableCell>
                                        <TableCell>{orderById[1].floor}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        :null
                    }
                </div>
            </TableContainer>
        </Modal> 
                
        
    )
}

export default OrderDetail;