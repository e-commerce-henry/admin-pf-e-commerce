import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteSaleBanner, getSaleBanner } from "../../../redux/actions";
import Style from './BannerProducts.module.css'


export default function BannerItems (){
    const dispatch = useDispatch();
    const saleBanner = useSelector(state => state.saleBanner);
    console.log(saleBanner)

   useEffect(()=>{
       dispatch(getSaleBanner());
   }, [dispatch])

   const onClick = (e)=>{
       console.log(e.target.value)
       dispatch(deleteSaleBanner(e.target.value))
   }
    return(
        <>
            <table className={Style.container}>
                <tbody>
                    <tr className={Style.subcontainer}>
                        <th>Sku</th>
                        <th>Name</th>
                        <th>Discount (%)</th>
                    </tr>
                    {
                        saleBanner
                            ? saleBanner.map(e => {
                            return ( 
                                <tr className={Style.subcontainer} key={e.id}>
                                    <td>{e.productId}</td>
                                    <td>{e.name}</td>
                                    <td>{e.discount}</td>
                                    <td><button value={e.id} onClick={onClick}>X</button></td>
                                </tr>
                            )
                            })
                            : null   
                    }       
                </tbody>


            </table>            
        </>

    )
}