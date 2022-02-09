import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, editUser, deleteUser } from "../../../redux/actions";
import Style from "./AllUsers.module.css"
import { Modal, TextField} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'
import { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import Pagination from "../../Pagination/Pagination";


//Material-ui styles
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
        width:'90%',
    },
    floatingLabelFocusStyle: {
        color: "#FF5722",
        fontFamily:'Lexend Deca',
        fontSize:'15px',
    },
    floatingValueFocusStyle: {
        color: "#303841",
        fontFamily:'Lexend Deca',
        fontSize:'15px',
    }
}))



const validate = (userToEdit)=>{
    const errors = {}

    if(!userToEdit.role){errors.role = 'Role is required'}
    else if(!/^admin$|^user$/g.test(userToEdit.role)){
            errors.role = 'Role is invalid - Only "admin" and "user" values are valid'
        }    
    return errors
}




const AllUsers = () =>{
    const dispatch = useDispatch();
    const {auth} = useAuth()
    const styles = useStyles();
    const users = useSelector(state => state.users);
    const [showModal, setShowModal]= useState(false)
    
    const [userToEdit, setUserToEdit] = useState({})
    const [errors, setErrors] = useState('')

    useEffect(()=>{
        
        dispatch(getUsers(auth))

    }, [dispatch])

    let foundById = null
    const onClick = (e)=>{
        setShowModal(!showModal)
        foundById = users.filter(elem=>{return elem.id == e.target.value})
        const { id, name, surname, email, role  } = foundById[0];
        const { address, postalCode, city, province, floor} = foundById[0].clientAddresses[0];
        setUserToEdit({
            id,
            name,
            surname,
            email,
            role,
            address,
            postalCode,
            city,
            province,
            addressId : foundById[0].clientAddresses[0].id,
            floor: floor || ''
        })
    }

    const onChangeHandler = (e) =>{
        setUserToEdit({
            ...userToEdit,
            [e.target.name]: e.target.value
        })
        setErrors(validate({
            ...userToEdit,
            [e.target.name]: e.target.value
        }))
    }

    const editUserHandler = (e)=>{
        e.preventDefault();
        if(Object.keys(errors).length === 0){
            dispatch(editUser(userToEdit, auth))
            setShowModal(!showModal)
        }
        
    }

    const deleteUserHandler = (e) =>{
        dispatch(deleteUser(e.target.value, auth))
    }

    const numberPage =[];
    const [page, setPage] = useState(1);
    const usersXpage =20;
    let paginas = Math.ceil(users.length/usersXpage);
        for (let i = 1; i <= paginas; i++) {
            numberPage.push(i);
        }
        const indexUltimo = page*usersXpage;
        const indexInicio = indexUltimo - usersXpage;
        const sliceUsers = users.slice(indexInicio, indexUltimo);

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
                        ? sliceUsers.map(e => {
                        return ( 
                            <tr className={Style.subcontainer} key={e.id}>
                                <td>{e.id}</td>
                                <td>{e.name}</td>
                                <td>{e.surname}</td>
                                <td>{e.email}</td>
                                <td>{e.role}</td>
                                <td><button className={Style.moreinfo} value={e.id} onClick={onClick}>+ Info</button></td>
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

        {
            userToEdit 
                ? <Modal
                open={showModal}
                onClose={()=>{setShowModal(!showModal)}}
                >
                    <form className={styles.modal} onSubmit={editUserHandler} >
                        {/* <div align='center' >
                            <h2>Edit User</h2>
                        </div> */}
                        <TextField
                            label='N° Id:'
                            name='id'
                            className={styles.textfield}
                            value={userToEdit.id}
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
                            label='Name: '
                            name='name'
                            className={styles.textfield}
                            value={userToEdit.name}
                            onChange={onChangeHandler}
                            InputLabelProps={{
                                className: styles.floatingLabelFocusStyle,
                            }}
                            InputProps={{
                                className: styles.floatingValueFocusStyle,
                            }}
                            disabled
                        />
                        <br/>
                        <TextField
                            label='Surname:'
                            name='surname'
                            className={styles.textfield}
                            value={userToEdit.surname}
                            onChange={onChangeHandler}
                            InputLabelProps={{
                                className: styles.floatingLabelFocusStyle,
                            }}
                            InputProps={{
                                className: styles.floatingValueFocusStyle,
                            }}
                            disabled
                        />
                        <br/>
                        <TextField
                            label='Email:'
                            name='email'
                            className={styles.textfield}
                            value={userToEdit.email}
                            onChange={onChangeHandler}
                            InputLabelProps={{
                                className: styles.floatingLabelFocusStyle,
                            }}
                            InputProps={{
                                className: styles.floatingValueFocusStyle,
                            }}
                            disabled
                        />
                        <br/>
                        <TextField
                            label='Role:'
                            name='role'
                            className={styles.textfield}
                            value={userToEdit.role}
                            onChange={onChangeHandler}
                            InputLabelProps={{
                                className: styles.floatingLabelFocusStyle,
                            }}
                            InputProps={{
                                className: styles.floatingValueFocusStyle,
                            }}
                        />
                        {!errors.role ? null : <span>{errors.role}</span>}
                        <br/>
                        <TextField
                            label='Address:'
                            name='address'
                            className={styles.textfield}
                            value={userToEdit.address}
                            onChange={onChangeHandler}
                            InputLabelProps={{
                                className: styles.floatingLabelFocusStyle,
                            }}
                            InputProps={{
                                className: styles.floatingValueFocusStyle,
                            }}
                            disabled
                        />
                        <br/>
                        <TextField
                            label='City:'
                            name='city'
                            className={styles.textfield}
                            value={userToEdit.city}
                            onChange={onChangeHandler}
                            InputLabelProps={{
                                className: styles.floatingLabelFocusStyle,
                            }}
                            InputProps={{
                                className: styles.floatingValueFocusStyle,
                            }}
                            disabled
                        />
                        <br/>
                        <TextField
                            label='Province:'
                            name='province'
                            className={styles.textfield}
                            value={userToEdit.province}
                            onChange={onChangeHandler}
                            InputLabelProps={{
                                className: styles.floatingLabelFocusStyle,
                            }}
                            InputProps={{
                                className: styles.floatingValueFocusStyle,
                            }}
                            disabled
                        />
                        <br/>
                        <TextField
                            label='Postal Code:'
                            name='cp'
                            className={styles.textfield}
                            value={userToEdit.postalCode}
                            onChange={onChangeHandler}
                            InputLabelProps={{
                                className: styles.floatingLabelFocusStyle,
                            }}
                            InputProps={{
                                className: styles.floatingValueFocusStyle,
                            }}
                            disabled
                        />
                        <br/>
                        <TextField
                            label='Floor:'
                            name='floor'
                            className={styles.textfield}
                            value={userToEdit.floor}
                            onChange={onChangeHandler}
                            InputLabelProps={{
                                className: styles.floatingLabelFocusStyle,
                            }}
                            InputProps={{
                                className: styles.floatingValueFocusStyle,
                            }}
                            disabled
                        />
                        <br />
                        <div className={Style.allbtnsallusers} >
                            <button className={Style.btnallusers} type="submit" >Update</button>
                            <button className={Style.btnallusers} value={userToEdit.id} onClick={deleteUserHandler}>Delete User</button>
                            <button className={Style.btnallusers} onClick={()=>setShowModal(!showModal)} >Cancel</button>
                        </div>
                    </form>
                </Modal>
                :null
        }    
        
        </>
        
    )
};

export default AllUsers;