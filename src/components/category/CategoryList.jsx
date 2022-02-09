import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getCategorys, deleteCategory } from "../../redux/actions";
import Pagination from "../Pagination/Pagination";
import useAuth from "../../hooks/useAuth";
import Style from './CategoryList.module.css'



export default function Categories(){
    const dispatch = useDispatch();
    const {auth} = useAuth();    
    const categories = useSelector(state => state.categorys)
    

    useEffect(() =>{
        dispatch(getCategorys())
    },[dispatch])

    //se comenta funcion de borrar categoria
    // const deleteCategoryHandler = (e)=>{
    //     dispatch(deleteCategory(e.target.value, auth))
    // };

    const numberPage =[];
    const [page, setPage] = useState(1);
    const categoriesXpage =10;
    let paginas = Math.ceil(categories.length/categoriesXpage);
        for (let i = 1; i <= paginas; i++) {
            numberPage.push(i);
        }
        const indexUltimo = page*categoriesXpage;
        const indexInicio = indexUltimo - categoriesXpage;
        const sliceCategories = categories.slice(indexInicio, indexUltimo);
    
    
    return(
        <>
            <table className={Style.container}>
                <tbody>
                    <tr>
                        <th>Category Id</th>
                        <th>Category Name</th>
                    </tr>
                   
                    {
                        categories   
                            ? sliceCategories.map(e => {
                                return(
                                    <tr className={Style.subcontainer} key={e.id}>
                                    <td>{e.id}</td>
                                    <td>{e.name}</td>

                                    {/* <td><button className={Style.btnx} value={e.id} onClick={deleteCategoryHandler}>X</button></td> */}

                                </tr>
                            )})
                             : null  
                            
                    }
                </tbody>
            </table>   
            <Pagination
                numberPage={numberPage}
                page={page}
                setPage={setPage}
            />         
        </>

    )
}