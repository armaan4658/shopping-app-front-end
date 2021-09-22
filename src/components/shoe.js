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
    let data;
    res.length > 0 ? data = res : data = shoe
    const history = useHistory();
    const openProduct = (s) => {
        history.push(`/product/${s._id}`);
    }
    return(
        <>
            <h1 style={{paddingLeft:'5%',fontFamily:'Crimson Text,serif'}}>Shoes</h1>
            <Grid style={{
                display:'flex',
                flexWrap:'wrap',
                gap:"50px",
                justifyContent:'center',
                borderTop:'5px solid black',
                paddingTop:'2%'
            }}>
               {data.map(s=>(
                   <Grid item xs={11} sm={6} md={4} lg={3} xl={3} key={s._id}>
                       <Paper 
                       className="products"
                       elevation={5}
                       onClick={()=>openProduct(s)}
                       >
                            <div>
                                <img alt="" width="300" height="350" src={s.thumbnail}/>
                            </div>
                            <h4>{s.name}</h4>
                            <h4>price: {s.price}</h4>
                       </Paper>
                   </Grid>
               ))}
            </Grid>
        </>
    )
}