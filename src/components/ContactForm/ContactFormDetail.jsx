import { Modal, Card, CardContent } from "@material-ui/core";
import { useSelector } from "react-redux";
import Style from './ContactFormDetail.module.css'


const FormDetail = ({showDialogInfo, setShowDialogInfo})=>{
    const formById = useSelector(state=> state.formById);
    console.log(formById)
   
    return(
        
        <Modal className={Style.modal} open={showDialogInfo} onClose={()=>{setShowDialogInfo(!showDialogInfo)}} >
            <div>
            <Card variant="outlined" className={Style.card}>
                <CardContent className={Style.cardContent}>
                    <h2>Mensaje</h2>
                    <p>{formById.content}</p>
                </CardContent>
            </Card>
            </div>
            
        </Modal> 
                
        
    )
}

export default FormDetail;