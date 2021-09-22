import { useParams } from "react-router"
import axios from 'axios';
import { useContext, useEffect, useState } from "react";
import { Button } from "@material-ui/core";
import { Grid , Paper} from "@material-ui/core";
import { MenuItem } from "@material-ui/core";
import { FormControl } from "@material-ui/core";
import { InputLabel } from "@material-ui/core";
import { Select } from "@material-ui/core";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import {IsLoginContext,GetCartSize} from '../App.js';

export const Product = () => {
    const {id} = useParams();
    const [productData,setProductData] = useState({});
    const [loading,setLoading] = useState(false);
    let [img,setImg] = useState("");
    let getData = () => {
        axios.get(`https://scclulc5e3.execute-api.us-east-2.amazonaws.com/dev/product/get/${id}`)
        .then(res=>{
            if(res.status===200){
                setProductData(res.data);
                setLoading(true);
                setImg(res.data.images[0]);
            }
        })
        .catch(res=>console.log(res))
    }
    try{
        useEffect(getData,[]);
    }catch(e){
        console.log(e);
    }



    const validationSchema = Yup.object().shape({
        color: Yup.string().required('Choose a color'),
        size: productData.category==="shoe" ? Yup.string().required('Choose a size') :''
    })
    const {
        register,
        handleSubmit,
        formState : {errors}
    } = useForm({resolver:yupResolver(validationSchema)})

    const isLogin = useContext(IsLoginContext);
    const getCartSize = useContext(GetCartSize);
    const onSubmit = (data) => {
        const {size,color} = data;
        const upload = {
            cart: productData.category === "shoe" ? [
                {
                    id : productData._id,
                    name : productData.name,
                    price : productData.price,
                    thumbnail : productData.thumbnail,
                    color,
                    size
                }
            ] : [
                {
                    id : productData._id,
                    name : productData.name,
                    price : productData.price,
                    thumbnail : productData.thumbnail,
                    color
                }
            ]
        }
        if(isLogin){
            axios.patch(`https://scclulc5e3.execute-api.us-east-2.amazonaws.com/dev/user/update/${localStorage.getItem("id")}`,upload,{withCredentials:true})
            .then(res=>{
                if(res.data.message==="green"){
                    getCartSize();
                }
            })
            .catch(res=>console.log(res))
        }else{
            window.alert("Please login to add to cart")
        }
    }
    return (
        <>
            
            <Grid className="data">
                    <h1>{productData.name}</h1>
                    <Paper elevation={5} style={{
                    display:'grid',
                    alignItems:'center',
                    backgroundColor:'grey',
                    padding:'15% 0'
                    }}>
                        <img alt="" style={{objectFit:'contain'}}  width="355px" height="213px" src ={setLoading ? img : 'https://i.stack.imgur.com/ATB3o.gif'}/>
                    </Paper>
                    <h2>Price: Rs{productData.price} </h2>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        {loading ? (
                        <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Color</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          {...register("color")}
                          label="Color"
                        >
                            <MenuItem value=""><em>None</em></MenuItem>
                            {productData.description.map(d=>(
                                <MenuItem value={d.color}>{d.color}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                        ) : ''}
                        {errors.color && (<p>{errors.color.message}</p>)}
                        {loading ? 
                            productData.category==="shoe"?(
                            <div style={{marginTop:'2%'}}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Size</InputLabel>
                                    <Select
                                      labelId="demo-simple-select-label"
                                      id="demo-simple-select"
                                      {...register("size")}
                                      label="Size"
                                    >

                                        <MenuItem value=""><em>None</em></MenuItem>
                                        {productData.description[0]['40']> 0 ? <MenuItem value={40}>
                                            40
                                        </MenuItem>:''}
                                        {productData.description[0]['41']> 0 ? <MenuItem value={41}>
                                            41
                                        </MenuItem>:''}
                                        {productData.description[0]['42']> 0 ? <MenuItem value={42}>
                                            42
                                        </MenuItem>:''}
                                        {productData.description[0]['43']> 0 ? <MenuItem value={43}>
                                            43
                                        </MenuItem>:''}
                                        {productData.description[0]['44']> 0 ? <MenuItem value={44}>
                                            44
                                        </MenuItem>:''}
                                    </Select>
                                </FormControl>
                            </div>
                                ) : ''
                         : ''}
                        {errors.size && (<p>{errors.size.message}</p>)}
                        <div style={{margin:'2% 0'}}>
                            <Button
                            type="submit"
                            variant="outlined"
                            color="primary"
                            >
                                Add to cart
                            </Button>
                        </div>
                        {/* <Button
                        variant="outlined"
                        color="primary"
                        >
                            Buy now
                        </Button> */}
                    </form>
            </Grid>
        </>
    )
}