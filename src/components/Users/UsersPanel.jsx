import { useState } from 'react'
import Style from './UsersPanel.module.css';
import AllUsers from './AllUsers/AllUsers';
import { useDispatch } from 'react-redux';
import { addUser } from '../../redux/actions';

export default function UsersPanel(){
    console.log('entra')
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
    })

    const onChangeHandler = (e)=>{
        setNewUser({
            ...newUser,
            [e.target.name] : e.target.value
        })
    }
    
    const submitCreateUser = (e) =>{
        e.preventDefault();
        dispatch(addUser(newUser));
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
    
    return(
        <div className={Style.container}>
            <form id ="UsersForm" onSubmit={e => submitCreateUser(e)}>
                <h2>Create new user</h2>

                <div>
                    <label type="text">Name </label>
                    <input type='text' name='name' value={newUser.name} onChange={onChangeHandler} required/>
                </div>
                <div>
                    <label type="text">Surname </label>
                    <input type='text' name='surname' value={newUser.surname} onChange={onChangeHandler} required/>
                </div>
                <div>
                    <label type="text">Email</label>
                    <input type='email' name='email' value={newUser.email} onChange={onChangeHandler} required/>
                </div>
                <div>
                    <label type="text">Password</label>
                    <input type='password' name='pwd' value={newUser.pwd} onChange={onChangeHandler} required/>
                </div>
                <div>
                    <label type="text">Address </label>
                    <input type='text' name='address' value={newUser.address} onChange={onChangeHandler} required/>
                </div>
                <div>
                    <label type="text">Postal Code </label>
                    <input type='text' name='cp' value={newUser.cp} onChange={onChangeHandler} required/>
                </div>
                <div>
                    <label type="text">City</label>
                    <input type='text' name='city' value={newUser.city} onChange={onChangeHandler} required/>
                </div>
                <div>
                    <label type="text">Province</label>
                    <input type='text' name='province' value={newUser.province} onChange={onChangeHandler} required/>
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
                    <button type='submit'>Create User</button>
                </div>
            </form>
            <div className={Style.allUsers}>
                <h1>Users</h1>
                <AllUsers/>
            </div>
        </div>
    )
};