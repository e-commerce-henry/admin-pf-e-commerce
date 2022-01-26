import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getProducts, getSaleBanner, postSaleBanner } from "../../redux/actions";
import BannerItems from "./BannerProducts/BannerProducts";
import Style from './SalesBanner.module.css'

export default function SalesBanner(){
    const dispatch = useDispatch();
    const products = useSelector(state => state.products);
    const [newSaleItem, setNewSaleItem] = useState({
        productId: '',
        discount: '',
    })

    useEffect(()=>{
        dispatch(getProducts())
    }, [dispatch])
   
    const onChange = (e)=>{
        console.log(e.target.value)
        setNewSaleItem({
           ...newSaleItem,
            [e.target.name] : e.target.value
        })
    };
   

    const submitDiscountedItem = (e) =>{
        e.preventDefault();
        const saleItem ={
            productId: newSaleItem.productId,
            discount: newSaleItem.discount,
        }
        dispatch(postSaleBanner(saleItem));
        setNewSaleItem({
            discount: '',
            productId: '',
        })
        
        
    }


    return(
        
        <div className={Style.container}>
            
            <form id ="SalesForm" onSubmit={e => submitDiscountedItem(e)}>
                <h2>Set a discounted Product</h2>

                <div>
                    <label type="text">Product name </label>
                    <select onChange={onChange} name="productId">
                        <option hidden>Select product:</option>
                        {
                            products? products.map( e => {
                                const {id, name} = e
                                return (
                                    <option value={id} key={id}>{`${id} - ${name}`}</option>
                                )
                            }): null
                        }
                    </select>
                </div>
                
                <div>
                    <label type="text">Discount (%) </label>
                    <input type='text' placeholder="insert a percentage" name='discount' value={newSaleItem.discount} onChange={onChange}/>
                </div>

                <div>
                    <button type='submit'>Agregar producto a SaleBanner </button>
                </div>



            </form>
            <div className={Style.saleItems}>
                <h1>Sale Banner</h1>
                <BannerItems/>
            </div>
        </div>
        
    )
};