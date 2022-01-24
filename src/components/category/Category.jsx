import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { createCategory } from "../../redux/actions";
import { getCategorys } from "../../redux/actions";
import Style from './Category.module.css';
//import validate from '../validate'; 

export default function Category(){
    const dispatch = useDispatch()
    const categorys = useSelector(state => state.categorys)

    useEffect(() =>{
        dispatch(getCategorys())
    },[])

   

    /*     useEffect(() =>{
        dispatch(createCategory())
    },[]) */

    const [newCategory, setCategory] = useState({
        name: ''
    })

     //creo un estado local para las validaciones. / las validaciones están comentadas hasta que las pueda probar
     //const [error, setError] = useState({})

    function onChange(e){
        setCategory({
            ...newCategory,
            name: e.target.value
        })
    }

    function submitCategory(e){
        e.preventDefault();
        //en caso de que no se ingresen datos // las validaciones están comentadas hasta que las pueda probar. 
        // setError(validate(error))
        // if(Object.keys(error).length !== 0){
        //   alert("Debe llenar todos los campos")
        // } else{

        dispatch(createCategory(newCategory))

        alert(`Category ${newCategory.name} create`)
        setCategory({
            name: ''
        })

        // setError(
        //     validate({
        //   ...newCategory,
        //   [e.target.name] : e.target.value,
        // }))

        document.getElementById("myForm").reset();
    //}
    }

    return(
        <div className={Style.container}>
{/*             <h1>Category</h1>
            <form id ="myForm" onSubmit={e => submitCategory(e)}>

                <div>
                    <label type="text">Category name </label>
                    <input type='text' name='name' onChange={e => onChange(e)}/>
                </div>

                <div>
                    <button type='submit'>Create category </button>
                </div>

            </form>
            <div>
                <h2>List Category</h2>
                {
                    categorys.map(category =>{
                        const {id, name} = category
                        return(
                            <div key={id} >{name}</div> 
                        )
                         
                    })
                }
            </div> */}
        </div>
    )
};