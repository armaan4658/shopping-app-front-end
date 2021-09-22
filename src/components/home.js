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
    let data;
    res.length > 0 ? data = res : data = [...shoe,...wallet] ;
    const openProduct = (s) => {
        history.push(`/product/${s._id}`);
    }
    return(
        <>
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