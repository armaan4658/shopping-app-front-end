import { useContext, useEffect, useState } from "react"
import axios from "axios";
import { Grid, Paper } from "@material-ui/core";
import {Res} from '../App.js';
import { useHistory } from "react-router";
export const Shoe = () => {
    const [shoe,setShoe] = useState([]);
    const res = useContext(Res);
    const getShoe = () => {
        axios.get('https://scclulc5e3.execute-api.us-east-2.amazonaws.com/dev/product/get?category=shoe')
        .then(res=>{
            if(res.status===200){
                setShoe(res.data);
            }
        })
        .catch(res=>console.log(res))
    }
    try{
        useEffect(getShoe,[])
    }catch(e){
        console.log(e)
    }
    const gridStyle = {
        display:'flex',
        flexWrap:'wrap',
        rowGap:'3%',
        borderTop:'5px solid black',
        padding:window.innerWidth<500?'3% 0 0 23%':'3% 0 0 5%'
    }
    let data;
    res.length > 0 ? data = res : data = shoe
    const history = useHistory();
    const openProduct = (s) => {
        history.push(`/product/${s._id}`);
    }
    return(
        <>
            <h1 style={{paddingLeft:'5%',fontFamily:'Crimson Text,serif'}}>Shoes</h1>
            <Grid style={gridStyle}>
               {data.map(s=>(
                   <Grid item xs={12} sm={6} md={4} lg={3} >
                       <Paper 
                       style={{
                           width:'250px',
                           textAlign:'center',
                           cursor:'pointer'
                        }}
                        onClick={()=>openProduct(s)}
                       >
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