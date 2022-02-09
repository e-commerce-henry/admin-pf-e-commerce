import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { createCategory } from "../../redux/actions";
import { getCategorys } from "../../redux/actions";
import Categories from "./CategoryList";
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

    const [errors, setErrors] = useState('');

    const validate = (newCategory)=>{
        const errors = {}

        if(!newCategory.name){errors.name = 'Name is required'}
        else if(!/^(?![\s.]+$)[a-zA-Z\s]*$/g.test(newCategory.name)){
            errors.name = 'Name is invalid - Only letters are valid'
        }
        return errors
    }

    function onChange(e){
        setCategory({
            ...newCategory,
            name: e.target.value
        })
        setErrors(validate({
            ...newCategory,
            name: e.target.value
        }))
    }

    function submitCategory(e){
        e.preventDefault();
        if(Object.keys(errors).length === 0){
            dispatch(createCategory(newCategory, auth))

            setCategory({
                name: ''
            })
        }
        
    }

    return(

        <div className={Style.container}>
            
            <form id ="myForm" onSubmit={submitCategory}>
                <h2>Create a Category</h2>

                <div>
                    <label type="text" >Category name</label>
                    <input type='text' name='name' required onChange={onChange}/>
                    {!errors.name ? null : <span className={Style.error}>{errors.name}</span>}
                </div>

                <div>
                    <button className={Style.crearcategoria} type='submit'>Create</button>
                </div>
                { errors && Object.keys(errors).length > 0 
                    ? <span className={Style.error}>No se puede enviar formulario vacio o con errores</span>
                    : null
                }

            </form>
            <div className={Style.categories}>
                <h1>Categories</h1>
                <Categories/>
            </div>
        </div>








        // <div className={Style.container}>
        //     <h1>Category</h1>
        //     <form id ="myForm" onSubmit={submitCategory}>

        //         <div>
        //             <label type="text">Category name </label>
        //             <input type='text' name='name' onChange={onChange}/>
        //         </div>

        //         <div>
        //             <button type='submit'>Create category </button>
        //         </div>

        //     </form>
        //     <div>
        //         <h2>List Category</h2>
        //         {   categorys 
        //             ?categorys.map(category =>{
        //                 const {id, name} = category
        //                 return(
        //                     <div key={id} >{name}</div> 
        //                 )
                         
        //             })
        //             :null
                    
        //         }
        //     </div>
        // </div>
    )
};