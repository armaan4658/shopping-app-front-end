import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import {  useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { TableHead } from '@material-ui/core';
import axios from 'axios' ;
import {GetCartSize} from '../App.js';
export const CartComponent = ({open,handleClose,loading,cartData,cartSetOpen}) => {

    const getCartSize = useContext(GetCartSize);

    const [maxWidth,setMaxWidth] = useState('');
    const  history = useHistory();

    const iW = window.innerWidth;
    const checkWidth = () => {
        if(iW > 300 && iW < 500){
            setMaxWidth('xs');
        }
        else if(iW > 500 && iW < 800){
            setMaxWidth('sm');
        }
        else if(iW > 810 && iW < 1050){
            setMaxWidth('md')
        }
        else if(iW > 1050 && iW < 1450){
            setMaxWidth('lg')
        }
        else if(iW > 1500 && iW < 2600){
            setMaxWidth('xl')
        }
    }
    const useEfe = () => {
        checkWidth();
    }
    try{
        useEffect(useEfe,[]);
    }catch(e){
        console.log(e);
    }
    return (
        <>
            <Dialog
            fullWidth={true}
            maxWidth={maxWidth}
            open={open} onClose={handleClose}
            >
                <DialogTitle>Cart</DialogTitle>
                <DialogContent>
                  {loading ? 
                    cartData.length > 0 ? 
                        (
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell></TableCell>
                                        <TableCell>Name</TableCell>
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
                                                <>
                                                {k!=="thumbnail" && k!=="id"?(
                                                    <TableCell>
                                                        {d[k]}
                                                    </TableCell>
                                                ):''}
                                                </>
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
                        )
                     : (
                        <DialogContentText>Cart is empty</DialogContentText>
                    )
                  : (
                      <DialogContentText>Cart is empty </DialogContentText>
                  )}
                </DialogContent>
                <DialogActions>
                    <Button
                    onClick={()=>{
                        const dummy = {
                            cart : []
                        }
                        axios.patch(`https://scclulc5e3.execute-api.us-east-2.amazonaws.com/dev/user/deletecart/${localStorage.getItem("id")}`,dummy,{withCredentials:true})
                        .then(res=>{
                            if(res.data.message==="green"){
                                getCartSize();
                                cartSetOpen(false);
                            }
                        })
                    }}
                    >Remove all</Button>
                    <Button
                    onClick={()=>{
                        history.push('/placeorder');
                        cartSetOpen(false);
                    }}
                    >Check out</Button>
                    <Button onClick={handleClose}>Add more</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}