import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { createCategory } from "../../redux/actions";
import Style from './Category.module.css'

export default function Category(){
    const dispatch = useDispatch()

/*     useEffect(() =>{
        dispatch(createCategory())
    },[]) */

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
        dispatch(createCategory(newCategory))

        alert(`Category ${newCategory.name} create`)
        setCategory({
            name: ''
        })
        document.getElementById("myForm").reset();
    }

    return(
        <div className={Style.container}>
            <h1>Category</h1>
            <form id ="myForm" onSubmit={e => submitCategory(e)}>

                <div>
                    <label type="text">Category name </label>
                    <input type='text' name='name' onChange={e => onChange(e)}/>
                </div>

                <div>
                    <button type='submit'>Create category </button>
                </div>

            </form>
        </div>
    )
};