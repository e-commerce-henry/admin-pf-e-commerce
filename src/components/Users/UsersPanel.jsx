import { useState } from 'react'
import Style from './UsersPanel.module.css';
import AllUsers from './AllUsers/AllUsers';
import { useDispatch } from 'react-redux';
import { addUser } from '../../redux/actions';
import useAuth from '../../hooks/useAuth';



const validate = (newUser)=>{
    const errors = {}

    if(!newUser.name){errors.name = 'Name is required'}
    else if(!/^(?![\s.]+$)[a-zA-Z\s]*$/g.test(newUser.name)){
            errors.name = 'Name is invalid - Only letters are valid'
        }
    if(!newUser.surname){errors.surname = 'Surname is required'}
    else if(!/^(?![\s.]+$)[a-zA-Z\s]*$/g.test(newUser.surname)){
            errors.surname = 'Surname is invalid - Only letters are valid'
        }
    if(!newUser.email){errors.email = 'Email is required'}
    else if(!/\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi.test(newUser.email)){
            errors.email = 'Email is invalid'
        } 
    if(!newUser.address){errors.address = 'Address is required'}
    else if(!/^[A-Za-z0-9\s]+$/gi.test(newUser.address)){
            errors.address = 'Address is invalid - Only letters and numbers are valid'
        };
    if(!newUser.cp){errors.cp = 'Postal Code is required'}
    else if(!/^[A-Za-z0-9\s]+$/gi.test(newUser.cp)){
            errors.cp = 'Postal Code is invalid - Only letters and numbers are valid'
        }
    if(!newUser.city){errors.city = 'City is required'}
    else if(!/^(?![\s.]+$)[a-zA-Z\s]*$/g.test(newUser.city)){
        errors.city = 'City is invalid - Only letters are valid'
    }
    if(!newUser.province){errors.province = 'Province is required'}
    else if(!/^(?![\s.]+$)[a-zA-Z\s]*$/g.test(newUser.province)){
        errors.province = 'Province is invalid - Only letters are valid'
    }
    return errors
}



export default function UsersPanel(){
    const {auth} = useAuth();
    const dispatch = useDispatch();
    const [newUser, setNewUser] = useState({
        name: '',
        surname: '',
        email: '',
        pwd: '',
        address: '',
        cp: '',
        city: '',
        province: '',
        floor: '',
        role: 'user'
    });

    const [errors, setErrors] = useState('');

    const onChangeHandler = (e)=>{
        setNewUser({
            ...newUser,
            [e.target.name] : e.target.value
        })
        setErrors(validate({
            ...newUser,
            [e.target.name] : e.target.value
        }))
    }
    
    const submitCreateUser = (e) =>{
        e.preventDefault();
        if(Object.keys(errors).length === 0){
            dispatch(addUser(newUser, auth));
            setNewUser({
                name: '',
                surname: '',
                email: '',
                pwd: '',
                address: '',
                cp: '',
                city: '',
                province: '',
                floor: '',
                role: 'user'
            })
        }
    }
    
    return(
        <div className={Style.container}>
            <form id ="UsersForm" onSubmit={e => submitCreateUser(e)}>
                <h2>Create new user</h2>

                <div>
                    <label type="text">Name </label>
                    <input type='text' name='name' value={newUser.name} onChange={onChangeHandler} required/>
                    {!errors.name ? null : <span className={Style.error}>{errors.name}</span>}
                </div>
                <div>
                    <label type="text">Surname </label>
                    <input type='text' name='surname' value={newUser.surname} onChange={onChangeHandler} required/>
                    {!errors.surname ? null : <span className={Style.error}>{errors.surname}</span>}
                </div>
                <div>
                    <label type="text">Email</label>
                    <input type='email' name='email' value={newUser.email} onChange={onChangeHandler} required/>
                    {!errors.email ? null : <span className={Style.error}>{errors.email}</span>}
                </div>
                <div>
                    <label type="text">Password</label>
                    <input type='password' name='pwd' value={newUser.pwd} onChange={onChangeHandler} required/>
                </div>
                <div>
                    <label type="text">Address </label>
                    <input type='text' name='address' value={newUser.address} onChange={onChangeHandler} required/>
                    {!errors.address ? null : <span className={Style.error}>{errors.address}</span>}
                </div>
                <div>
                    <label type="text">Postal Code </label>
                    <input type='text' name='cp' value={newUser.cp} onChange={onChangeHandler} required/>
                    {!errors.cp ? null : <span className={Style.error}>{errors.cp}</span>}
                </div>
                <div>
                    <label type="text">City</label>
                    <input type='text' name='city' value={newUser.city} onChange={onChangeHandler} required/>
                    {!errors.city ? null : <span className={Style.error}>{errors.city}</span>}
                </div>
                <div>
                    <label type="text">Province</label>
                    <input type='text' name='province' value={newUser.province} onChange={onChangeHandler} required/>
                    {!errors.province ? null : <span className={Style.error}>{errors.province}</span>}
                </div>
                <div>
                    <label type="text">Floor</label>
                    <input type='text' name='floor' value={newUser.floor} onChange={onChangeHandler}/>
                </div>
                <div >
                    <h4>Role:</h4>
                    <div className={Style.radioBtn}>
                        <label htmlFor='user' type="text">
                            <input type='radio' id='user' name='role' value='user' checked={newUser.role === 'user'} onChange={onChangeHandler} required/>
                            User
                        </label>
                        
                        <label htmlFor='admin' type="text">
                            <input type='radio' id='admin' name='role' value='admin' checked={newUser.role === 'admin'} onChange={onChangeHandler} required/>
                            Admin
                        </label>
                    </div>
                </div>
                <div>
                    <button className={Style.createuser} type='submit'>Create User</button>
                </div>
                { errors && Object.keys(errors).length > 0 
                    ? <span className={Style.error}>No se puede enviar formulario vacio o con errores</span>
                    : null
                }
            </form>
            <div className={Style.allUsers}>
                <h1>Users</h1>
                <AllUsers/>
            </div>
        </div>
    )
};