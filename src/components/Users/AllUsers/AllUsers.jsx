import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, getUserById } from "../../../redux/actions";
import Style from "./AllUsers.module.css"
import { Modal, TextField, Select, MenuItem, TextareaAutosize } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'
import { useState } from "react";
import axios from 'axios';

//Material-ui styles
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




const AllUsers = () =>{
    const dispatch = useDispatch();
    const styles = useStyles();
    const users = useSelector(state => state.users);
    const [showModal, setShowModal]= useState(false)
    // const foundUserById = useSelector(state => state.userById);
    // const { id, name, surname, email, role} = foundUserById;
    // const { address, city, province, postalCode, floor} = foundUserById.clientAddresses[0];

    const [userToEdit, setUserToEdit] = useState({
        name: '',
        // surname:,
        // email,
        // address: 
        // postalCode: foundUserById.clientAddresses[0].postalCode
        // city:foundUserById[0].address,
        // province:foundUserById[0].address,
        // floor:foundUserById[0].address,
        // role:foundUserById[0].address
    })

    useEffect(()=>{
        dispatch(getUsers())
    }, [dispatch])

    let foundById = null
    const onClick = (e)=>{
        setShowModal(!showModal)
        console.log(e.target.value)
        foundById = users.filter(elem=>{return elem.id == e.target.value})
        console.log(foundById);
    }

    const editUserHandler = (e)=>{
        console.log(e)
    }

    const onChangeHandler = (e) =>{
        setUserToEdit({
            ...userToEdit,
            [e.target.name]: e.target.value
        })
    }

    const deleteUserHandler = () =>{
        console.log()
    }
    return(
        <>
        <table className={Style.container}>
            <tbody>
                <tr className={Style.subcontainer}>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Surname</th>
                    <th>Email</th>
                    <th>Role</th>
                </tr>
                {
                    users
                        ? users.map(e => {
                        return ( 
                            <tr className={Style.subcontainer} key={e.id}>
                                <td>{e.id}</td>
                                <td>{e.name}</td>
                                <td>{e.surname}</td>
                                <td>{e.email}</td>
                                <td>{e.role}</td>
                                <td><button value={e.id} onClick={onClick}>More Info</button></td>
                            </tr>
                        )
                        })
                        : null   
                }       
            </tbody>
        </table>

        {
            foundById 
                ? <Modal
                open={showModal}
                onClose={onClick}
                >
                    <form className={styles.modal} onSubmit={editUserHandler} >
                        <div align='center' >
                            <h2>Edit User</h2>
                        </div>
                        <TextField
                            label='N° Id:'
                            name='id'
                            className={styles.textfield}
                            value={foundById.id}
                            // onChange={handleOnChange}
                            disabled
                        />
                        <br/>
                        <TextField
                            label='Name: '
                            name='name'
                            className={styles.textfield}
                            value={foundById.name}
                            onChange={onChangeHandler}
                        />
                        {/* <br/>
                        <TextField
                            label='Surname:'
                            name='surname'
                            className={styles.textfield}
                            value={userToEdit.surname}
                            onChange={onChangeHandler}
                        />
                        <br/>
                        <TextField
                            label='Email:'
                            name='email'
                            className={styles.textfield}
                            value={userToEdit.email}
                            onChange={onChangeHandler}img
                        />
                        <br/>
                        <TextField
                            label='Role:'
                            name='role'
                            className={styles.textfield}
                            value={userToEdit.role}
                            onChange={onChangeHandler}
                        />
                        <br/>
                        <TextField
                            label='Address:'
                            name='address'
                            className={styles.textfield}
                            value={userToEdit.address}
                            onChange={onChangeHandler}
                        />
                        <br/>
                        <TextField
                            label='City:'
                            name='city'
                            className={styles.textfield}
                            value={userToEdit.city}
                            onChange={onChangeHandler}
                        />
                        <br/>
                        <TextField
                            label='Province:'
                            name='province'
                            className={styles.textfield}
                            value={userToEdit.province}
                            onChange={onChangeHandler}
                        />
                        <br/>
                        <TextField
                            label='Postal Code:'
                            name='cp'
                            className={styles.textfield}
                            value={userToEdit.postalCode}
                            onChange={onChangeHandler}
                        />
                        <br/>
                        <TextField
                            label='Floor:'
                            name='floor'
                            className={styles.textfield}
                            value={userToEdit.floor}
                            onChange={onChangeHandler}
                        />
                         */}
                        <div align='rigth' >
                            <button type="submit" >Actualizar</button>
                            {/* <button value={foundUserById.id} onClick={deleteUserHandler}></button> */}
                            <button onClick={onClick} >cancelar</button>
                        </div>
                    </form>
                </Modal>
                :null
        }    
        
        </>
        
    )
};

export default AllUsers;