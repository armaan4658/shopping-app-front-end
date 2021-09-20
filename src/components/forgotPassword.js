import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import {Link as Connect} from "react-router-dom";
import LinearProgress from '@material-ui/core/LinearProgress';
import {useState} from 'react';
import axios from "axios";

export function ForgotPassword(){
    const validationSchema = Yup.object().shape({
        email:Yup.string().required('Email is required')
    });
    const{
        register,
        handleSubmit,
        formState: {errors}
    } = useForm({resolver:yupResolver(validationSchema)});
    const [loading,setLoading] = useState("none");
    const [msg,setMsg] = useState("");
    const onSubmit = (data) =>{
        setLoading("block");
        axios.get(`https://scclulc5e3.execute-api.us-east-2.amazonaws.com/dev/user/passwordreset/${data.email}`)
        .then(res=>{
            if(res.status===200){
                setMsg(res.data.message);
                setLoading("none");
            }
        })
        .catch(res=>console.log(res))
        // .then(res=>res.json())
        // .then(res=>setMsg(res.message))
        // .then(res=>setLoading("none"))
        // .catch(res=>console.log(res))
    }
    const hideMsg = () => {
        setTimeout(() => setMsg(""), 1000*10);
    }
    return(
        <div style={{display:'grid',placeItems:'center'}}>
            <Paper variant="outlined" id="forgotpassword">
                <form onSubmit={handleSubmit(onSubmit)} style={{display:'grid',gap:'10px'}} >
                    <span style={{display:loading}}> <LinearProgress/> </span>
                    <h1>Enter your email to get password reset link</h1>
                    <TextField {...register("email")}
                    type="email" 
                    id="outlined-basic" label="Enter your email" 
                    variant="outlined"/>
                    {errors.email && (
                        <span style={{ color: "crimson" }}> {errors.email.message} </span>
                    )}
                    <Button  type="submit" variant="contained" color="primary"> send password reset link </Button>
                    <Link>
                        <Connect to="/">
                        remember password ? Login
                        </Connect>
                    </Link>
                    {msg?(
                        msg==="green"?(
                            <p>password reset link has been sent to your email</p>
                        ):(
                            <p> {msg} </p>
                        )
                    ):""}
                    {msg?hideMsg():""}
                </form>
            </Paper>
        </div>
    )
}