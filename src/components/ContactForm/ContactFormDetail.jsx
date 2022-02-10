import { Modal, Card, CardContent, TextField, Paper } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import Style from './ContactFormDetail.module.css'
import { makeStyles } from '@material-ui/core/styles'
import { useState } from "react";
import { sendAnswerEmail } from "../../redux/actions";
import useAuth from "../../hooks/useAuth";



const useStyles = makeStyles((theme)=>({
    modal:{
        position:'absolute',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        width:'40%',
        height:'95%',
        backgroundColor:'white',
        border:'none',
        boxShadow: '0px 0px 5px 1px #303841',
        padding: theme.spacing(0,4,0),
        top:'50%',
        left:'50%',
        transform:'translate(-50%,-50%)',
        borderRadius: '20px',
        color:'#FF5722',
        fontSize:'15px',
        fontFamily:'Lexend Deca',
    },
    textfield:{
        width:'100%',
        backgroundColor:'#eeeeee',
    },
    floatingLabelFocusStyle: {
        color: "#FF5722",
        fontFamily:'Lexend Deca',
        fontSize:'15px',
        resize:'none'
    },
    floatingValueFocusStyle: {
        color: "#303841",
        fontFamily:'Lexend Deca',
        fontSize:'15px',
        resize:'none'

    }
}))




const FormDetail = ({showDialogInfo, setShowDialogInfo})=>{
    const formById = useSelector(state=> state.formById);
    const styles = useStyles();
    const {auth} = useAuth();
    const dispatch = useDispatch();
    const { email, id, name } = formById;
    console.log(formById)
    const [answer, setAnswer] = useState('');
    const [error, setError] = useState('');

    const validate = (answer) =>{
        const errors = {};

        if(!answer){errors.answer = 'This field is required'}
        return errors;
    }

    const onChangeHandler = (e) =>{
        setAnswer(
            e.target.value
        )
        setError(validate(
            e.target.value
        ))
    }

    const onSubmitHandler = (e) =>{
        e.preventDefault();
        console.log(id)
        if(Object.keys(error).length === 0){
            dispatch(sendAnswerEmail({answer, id, email, name, auth}));
            setShowDialogInfo(!showDialogInfo)
            setAnswer('');
        }
    }
   
    return(
        
        <Modal className={Style.modal} open={showDialogInfo} onClose={()=>{setShowDialogInfo(!showDialogInfo)}} >
            <div className={Style.todocreo}>
                <Paper className={Style.paper}>
                    <Card variant="outlined" className={Style.card}>
                        <CardContent className={Style.cardContent}>
                            <h2>Received message</h2>
                            <textarea className={Style.msgg} disabled>{formById.content}</textarea>
                        </CardContent>
                    </Card>

                    <form  className={Style.form} onSubmit={onSubmitHandler}>
                        <TextField
                            id='filled-multiline-static'
                            label='Your answer'
                            multiline
                            rows={10}
                            variant="filled"
                            className={styles.textfield}
                            InputLabelProps={{
                                className: styles.floatingLabelFocusStyle
                            }}
                            InputProps={{
                                className: styles.floatingValueFocusStyle
                            }}
                            onChange={onChangeHandler}
                            value={answer}
                            name='answer'
                        />
                        {!error.answer ? null : <span>{error.answer}</span>}

                        <div className={Style.allbtnp} >
                            <button className={Style.btn1} type="submit" >Send</button>
                            <button className={Style.btn1} onClick={()=>setShowDialogInfo(!showDialogInfo)} >Cancel</button>
                        </div>
                    </form>

                    
                </Paper>
            
            </div>
            
        </Modal> 
                
        
    )
}

export default FormDetail;