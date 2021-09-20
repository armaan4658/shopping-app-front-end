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
import LinearProgress from '@material-ui/core/LinearProgress';
import { useState } from 'react';
export const SignUpComponent = ({open,handleClose}) => {
    const validationSchema = Yup.object().shape({
      firstName: Yup.string().required('Enter your first name'),
      lastName: Yup.string().required('Enter your last name'),
      email : Yup.string().email('Enter a valid email').required('Enter your email'),
      password:Yup.string().required('Password is required'),
        confirmPassword:Yup.string().oneOf(
            [Yup.ref("password"), null],
            "Password must match"
          )
    })
    const {
      register,
      handleSubmit,
      formState: {errors}
    } = useForm({resolver:yupResolver(validationSchema)});
    const [loading,setLoading] = useState(false);
    const onSubmit = (data) => {
        setLoading(true);
        axios.post(`https://scclulc5e3.execute-api.us-east-2.amazonaws.com/dev/user/signup`,data)
        .then(res=>{
          if(res.status===200){
            setLoading(false);
            handleClose();
          }
        })
    }
    return(
        <>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
              {loading ? <LinearProgress/>:''}
              <DialogTitle id="form-dialog-title">Sign up</DialogTitle>
              <form onSubmit={handleSubmit(onSubmit)}>
                  <DialogContent>
                    <TextField
                      autoFocus
                      margin="dense"
                      id="name"
                      label="first name"
                      fullWidth
                      {...register("firstName")}
                    />
                    {errors.firstName && (<p> {errors.firstName.message} </p>)}
                    <TextField
                      autoFocus
                      margin="dense"
                      id="name"
                      label="last name"
                      fullWidth
                      {...register("lastName")}
                    />
                    {errors.lastName && (<p> {errors.lastName.message} </p>)}
                    <TextField
                      autoFocus
                      margin="dense"
                      id="name"
                      label="Enter your email"
                      type="email"
                      fullWidth
                      {...register("email")}
                    />
                    {errors.email && (<p> {errors.email.message} </p>)}
                    <TextField
                      autoFocus
                      margin="dense"
                      id="name"
                      label="Password"
                      type="password"
                      fullWidth
                      {...register("password")}
                    />
                    {errors.password && (<p> {errors.password.message} </p>)}
                    <TextField
                      autoFocus
                      margin="dense"
                      id="name"
                      label="Confirm password"
                      type="password"
                      fullWidth
                      {...register("confirmPassword")}
                    />
                    {errors.confirmPassword && (<p> {errors.confirmPassword.message} </p>)}
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose} color="primary">
                      Already a user ? Login 
                    </Button>
                    <Button type="submit" color="primary">
                      Sign up
                    </Button>
                  </DialogActions>
                </form>
            </Dialog>
        </>
    )
}