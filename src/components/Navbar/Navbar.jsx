import Style from './Navbar.module.css'
import {Outlet, useNavigate} from 'react-router-dom'
export default function Navbar(){
    const navigate = useNavigate();
    function HandleClick(e){
        navigate(`/home/${e.target.value}`);
    };

    return(
        <>
        <div className={Style.container}>
            <h1>ADMIN E- COMMERCE</h1>
            <div>
                <button type='button' value='Users' onClick={(e) =>HandleClick(e)}>Users</button>
                <button type='button' value='Inventory' onClick={(e) =>HandleClick(e)}>Inventory</button>
                <button type='button' value='Orders' onClick={(e) =>HandleClick(e)}>Orders</button>
                <button type='button' value='Category' onClick={(e) =>HandleClick(e)}>Category</button>
                <button type='button' value='SalesBanner' onClick={(e) =>HandleClick(e)}>Sales Banner</button>
            </div>
        </div>
        <Outlet/>
        </>
        
    )
}