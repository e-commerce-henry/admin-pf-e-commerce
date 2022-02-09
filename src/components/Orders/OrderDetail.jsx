import { Card, CardContent, Typography, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Divider } from "@material-ui/core"
import axios from "axios";
import { useEffect } from "react";
import { useSelector } from "react-redux"
import Style from './OrderDetail.module.css'


const OrderDetail = ({showDialogInfo, setShowDialogInfo})=>{
    const orderById = useSelector(state=> state.orderById);
    
   
    return(
        
        <Modal className={Style.modal} open={showDialogInfo} onClose={()=>{setShowDialogInfo(!showDialogInfo)}} >
            {/* Tabla detalles de ordenes */}
            <TableContainer className={Style.tableContainer} component = {Paper}>
                <div>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell style={{ fontFamily: "Lexend Deca", fontWeight:'700', textAlign:'center', color:'#FF5722' }}>Product Id</TableCell>
                                <TableCell style={{ fontFamily: "Lexend Deca", fontWeight:'700', textAlign:'center', color:'#FF5722' }}>Product name</TableCell>
                                <TableCell style={{ fontFamily: "Lexend Deca", fontWeight:'700', textAlign:'center', color:'#FF5722' }}>Quantity</TableCell>
                                <TableCell style={{ fontFamily: "Lexend Deca", fontWeight:'700', textAlign:'center', color:'#FF5722' }}>Price</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            
                            {   orderById.length>0 ?
                                orderById[0].orderDetails.map(e=>{ return (
                                <TableRow key={e.id}>
                                    <TableCell style={{ fontFamily: "Lexend Deca", fontWeight:'500', textAlign:'center'}}>{e.productId}</TableCell>
                                    <TableCell style={{ fontFamily: "Lexend Deca", fontWeight:'500', textAlign:'center'}}>{e.name}</TableCell>
                                    <TableCell style={{ fontFamily: "Lexend Deca", fontWeight:'500', textAlign:'center'}}>{e.quantity}</TableCell>
                                    <TableCell style={{ fontFamily: "Lexend Deca", fontWeight:'500', textAlign:'center'}}>{e.price}</TableCell>
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
                                        <TableCell variant="head" style={{ fontFamily: "Lexend Deca", fontWeight:'700', color:'#FF5722'}}>User Id</TableCell>
                                        <TableCell style={{ fontFamily: "Lexend Deca", fontWeight:'500'}}>{orderById[0].user.id}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell variant="head" style={{ fontFamily: "Lexend Deca", fontWeight:'700', color:'#FF5722'}}>Name</TableCell>
                                        <TableCell style={{ fontFamily: "Lexend Deca", fontWeight:'500'}}>{orderById[0].user.name}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell variant="head" style={{ fontFamily: "Lexend Deca", fontWeight:'700', color:'#FF5722'}}>Surname</TableCell>
                                        <TableCell style={{ fontFamily: "Lexend Deca", fontWeight:'500'}}>{orderById[0].user.surname}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell variant="head" style={{ fontFamily: "Lexend Deca", fontWeight:'700', color:'#FF5722'}}>Email</TableCell>
                                        <TableCell style={{ fontFamily: "Lexend Deca", fontWeight:'500'}}>{orderById[0].user.email}</TableCell>
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
                                        <TableCell variant="head" style={{ fontFamily: "Lexend Deca", fontWeight:'700', color:'#FF5722'}}>Address Id</TableCell>
                                        <TableCell style={{ fontFamily: "Lexend Deca", fontWeight:'500'}}>{orderById[1].id}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell variant="head" style={{ fontFamily: "Lexend Deca", fontWeight:'700', color:'#FF5722'}}>Address</TableCell>
                                        <TableCell style={{ fontFamily: "Lexend Deca", fontWeight:'500'}}>{orderById[1].address}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell variant="head" style={{ fontFamily: "Lexend Deca", fontWeight:'700', color:'#FF5722'}}>PostalCode</TableCell>
                                        <TableCell style={{ fontFamily: "Lexend Deca", fontWeight:'500'}}>{orderById[1].postalCode}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell variant="head" style={{ fontFamily: "Lexend Deca", fontWeight:'700', color:'#FF5722'}}>City</TableCell>
                                        <TableCell style={{ fontFamily: "Lexend Deca", fontWeight:'500'}}>{orderById[1].city}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell variant="head" style={{ fontFamily: "Lexend Deca", fontWeight:'700', color:'#FF5722'}}>Province</TableCell>
                                        <TableCell style={{ fontFamily: "Lexend Deca", fontWeight:'500'}}>{orderById[1].province}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell variant="head" style={{ fontFamily: "Lexend Deca", fontWeight:'700', color:'#FF5722'}}>Floor</TableCell>
                                        <TableCell style={{ fontFamily: "Lexend Deca", fontWeight:'500'}}>{orderById[1].floor}</TableCell>
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