import {TableComponent} from './table.js';
import axios from 'axios';
import { useEffect, useState } from 'react';
export const MyProfile = () => {
    const [data,setData] = useState([]);
    const [loading,setLoading] = useState(false);

    const getOrderData = () => {
        axios.get(`https://scclulc5e3.execute-api.us-east-2.amazonaws.com/dev/order/get/${localStorage.getItem("id")}?status=delivered`,{withCredentials:true})
        .then(res=>{
            if(res.status===200){
                setData(res.data);
                setLoading(true);
            }
        })
        .catch(res=>console.log(res))
    }
    try{
        useEffect(getOrderData,[]);
    }catch(e){
        console.log(e);
    }
    return(
        <>
            <h1 style={{paddingLeft:'5%',fontFamily:'Crimson Text,serif'}}>My profile</h1>
            <h3>Order details</h3>
            {loading ? 
                data.length > 0 ? (
                    <TableComponent data={data} />
                ) : 'No order to display'
            : ''}
        </>
    )
}