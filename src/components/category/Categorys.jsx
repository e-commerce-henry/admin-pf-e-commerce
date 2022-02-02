import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { createCategory } from "../../redux/actions";
import { getCategorys } from "../../redux/actions";
import Style from './Category.module.css';
import useAuth from "../../hooks/useAuth";
//import validate from '../validate'; 

export default function Categorys(){
    const {auth} = useAuth();
    const dispatch = useDispatch()
    const categorys = useSelector(state => state.categorys)

    useEffect(() =>{
        dispatch(getCategorys())
    },[dispatch])

    const [newCategory, setCategory] = useState({
        name: ''
    })

    function onChange(e){
        setCategory({
            ...newCategory,
            name: e.target.value
        })
    }

    function submitCategory(e){
        e.preventDefault();

        dispatch(createCategory(newCategory, auth))

        setCategory({
            name: ''
        })

        // document.getElementById("myForm").reset();
    
    }

    return(
        <div className={Style.container}>
            <h1>Category</h1>
            <form id ="myForm" onSubmit={submitCategory}>

                <div>
                    <label type="text">Category name </label>
                    <input type='text' name='name' onChange={onChange}/>
                </div>

                <div>
                    <button type='submit'>Create category </button>
                </div>

            </form>
            <div>
                <h2>List Category</h2>
                {   categorys 
                    ?categorys.map(category =>{
                        const {id, name} = category
                        return(
                            <div key={id} >{name}</div> 
                        )
                         
                    })
                    :null
                    
                }
            </div>
        </div>
    )
};