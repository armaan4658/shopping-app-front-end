import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import axios from 'axios';
import {CheckLogin} from '../App.js'
import { useContext, useState } from 'react';
import { useHistory } from 'react-router';
import LinearProgress from '@material-ui/core/LinearProgress';
export const LoginComponent = ({open,handleClose}) => {
    const validationSchema = Yup.object().shape({
        email: Yup.string().email('Please enter a valid email').required('Please enter your email'),
        password: Yup.string().required('Please enter your password')
    })
    const{
        register,
        handleSubmit,
        formState : {errors}
    } = useForm({resolver:yupResolver(validationSchema)});
    const checkLogin = useContext(CheckLogin);
    const [loading,setLoading] = useState(false);
    const history = useHistory();
    const onSubmit = (data) => {
        setLoading(true);
        axios.post(`https://scclulc5e3.execute-api.us-east-2.amazonaws.com/dev/user/login`,data,{withCredentials:true})
        .then(res=>{
            if(res.status===200){
              setLoading(false);
                if(res.data.message==="green"){
                    localStorage.setItem("id",res.data._id);
                    checkLogin();
                    handleClose();
                }
            }
        })
        // handleClose();
    }
    return(
        <>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
              {loading ? <LinearProgress/>:''}
              <DialogTitle id="form-dialog-title">Login</DialogTitle>
              <form onSubmit={handleSubmit(onSubmit)}>
                <DialogContent>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Enter your email"
                    {...register('email')}
                    type="email"
                    fullWidth
                  />
                  {errors.email && (<p>{errors.email.message}</p>)}
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Password"
                    {...register('password')}
                    type="password"
                    fullWidth
                  />
                  {errors.password && (<p>{errors.password.message}</p>)}
                </DialogContent>
                <DialogActions>
                  <Button onClick={()=>{
                    history.push('/forgotpassword');
                    handleClose();
                  }} color="primary">
                    Forgot password?
                  </Button>
                  <Button
                   type="submit"
                   color="primary">
                    Login
                  </Button>
                </DialogActions>
                </form>
            </Dialog>
        </>
    )
}