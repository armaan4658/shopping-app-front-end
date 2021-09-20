import { Paper } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import axios from "axios"
import {Res} from '../App.js';
import { useContext, useEffect, useState } from "react"
import { useHistory } from "react-router";
export const Home = () => {
    const res = useContext(Res);
    const [shoe,setShoe] = useState([]);
    const [wallet,setWallet] = useState([]);
    const history = useHistory();
    const getData = () => {
        axios.get('https://scclulc5e3.execute-api.us-east-2.amazonaws.com/dev/product/home?category=wallet&limit=4')
        .then(res=>{
            if(res.status===200){
                setWallet(res.data);
            }
        })
        .catch(res=>console.log(res))
        axios.get('https://scclulc5e3.execute-api.us-east-2.amazonaws.com/dev/product/home?category=shoe&limit=4')
        .then(res=>{
            if(res.status===200){
                setShoe(res.data);
            }
        })
        .catch(res=>console.log(res))
    }
    try{
        useEffect(getData,[])
    }catch(e){
        console.log(e);
    }
    const gridStyle = {
        display:'flex',
        flexWrap:'wrap',
        borderTop:'5px solid black',
        padding:window.innerWidth<500?'3% 0 0 23%':'3% 0 0 5%'
    }
    let data;
    res.length > 0 ? data = res : data = [...shoe,...wallet] ;
    const openProduct = (s) => {
        history.push(`/product/${s._id}`);
    }
    return(
        <>
           <Grid style={gridStyle}>
               {data.map(s=>(
                   <Grid item xs={12} sm={6} md={4} lg={3} key={s._id}>
                       <Paper onClick={()=>openProduct(s)} style={{width:'250px',textAlign:'center',cursor:'pointer'}}>
                           <img src ={s.thumbnail} alt="" width="250px" height="250px"/>
                            <h4>{s.name}</h4>
                            <h3>price: {s.price}</h3>
                       </Paper>
                   </Grid>
               ))}
           </Grid>
        </>
    )
}