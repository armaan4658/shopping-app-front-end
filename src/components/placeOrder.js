import { Table } from '@material-ui/core'
import { TableHead } from '@material-ui/core'
import { TableBody } from '@material-ui/core'
import { Grid } from '@material-ui/core'
import { TableRow,TableCell } from '@material-ui/core'
import { Paper } from '@material-ui/core'
import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import { Redirect, useHistory } from 'react-router'
import * as Yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import {useForm} from 'react-hook-form';
import { TextField } from '@material-ui/core'
import { Button } from '@material-ui/core'
import { FormControl } from '@material-ui/core'
import { FormControlLabel } from '@material-ui/core'
import { RadioGroup } from '@material-ui/core'
import { FormLabel } from '@material-ui/core'
import { Radio } from '@material-ui/core'
import { styled } from '@mui/material/styles';
import {GetCartSize} from '../App.js';
export const PlaceOrder = () => {
    const [cartData,setCartData] = useState([])
    const [loading,setLoading] = useState(false)
    const getCartSize = useContext(GetCartSize)
    const getCart = () => {
        axios.get(`https://scclulc5e3.execute-api.us-east-2.amazonaws.com/dev/user/get/${localStorage.getItem("id")}`,{withCredentials:true})
        .then(res=>{
            if(res.status===200){
                setCartData(res.data.cart);
                setLoading(true)
            }
        })
    }
    try{
        useEffect(getCart,[]);
    }catch(e){
        console.log(e);
    }
    const validationSchema = Yup.object().shape({
        address:Yup.string().required('Enter your address'),
        no:Yup.number().required('Enter your contact no')
    })
    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm({resolver:yupResolver(validationSchema)})
    const history = useHistory();
    const onSubmit = (data) => {
        const {address,no} = data;
        const body = {
            userId:localStorage.getItem("id"),
            address,
            items:cartData,
            payment:'cash',
            no
        }
        axios.post(`https://scclulc5e3.execute-api.us-east-2.amazonaws.com/dev/order/add`,body,{withCredentials:true})
        .then(res=>{
            if(res.status===200){
                axios.patch(`https://scclulc5e3.execute-api.us-east-2.amazonaws.com/dev/user/deletecart/${localStorage.getItem("id")}`,{
                    cart:[]
                },{withCredentials:true})
                .then(res=>{
                    if(res.status===200){
                        getCartSize();
                    }
                })
                .catch(res=>console.log(res))
                window.alert('Order placed successfully')
                history.push('/');

            }
        })
    }
    const BpIcon = styled('span')(({ theme }) => ({
        borderRadius: '50%',
        width: 16,
        height: 16,
        boxShadow:
          theme.palette.mode === 'dark'
            ? '0 0 0 1px rgb(16 22 26 / 40%)'
            : 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
        backgroundColor: theme.palette.mode === 'dark' ? '#394b59' : '#f5f8fa',
        backgroundImage:
          theme.palette.mode === 'dark'
            ? 'linear-gradient(180deg,hsla(0,0%,100%,.05),hsla(0,0%,100%,0))'
            : 'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
        '.Mui-focusVisible &': {
          outline: '2px auto rgba(19,124,189,.6)',
          outlineOffset: 2,
        },
        'input:hover ~ &': {
          backgroundColor: theme.palette.mode === 'dark' ? '#30404d' : '#ebf1f5',
        },
        'input:disabled ~ &': {
          boxShadow: 'none',
          background:
            theme.palette.mode === 'dark' ? 'rgba(57,75,89,.5)' : 'rgba(206,217,224,.5)',
        },
      }));
      
      const BpCheckedIcon = styled(BpIcon)({
        backgroundColor: '#137cbd',
        backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
        '&:before': {
          display: 'block',
          width: 16,
          height: 16,
          backgroundImage: 'radial-gradient(#fff,#fff 28%,transparent 32%)',
          content: '""',
        },
        'input:hover ~ &': {
          backgroundColor: '#106ba3',
        },
      });
      
      // Inspired by blueprintjs
      function BpRadio(props) {
        return (
          <Radio
            sx={{
              '&:hover': {
                bgcolor: 'transparent',
              },
            }}
            disableRipple
            color="default"
            checkedIcon={<BpCheckedIcon />}
            icon={<BpIcon />}
            {...props}
          />
        );
      }
      
    return(
        <>
            <h1 style={{paddingLeft:'5%',fontFamily:'Crimson Text,serif'}}>Place order</h1>
            {loading ? 
                cartData.length > 0 ? (
                    <Grid 
                    style={{
                        display:window.innerWidth > 500 ? 'flex': 'grid',
                        gap:'10px',
                        justifyContent:'center'}}
                    >
                        <Grid item xs={12} sm={8} md={6} lg={6} xl={6}>
                            <Paper>
                                <Table sx={{ minWidth: 700 }}>
                                    <TableHead>
                                        <TableRow >
                                            <TableCell></TableCell>
                                            <TableCell></TableCell>
                                            <TableCell>Price</TableCell>
                                            <TableCell>Color</TableCell>
                                            <TableCell>Size</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {cartData.map(d=>(
                                            <TableRow>
                                                <TableCell>
                                                    <img alt="" src={d.thumbnail} width="70px" height="70px"/>
                                                </TableCell>
                                                {Object.keys(d).map(k=>(
                                                    k!=="thumbnail" && k!=="id" ? (
                                                        <TableCell> {d[k]} </TableCell>
                                                    ) : ''
                                                ))}
                                            </TableRow>
                                        ))}
                                        <TableRow>
                                                <TableCell>Total</TableCell>
                                                <TableCell align="right">
                                                    Rs :{' '}
                                                        {
                                                            cartData.reduce((total,val)=>{
                                                                return total+parseInt(val.price);
                                                            },0)
                                                        }
                                                </TableCell>
                                            </TableRow>
                                    </TableBody>
                                </Table>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
                            <form 
                            onSubmit={handleSubmit(onSubmit)}
                            style={{
                                display:'grid',
                                rowGap:'10px'
                            }}
                            >
                                <div>
                                    <TextField
                                    variant="filled"
                                    color="primary"
                                    {...register("address")}
                                    label="Enter your address"
                                    fullWidth
                                    multiline={true}
                                    minRows="5"
                                    />
                                    {errors.address && (<p>{errors.address.message}</p>)}
                                </div>
                                <div>
                                    <TextField 
                                    variant="filled"
                                    color="primmary"
                                    {...register("no")}
                                    label="Enter your contact no"
                                    type="number"
                                    />
                                    {errors.no && (<p>{errors.no.message}</p>)}
                                </div>
                                <div>
                                    <Button
                                    type="submit"
                                    variant="outlined"
                                    color="default"
                                    id="order-btn"
                                    style={{
                                        backgroundColor:'grey',
                                        color:'black',
                                        fontWeight:'bold'
                                    }}
                                    >Place order</Button>
                                </div>
                                <div>
                                <FormControl component="fieldset">
                                    <FormLabel component="legend">Payment method</FormLabel>
                                    <RadioGroup defaultValue="cash" aria-label="gender" name="customized-radios">
                                      <FormControlLabel value="cash" control={<BpRadio />} label="cash on delivery" />
                                      <FormControlLabel
                                        value="disabled"
                                        disabled
                                        control={<BpRadio />}
                                        label="Debit card"
                                      />
                                      <FormControlLabel
                                        value="disabled"
                                        disabled
                                        control={<BpRadio />}
                                        label="Credit card"
                                      />
                                    </RadioGroup>
                                </FormControl>
                                </div>
                            </form>
                        </Grid>
                    </Grid>
                ) : (
                    <Redirect to ='/'/>
                )
            : ''}
        </>
    )
}