import React from "react"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authUser } from "../../redux/actions"; 

export default function Auth(){
    const dispatch = useDispatch()
    const [user, setUser] = useState({
        email: '',
        pwd: ''
    })

    function onChange(e){
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    function submitUser(e){
        e.preventDefault();
        dispatch(authUser(user))
        
        setUser({
            email: '',
            pwd: ''
        })
        document.getElementById("myForm").reset();
    }

    return(
        <>
        <form id ="myForm" onSubmit={e => submitUser(e)}>
            <div>
                <label>Correo </label>
                <input type="text" name="email" onChange={e=> onChange(e)}/>
            </div>
            <div>
                <label>Contraseña </label>
                <input type="text" name="pwd" onChange={e=> onChange(e)}/>
            </div>
            <div>
                <button type='submit'>Enviar</button>
            </div>
        </form>
        </>
    )
}