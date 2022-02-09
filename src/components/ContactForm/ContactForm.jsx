import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getContactForms, getFormById, deleteContactForm } from "../../redux/actions";
import FormDetail from "./ContactFormDetail";
import Style from './ContactForm.module.css'
import useAuth from "../../hooks/useAuth";
import Pagination from "../Pagination/Pagination";


export default function ContactForm(){
    const dispatch = useDispatch();
    const {auth} = useAuth();
    const contactForms = useSelector(state => state.contactForms)
    const [showDialogInfo, setShowDialogInfo]= useState(false)


    useEffect(()=>{
        dispatch(getContactForms(auth));
    }, [dispatch])
    
  
    const onClickInfo = (e)=>{
        setShowDialogInfo(!showDialogInfo)
        dispatch(getFormById(e.target.value))
    }
    const onClickRemove = async(e)=>{
        dispatch(deleteContactForm(e.target.value, auth))
    }

    const numberPage =[];
    const [page, setPage] = useState(1);
    const msjsXpage =20;
    let paginas = Math.ceil(contactForms.length/msjsXpage);
        for (let i = 1; i <= paginas; i++) {
            numberPage.push(i);
        }
        const indexUltimo = page*msjsXpage;
        const indexInicio = indexUltimo - msjsXpage;
        const sliceMsjs = contactForms.slice(indexInicio, indexUltimo);


    return(
        <div className={Style.container}>
            <div className={Style.allForms}>
                <h1>Contact Forms</h1>
                <table className={Style.table}>
                    <tbody>
                        <tr className={Style.tableRow}>
                            <th>Id Form</th>
                            <th>Email</th>
                            <th>Name</th>
                            <th>Subject</th>
                            <th>Date</th>
                        </tr>
                        {
                            contactForms
                                ? sliceMsjs.map(e => {
                                return ( 
                                    <tr className={Style.tableRow} key={e.id}>
                                        <td>{e.id}</td>
                                        <td>{e.email}</td>
                                        <td>{e.name}</td>
                                        <td>{e.subject}</td>
                                        <td>{e.date}</td>
                                        <td><button className={Style.msgbtn} value={e.id} onClick={onClickInfo}>See Message</button></td>
                                        <td><button className={Style.xbtn} value={e.id} onClick={onClickRemove}>X</button></td>
                                    </tr>
                                )
                                })
                                : null   
                        }       
                    </tbody>
                </table>
                <Pagination
                    numberPage={numberPage}
                    page={page}
                    setPage={setPage}
                />         
                
                <div className={Style.detail}>
                    { showDialogInfo
                        ? <FormDetail setShowDialogInfo={setShowDialogInfo} showDialogInfo={showDialogInfo}/>
                        : null
                    }
                </div>
            </div>
        </div>
        
        
        
        
    )
};