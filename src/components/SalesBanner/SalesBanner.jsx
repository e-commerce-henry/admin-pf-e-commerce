import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import useAuth from "../../hooks/useAuth";
import { getProducts, postSaleBanner } from "../../redux/actions";
import BannerItems from "./BannerProducts/BannerProducts";
import Style from './SalesBanner.module.css'


const validate = (newSaleItem)=>{
    const errors = {};

    if(!newSaleItem.productId){errors.productId = 'Product Name is required'}

    if(!newSaleItem.discount){errors.discount = 'A discount value is required'}
    else if(!/^[1-9][0-9]?$|^100$/g.test(newSaleItem.discount)){
        errors.discount = 'Invalid Discount - only round numbers between 1-100 are valid'
    }
    return errors;
}


export default function SalesBanner(){
    const dispatch = useDispatch();
    const {auth} = useAuth()
    const products = useSelector(state => state.products);
    const [newSaleItem, setNewSaleItem] = useState({
        productId: '',
        discount: '',
    })
    const [errors, setErrors]=useState('');

    useEffect(()=>{
        dispatch(getProducts())
    }, [dispatch])
   
    const onChange = (e)=>{
        setNewSaleItem({
           ...newSaleItem,
            [e.target.name] : e.target.value
        })
        setErrors(validate({
            ...newSaleItem,
            [e.target.name] : e.target.value
        }))
    };
   

    const submitDiscountedItem = (e) =>{
        e.preventDefault();
        if(Object.keys(errors).length === 0){
            const saleItem ={
                productId: newSaleItem.productId,
                discount: newSaleItem.discount,
            }
            dispatch(postSaleBanner(saleItem, auth));
            setNewSaleItem({
                discount: '',
                productId: '',
            })
            document.getElementById("SalesForm").reset();
        }
    }


    return(
        
        <div className={Style.container}>
            
            <form id ="SalesForm" onSubmit={submitDiscountedItem}>
                <h2>Set a discounted Product</h2>

                <div>
                    <label type="text">Product name </label>
                    <select className={Style.selp} onChange={onChange} name="productId">
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
                    {!errors.productId ? null : <span className={Style.error}>{errors.productId}</span>}
                </div>
                
                <div>
                    <label type="text">Discount (%) </label>
                    <input type='text' placeholder="insert a percentage" required name='discount' value={newSaleItem.discount} onChange={onChange}/>
                    {!errors.discount ? null : <span className={Style.error}>{errors.discount}</span>}
                </div>

                <div>
                    <button className={Style.agregarsalebanner} type='submit'>Agregar producto a SaleBanner </button>
                </div>
                { errors && Object.keys(errors).length > 0 
                    ? <span className={Style.error}>No se puede enviar formulario vacio o con errores</span>
                    : null
                }
            </form>
            <div className={Style.saleItems}>
                <h1>Sale Banner</h1>
                <BannerItems/>
            </div>
        </div>
        
    )
};